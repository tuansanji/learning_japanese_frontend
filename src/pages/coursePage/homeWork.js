import parse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toastErr, toastSuccess } from "../../redux/slice/toastSlice";
import Loading from "../../component/SupportTab/Loading";
function HomeWork({ url }) {
  const [html, setHtml] = useState(null);
  const [docX, setDocx] = useState(false);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState(null);
  const [arrResult2, setArrResult2] = useState([]);
  const [loadDataDoc, setLoadDataDoc] = useState(false);
  const [haveResult, setHaveResult] = useState(true);
  const [isDocXNew, setIsDocXNew] = useState(false);
  const dispatch = useDispatch();
  const btnResultRef = useRef();

  useEffect(() => {
    axios
      .get(url, {
        responseEncoding: "utf8",
      })
      .then((response) => {
        const bodyRegex = /<body.*?>([\s\S]*)<\/body>/i;
        const styleRegex = /<style.*?>([\s\S]*)<\/style>/i;
        let bodyMatch = response.data.toString().match(bodyRegex);
        let styleMatch = response.data.toString().match(styleRegex);
        let bodyContent = bodyMatch ? bodyMatch[1] : "";
        let styleContent = bodyMatch ? styleMatch[1] : "";

        // let bodyRegex = /<body.*?>([\s\S]*)<\/body>/i;
        // let bodyMatch = result.data.match(bodyRegex);
        // let response = bodyMatch ? bodyMatch[1] : "";
        // let index = response.data.body.indexOf("<table");
        // let index2 = response.data.body.indexOf("回答");
        let index = bodyContent.indexOf("<table");
        let index2 = bodyContent.indexOf("回答");

        if (index > 1) {
          console.log("đây là doc");
          setDocx(false);
          setHaveResult(true);

          let part1 = bodyContent.substring(0, index2);
          let part2 = bodyContent.substring(index2);

          let count = 1;
          if (!bodyContent.includes("</span></li></ol>")) {
            setIsDocXNew(true);
            part1 = part1.replace(
              /a\./gi,
              `<span className="answer-span"> $&</span>`
            );
            part1 = part1.replace(
              /b\./gi,
              `<span className="answer-span"> $&</span>`
            );
            part1 = part1.replace(
              /c\./gi,
              `<span className="answer-span"> $&</span>`
            );
            part1 = part1.replace(
              /d\./gi,
              `<span className="answer-span"> $&</span>`
            );
            part2 = part2.replace(
              /<table class="/g,
              `<table class="table-result !mx-auto sm:!w-[36rem]  `
            );
            part1 = part1.replace(
              /<table class="/g,
              `<table class=" !mx-auto  sm:!w-[36rem] `
            );
          }
          part1 = part1.replace(/<\/span><\/li><\/ol>/g, function () {
            return /*html*/ `
    </span></li></ol><div className="question flex w-full justify-center  mx-auto py-[1rem] gap-[5rem] sm:justify-between sm:gap-[0]" data-index=${count++}>
          <label className='flex items-center text-[1.8rem] font-bold gap-[1rem] text-[brown] cursor-pointer hover:text-[red]  sm:!text-[16pxs] ssm:!text-[12px]  '>
            <input type="radio" className='scale-150' name="answer${count}" value="a">
             Đáp án A
          </label>
          <label className='flex items-center text-[1.8rem] font-bold gap-[1rem] text-[brown] cursor-pointer hover:text-[red]  sm:!text-[16pxs] ssm:!text-[12px] '>
            <input type="radio" className='scale-150' name="answer${count}" value="b">
            Đáp án B
          </label>
          <label className='flex items-center text-[1.8rem] font-bold gap-[1rem] text-[brown] cursor-pointer hover:text-[red]  sm:!text-[16pxs] ssm:!text-[12px] '>
            <input type="radio" className='scale-150' name="answer${count}" value="c">
            Đáp án C
          </label>
          <label className='flex items-center text-[1.8rem] font-bold gap-[1rem] text-[brown] cursor-pointer hover:text-[red]  sm:!text-[16pxs] ssm:!text-[12px] '>
            <input type="radio" className='scale-150' name="answer${count}" value="d">
             Đáp án D
          </label>
        </div>
    `;
          });
          bodyContent = part1.concat(part2);
          let path = url.substring(0, url.lastIndexOf("/"));
          bodyContent = bodyContent.replace(
            /src=['"](.*?)['"]/g,
            "src='" + path + "/" + "$1'"
          );
          // bodyContent = bodyContent.replace(
          //   "回答",
          //   "<div className='flex w-full justify-center gap-[10rem] sm:gap-[6rem] h-[8rem] text-[3rem] pb-[4rem] ' aria-label='button-combination' > <span className='hidden' id='text-result'>回答</span> <button  id='btn_checked' className='inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide text-white bg-red-500 rounded-lg h-[40px] md:h-[7rem] md:text-[2rem] md:w-[14rem]'>Kiểm tra </button> <button className='inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide text-blue-500 border border-blue-500 rounded-lg h-[40px] md:h-[7rem] md:text-[2rem] shadow-desc' id='btn_viewResult'>Xem kết quả</button></div>"
          // );

          const jsx = parse(bodyContent);
          setHtml(jsx);
        } else if (index < 1 && index2 > 1) {
          setHaveResult(true);

          setDocx(true);
          console.log("đây là docX");

          setHtmlContent(`
  <html>
    <head>
      <style>${styleContent}</style>
    </head>
    <body>${bodyContent}</body>
  </html>

`);
        } else if (index < 1 && index2 < 1) {
          setDocx(true);
          console.log("đây là bài tập không có kết quả");
          setHaveResult(false);
          if (styleContent) {
            setHtmlContent(`
  <html>
    <head>
    <style>${styleContent}</style>
    <link rel="stylesheet" href="./subCss/homeWork.css">
    </head>
    <body>${bodyContent}</body>
  </html>

`);
          } else {
            const jsx = parse(bodyContent);
            setHtml(jsx);
          }
        }
        setLoading(false);
        setLoadDataDoc(true);
      })
      .catch((error) => console.log(error));
  }, [url]);

  useEffect(() => {
    if (url && docX && loadDataDoc) {
      const answerA = "a.",
        answerB = "b.",
        answerC = "c.",
        answerD = "d.",
        kekkaA = "a ",
        kekkaB = "b ",
        kekkaC = "c ",
        kekkaD = "d ";
      let As = new Array(),
        countas = 0,
        st = true;
      const elements = document.querySelectorAll(".t");
      let countA = 0,
        countB = 0,
        countC = 0,
        countD = 0;
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let text = "";
        for (let i = 0; i < element.childNodes.length; i++) {
          const childNode = element.childNodes[i];
          if (childNode.nodeType === Node.TEXT_NODE) {
            text += childNode.textContent;
          }
        }
        if (text.includes(answerA) && st) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="input_homeWork" type="radio" name="' +
              countA +
              '" value="a"></ label>'
          );
          countA++;
        }
        if (text.includes(answerB) && st) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="input_homeWork " type="radio" name="' +
              countB +
              '" value="b"> </label >'
          );
          countB++;
        }
        if (text.includes(answerC) && st) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="input_homeWork" type="radio" name="' +
              countC +
              '" value="c"> </label >'
          );
          countC++;
        }
        if (text.includes(answerD) && st) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="input_homeWork" type="radio" name="' +
              countD +
              '" value="d"> </label >'
          );
          countD++;
        }
        if (
          text.includes(kekkaA) ||
          text.includes(kekkaB) ||
          text.includes(kekkaC) ||
          text.includes(kekkaD)
        ) {
          As[countas] = element;
          countas++;
          st = false;
        }
      }
      setArrResult2([]);

      As.forEach((element) => setArrResult2((result) => [...result, element]));
      setLoadDataDoc(false);
    } else if (url && !docX && isDocXNew) {
      console.log("đây là docx new");
      const answerA = "a.",
        answerB = "b.",
        answerC = "c.",
        answerD = "d.";

      const elements = document.querySelectorAll(".answer-span");

      let countA = 0,
        countB = 0,
        countC = 0,
        countD = 0;

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (element.innerText === answerA) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="cursor-pointer scale-150 " type="radio" name="' +
              countA +
              '" value="a"></ label>'
          );
          countA++;
        }
        if (element.innerText === answerB) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="cursor-pointer scale-150  " type="radio" name="' +
              countB +
              '" value="b"> </label >'
          );
          countB++;
        }
        if (element.innerText === answerC) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="cursor-pointer scale-150 " type="radio" name="' +
              countC +
              '" value="c"> </label >'
          );
          countC++;
        }
        if (element.innerText === answerD) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="cursor-pointer scale-150 " type="radio" name="' +
              countD +
              '" value="d"> </label >'
          );
          countD++;
        }
      }
      let tables = document.querySelectorAll(".table-result");
      let arrTable = [];
      tables.forEach((table) => {
        const td = table.querySelectorAll("td");
        td.forEach((result, index) => {
          if (index >= td.length / 2) {
            arrTable.push(result);
          }
        });
      });

      setArrResult2([]);

      arrTable.forEach((element) =>
        setArrResult2((result) => [...result, element])
      );
      setLoadDataDoc(false);
    }
  }, [docX, isDocXNew, url, loadDataDoc]);

  const handleResultTest = () => {
    if (docX && btnResultRef.current) {
      let arrResult = [];
      let arrInput = [];
      let number = Number(0);
      let resultTable = document.querySelectorAll(
        ".t.m0.xf.h3.y33.ff2.fs1.fc3.sc4.ls4.ws5"
      );

      if (resultTable && resultTable.length >= 1) {
        resultTable.forEach((result) => arrResult.push(result.textContent));
        for (let i = 0; i < arrResult.length; i++) {
          const value = document.querySelector(`input[name="${i}"]:checked`);
          if (value) {
            arrInput.push(value.value);
          } else {
            arrInput.push("Chưa chọn");
          }
          if (arrResult[i].trim() === arrInput[i].trim()) {
            number++;
          }
        }
      } else {
        arrResult2.forEach((result) => arrResult.push(result.textContent));
        for (let i = 0; i < arrResult.length; i++) {
          const value = document.querySelector(`input[name="${i}"]:checked`);
          if (value) {
            arrInput.push(value.value);
          } else {
            arrInput.push("Chưa chọn");
          }
          if (arrResult[i].trim() === arrInput[i].trim()) {
            number++;
          }
        }
      }

      if (arrInput.includes("Chưa chọn")) {
        dispatch(toastErr("Vui lòng hoàn thành đầy đủ đáp án"));
      } else {
        dispatch(
          toastSuccess(
            `Bạn đã trả lời đúng ${number} trên ${arrResult.length} câu`
          )
        );
      }
    } else if (!isDocXNew && !docX && btnResultRef.current) {
      let arrResult = [];
      let arrInput = [];
      let number = Number(0);
      let resultTable = document.querySelectorAll(
        ".t.m0.xf.h3.y33.ff2.fs1.fc3.sc4.ls4.ws5"
      );

      if (resultTable && resultTable.length >= 1) {
        resultTable.forEach((result) => arrResult.push(result.textContent));

        const questions = document.querySelectorAll(".question");
        questions.forEach((question, i) => {
          if (!question.querySelector("input:checked")) {
            arrInput.push("Chưa chọn");
          } else {
            arrInput.push(question.querySelector("input:checked").value);
          }
          if (arrResult[i].trim() === arrInput[i].trim()) {
            number++;
          }
        });
      } else {
        let kekkaA = "a ";
        let kekkaB = "b ";
        let kekkaC = "c ";
        let kekkaD = "d ";
        let As = new Array();
        let countas = 0;
        const elements = document.querySelectorAll(".t");
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          let text = "";
          for (let i = 0; i < element.childNodes.length; i++) {
            const childNode = element.childNodes[i];
            if (childNode.nodeType === Node.TEXT_NODE) {
              text += childNode.textContent;
            }
          }
          if (
            text.includes(kekkaA) ||
            text.includes(kekkaB) ||
            text.includes(kekkaC) ||
            text.includes(kekkaD)
          ) {
            As[countas] = element;
            countas++;
          }
        }
        if (As.length > 0) {
          As.forEach((result) => arrResult.push(result.textContent));
          const questions = document.querySelectorAll(".question");

          questions.forEach((question, i) => {
            if (!question.querySelector("input:checked")) {
              arrInput.push("Chưa chọn");
            } else {
              arrInput.push(question.querySelector("input:checked").value);
            }
            if (arrResult[i].trim() === arrInput[i].trim()) {
              number++;
            }
          });
        } else {
          const tb = document.querySelectorAll("table");
          tb[0].classList.add("w-full");
          const span = tb[0].querySelectorAll("span");
          const newSpan = Array.from(span).slice(span.length / 2, span.length);
          const contents = [];
          newSpan.forEach((paragraph, i) => {
            contents.push(paragraph.textContent);
          });
          const questions = document.querySelectorAll(".question");
          questions.forEach((q, i) => {
            const labels = q.querySelectorAll("label");
            labels.forEach((l) => {
              l.setAttribute("data-correct", contents[i]);
            });
          });
          let hasEmptyQuestion = false; // đánh dấu nếu có câu hỏi bị bỏ trống
          questions.forEach((question) => {
            const correctAnswer = question
              .querySelector("label[data-correct]")
              .getAttribute("data-correct");

            if (!question.querySelector("input:checked")) {
              hasEmptyQuestion = true; // cập nhật biến cờ khi gặp câu hỏi bị bỏ trống
            } else {
              const selectedAnswer =
                question.querySelector("input:checked").value;
              if (correctAnswer === selectedAnswer) {
                number++;
              }
            }
          });
          if (hasEmptyQuestion) {
            dispatch(toastErr("Vui lòng hoàn thành đầy đủ đáp án"));
            return;
          } else {
            dispatch(
              toastSuccess(
                `Bạn đã trả lời đúng ${number} trong ${questions.length} câu`
              )
            );
            return;
          }
        }
      }

      if (arrInput.includes("Chưa chọn")) {
        dispatch(toastErr("Vui lòng hoàn thành đầy đủ đáp án"));
      } else {
        dispatch(
          toastSuccess(
            `Bạn đã trả lời đúng ${number} trên ${arrResult.length} câu`
          )
        );
      }
    } else if (isDocXNew) {
      console.log(333);
      let arrResult = [];
      let arrInput = [];
      let number = Number(0);

      arrResult2.forEach((result) => arrResult.push(result.textContent));
      for (let i = 0; i < arrResult.length; i++) {
        const value = document.querySelector(`input[name="${i}"]:checked`);
        if (value) {
          arrInput.push(value.value);
        } else {
          arrInput.push("Chưa chọn");
        }
        if (arrResult[i].trim() === arrInput[i].trim()) {
          number++;
        }
      }

      if (arrInput.includes("Chưa chọn")) {
        dispatch(toastErr("Vui lòng hoàn thành đầy đủ đáp án"));
      } else {
        dispatch(
          toastSuccess(
            `Bạn đã trả lời đúng ${number} trên ${arrResult.length} câu`
          )
        );
      }
    }
  };

  const handleResult = () => {
    if (docX) {
      let arrResult = [];
      let arrInput = [];
      let resultTable = document.querySelectorAll(
        ".t.m0.xf.h3.y33.ff2.fs1.fc3.sc4.ls4.ws5"
      );

      if (resultTable && resultTable.length >= 1) {
        resultTable[0].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        resultTable.forEach((result) => arrResult.push(result.textContent));
      } else {
        arrResult2[0].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        arrResult2.forEach((result) => arrResult.push(result.textContent));
      }

      for (let i = 0; i < arrResult.length; i++) {
        const value = document.querySelector(`input[name="${i}"]:checked`);
        if (value) {
          arrInput.push(value.value);
        } else {
          arrInput.push("Chưa chọn");
        }
      }

      if (resultTable && resultTable.length >= 1) {
        resultTable.forEach((paragraph, i) => {
          paragraph.style.left = "16px";
          if (
            arrInput[i].trim() === paragraph.textContent.trim() ||
            arrInput[i] === "Chưa chọn"
          ) {
            paragraph.textContent = paragraph.textContent;
          } else {
            if (paragraph.textContent.trim().length > 1) {
              if (
                arrInput[i].trim() ===
                paragraph.textContent.trim()[
                  paragraph.textContent.trim().length - 1
                ]
              ) {
                paragraph.textContent = paragraph.textContent =
                  paragraph.textContent.trim()[
                    paragraph.textContent.trim().length - 1
                  ];
              }
            } else if (paragraph.textContent.trim().length === 1) {
              paragraph.textContent =
                paragraph.textContent.trim()[
                  paragraph.textContent.trim().length - 1
                ];
              console.log(paragraph.textContent);
              paragraph.textContent = `${arrInput[i]} -> ${paragraph.textContent}`;
            }
          }
        });
      } else {
        arrResult2.forEach((paragraph, i) => {
          paragraph.style.left = "16px";
          if (
            arrInput[i].trim() === paragraph.textContent.trim() ||
            arrInput[i] === "Chưa chọn"
          ) {
            paragraph.textContent = paragraph.textContent;
          } else {
            if (paragraph.textContent.trim().length > 1) {
              if (
                arrInput[i].trim() ===
                paragraph.textContent.trim()[
                  paragraph.textContent.trim().length - 1
                ]
              ) {
                paragraph.textContent = paragraph.textContent =
                  paragraph.textContent.trim()[
                    paragraph.textContent.trim().length - 1
                  ];
              }
            } else if (paragraph.textContent.trim().length === 1) {
              paragraph.textContent =
                paragraph.textContent.trim()[
                  paragraph.textContent.trim().length - 1
                ];
              paragraph.textContent = `${arrInput[i]} -> ${paragraph.textContent}`;
            }
          }
        });
      }
    } else if (!isDocXNew && !docX) {
      let arrResult = [];
      let arrInput = [];
      let resultTable = document.querySelectorAll(
        ".t.m0.xf.h3.y33.ff2.fs1.fc3.sc4.ls4.ws5"
      );

      if (resultTable && resultTable.length >= 1) {
        resultTable[0].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        resultTable.forEach((result) => arrResult.push(result.textContent));
      } else {
        let kekkaA = "a ";
        let kekkaB = "b ";
        let kekkaC = "c ";
        let kekkaD = "d ";
        let As = new Array();
        let countas = 0;
        const elements = document.querySelectorAll(".t");
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          let text = "";
          for (let i = 0; i < element.childNodes.length; i++) {
            const childNode = element.childNodes[i];
            if (childNode.nodeType === Node.TEXT_NODE) {
              text += childNode.textContent;
            }
          }
          if (
            text.includes(kekkaA) ||
            text.includes(kekkaB) ||
            text.includes(kekkaC) ||
            text.includes(kekkaD)
          ) {
            As[countas] = element;
            countas++;
          }
        }
        if (As.length > 0) {
          As.forEach((result) => arrResult.push(result.textContent));
          As[0].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
          const questions = document.querySelectorAll(".question");
          questions.forEach((q, i) => {
            const labels = q.querySelectorAll("label");
            labels.forEach((l) => {
              l.setAttribute("data-correct", arrResult[i]);
            });
          });

          questions.forEach((question) => {
            if (!question.querySelector("input:checked")) {
              arrInput.push("Chưa chọn");
            } else {
              arrInput.push(question.querySelector("input:checked").value);
            }
          });
          As.forEach((paragraph, i) => {
            paragraph.style.left = "16px";
            if (
              arrInput[i].trim() === paragraph.textContent.trim() ||
              arrInput[i] === "Chưa chọn"
            ) {
              paragraph.textContent = paragraph.textContent;
            } else {
              if (paragraph.textContent.trim().length > 1) {
                if (
                  arrInput[i].trim() ===
                  paragraph.textContent.trim()[
                    paragraph.textContent.trim().length - 1
                  ]
                ) {
                  paragraph.textContent = paragraph.textContent =
                    paragraph.textContent.trim()[
                      paragraph.textContent.trim().length - 1
                    ];
                }
              } else if (paragraph.textContent.trim().length === 1) {
                paragraph.textContent =
                  paragraph.textContent.trim()[
                    paragraph.textContent.trim().length - 1
                  ];
                console.log(paragraph.textContent);
                paragraph.textContent = `${arrInput[i]} -> ${paragraph.textContent}`;
              }
            }
          });
        } else {
          const tb = document.querySelectorAll("table");
          if (tb !== null) {
            tb[0].classList.add("w-full");
            tb[0].scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
            const span = tb[0].querySelectorAll("span");
            const newSpan = Array.from(span).slice(
              span.length / 2,
              span.length
            );
            const contents = [];
            newSpan.forEach((paragraph, i) => {
              contents.push(paragraph.textContent);
            });
            const questions = document.querySelectorAll(".question");
            questions.forEach((q, i) => {
              const labels = q.querySelectorAll("label");
              labels.forEach((l) => {
                l.setAttribute("data-correct", contents[i]);
              });
            });

            questions.forEach((question) => {
              if (!question.querySelector("input:checked")) {
                arrInput.push("Chưa chọn");
              } else {
                arrInput.push(question.querySelector("input:checked").value);
              }
            });
            newSpan.forEach((paragraph, i) => {
              paragraph.style.left = "16px";
              if (
                arrInput[i].trim() === paragraph.textContent.trim() ||
                arrInput[i] === "Chưa chọn"
              ) {
                paragraph.textContent = paragraph.textContent;
              } else {
                if (paragraph.textContent.trim().length > 1) {
                  if (
                    arrInput[i].trim() ===
                    paragraph.textContent.trim()[
                      paragraph.textContent.trim().length - 1
                    ]
                  ) {
                    paragraph.textContent = paragraph.textContent =
                      paragraph.textContent.trim()[
                        paragraph.textContent.trim().length - 1
                      ];
                  }
                } else if (paragraph.textContent.trim().length === 1) {
                  paragraph.textContent =
                    paragraph.textContent.trim()[
                      paragraph.textContent.trim().length - 1
                    ];
                  console.log(paragraph.textContent);
                  paragraph.textContent = `${arrInput[i]} -> ${paragraph.textContent}`;
                }
              }
            });
          }
        }

        // const tb = document.querySelectorAll("table");
      }
    } else if (isDocXNew) {
      let arrResult = [];
      let arrInput = [];
      let resultTable = document.querySelectorAll(".table-result");

      arrResult2[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      arrResult2.forEach((result) => arrResult.push(result.textContent));

      for (let i = 0; i < arrResult.length; i++) {
        const value = document.querySelector(`input[name="${i}"]:checked`);
        if (value) {
          arrInput.push(value.value);
        } else {
          arrInput.push("Chưa chọn");
        }
      }

      arrResult2.forEach((paragraph, i) => {
        const span = paragraph.querySelector("span");
        if (
          arrInput[i].trim() === span.textContent.trim() ||
          arrInput[i] === "Chưa chọn"
        ) {
          span.textContent = span.textContent;
        } else {
          if (span.textContent.trim().length > 1) {
            if (
              arrInput[i].trim() ===
              span.textContent.trim()[span.textContent.trim().length - 1]
            ) {
              span.textContent = span.textContent =
                span.textContent.trim()[span.textContent.trim().length - 1];
            }
          } else if (span.textContent.trim().length === 1) {
            span.textContent =
              span.textContent.trim()[span.textContent.trim().length - 1];
            span.textContent = `${arrInput[i]} -> ${span.textContent}`;
          }
        }
      });
    }
  };

  return (
    <div className="mb-[20rem] relative">
      {loading && <Loading />}
      {!docX ? html : <div dangerouslySetInnerHTML={{ __html: htmlContent }} />}
      {haveResult && (
        <div className="fixed bottom-[6rem] left-5 z-[4444]  ">
          <div
            className="flex items-center gap-y-5 flex-col"
            aria-label="button-combination"
          >
            <button
              ref={btnResultRef}
              onClick={handleResultTest}
              className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[40px] hover:bg-green-500 transition-all"
            >
              Kiểm tra
            </button>{" "}
            <button
              onClick={handleResult}
              className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-red-500 rounded-lg h-[40px] hover:bg-green-500 transition-all"
            >
              Xem kết quả
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default HomeWork;
