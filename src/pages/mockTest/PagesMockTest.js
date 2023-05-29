import parse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row, Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { toastErr, toastSuccess } from "../../redux/slice/toastSlice";
import Loading from "../../component/SupportTab/Loading";
import AudioTest from "./AudioTest";
const { Countdown } = Statistic;

function PagesMockTest() {
  const [html, setHtml] = useState(null);
  const [docX, setDocx] = useState(false);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState(null);
  const [arrResult2, setArrResult2] = useState([]);
  const [loadDataDoc, setLoadDataDoc] = useState(false);
  const [haveResult, setHaveResult] = useState(true);
  const [isDocXNew, setIsDocXNew] = useState(false);
  const [time, setTime] = useState(0);
  const [currentLesson, setCurrentLesson] = useState({});

  const dispatch = useDispatch();
  const btnResultRef = useRef();
  const params = useParams();
  const listLesson = useSelector((state) => state.mockTest?.list);

  const url = `http://localhost:9000/courses/html`;

  // bài thi hiện taok
  useEffect(() => {
    if (listLesson) {
      let arr = listLesson.filter((item) => item._id === params.id);
      setCurrentLesson(arr[0]);
    }
  }, [params.id]);

  // chuyển doc , docx sang html
  useEffect(() => {
    axios
      .get(currentLesson && currentLesson.html, {
        responseEncoding: "utf8",
      })
      .then((response) => {
        const bodyRegex = /<body.*?>([\s\S]*)<\/body>/i;
        const styleRegex = /<style.*?>([\s\S]*)<\/style>/i;
        let bodyMatch = response.data.toString().match(bodyRegex);
        let styleMatch = response.data.toString().match(styleRegex);
        let bodyContent = bodyMatch ? bodyMatch[1] : "";
        let styleContent = bodyMatch ? styleMatch[1] : "";
        let index = bodyContent.indexOf("<table");
        let index2 = bodyContent.indexOf("回答");

        if (index > 1) {
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
          const jsx = parse(bodyContent);
          setHtml(jsx);
        } else if (index < 1 && index2 > 1) {
          setHaveResult(true);
          setDocx(true);
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
  }, [currentLesson]);

  // xử lí câu hỏi trong file html
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
      let countA = -1,
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
          countA++;
          countB = countC = countD = countA;
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="input_homeWork" type="radio" name="' +
              countA +
              '" value="a"></ label>'
          );
        }
        if (text.includes(answerB) && st) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="input_homeWork " type="radio" name="' +
              countB +
              '" value="b"> </label >'
          );
        }
        if (text.includes(answerC) && st) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="input_homeWork" type="radio" name="' +
              countC +
              '" value="c"> </label >'
          );
        }
        if (text.includes(answerD) && st) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="input_homeWork" type="radio" name="' +
              countD +
              '" value="d"> </label >'
          );
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

      As.forEach((element) => {
        setArrResult2((result) => [...result, element]);
        element.style.opacity = 0;
      });

      setLoadDataDoc(false);
    } else if (url && !docX && isDocXNew) {
      const answerA = "a.",
        answerB = "b.",
        answerC = "c.",
        answerD = "d.";

      const elements = document.querySelectorAll(".answer-span");

      let countA = -1,
        countB = 0,
        countC = 0,
        countD = 0;

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (element.innerText === answerA) {
          countA++;
          countB = countC = countD = countA;
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="cursor-pointer scale-150 " type="radio" name="' +
              countA +
              '" value="a"></ label>'
          );
        }
        if (element.innerText === answerB) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="cursor-pointer scale-150  " type="radio" name="' +
              countB +
              '" value="b"> </label >'
          );
        }
        if (element.innerText === answerC) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="cursor-pointer scale-150 " type="radio" name="' +
              countC +
              '" value="c"> </label >'
          );
        }
        if (element.innerText === answerD) {
          element.insertAdjacentHTML(
            "afterbegin",
            ' <label ><input class="cursor-pointer scale-150 " type="radio" name="' +
              countD +
              '" value="d"> </label >'
          );
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

      arrTable.forEach((element) => {
        setArrResult2((result) => [...result, element]);
        element.style.opacity = 0;
      });
      setLoadDataDoc(false);
    }
  }, [docX, isDocXNew, url, loadDataDoc]);

  // khi người dùng nhấn btn kiểm tra
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
// khi ng dùng nhấn xem kết quả
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
        resultTable.forEach((result) => {
          result.style.opacity = 1;
          arrResult.push(result.textContent);
        });
      } else {
        arrResult2[0].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        arrResult2.forEach((result) => {
          result.style.opacity = 1;

          arrResult.push(result.textContent);
        });
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
          paragraph.style.opacity = 1;

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
      } else {
        arrResult2.forEach((paragraph, i) => {
          paragraph.style.left = "16px";
          paragraph.style.opacity = 1;

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
      let tables = document.querySelectorAll("table");
      tables.forEach((table) => {
        table.style.opacity = 1;
      });
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
                  paragraph.textContent = `${arrInput[i]} -> ${paragraph.textContent}`;
                }
              }
            });
          }
        }
      }
    } else if (isDocXNew) {
      let arrResult = [];
      let arrInput = [];
      let resultTable = document.querySelectorAll(".table-result");

      resultTable.forEach((table) => {
        table.style.opacity = 1;
      });
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
  // ẩn footer , btn msg
  useEffect(() => {
    const messenger = document.querySelector("#fb-root");
    const footer = document.querySelector("#footer");
    footer.style.display = "none";
    if (messenger) messenger.style.display = "none";
    return () => {
      footer.style.display = "block";
      if (messenger) messenger.style.display = "block";
    };
  }, []);
  // hết thời gian thi
  const onFinish = () => {
    dispatch(toastSuccess("Bạn đã hết thời gian làm bài"));
  };
  //xét thời gian bài thi
  useEffect(() => {
    if (currentLesson) {
      currentLesson.time
        ? setTime(Date.now() + currentLesson.time * 60 * 1000)
        : setTime(Date.now() + 30 * 60 * 1000);
    }
  }, [currentLesson]);
  return (
    <div>
      <div className="mb-[20rem] relative w-full bg-white">
        <div className="">
          {currentLesson && currentLesson.audio ? (
            <AudioTest
              timeLine={currentLesson.time}
              audio={currentLesson.audio}
            />
          ) : (
            <div className="fixed top-0 left-0 right-0 flex flex-row flex-1   items-center gap-4 sm:top-[7rem] sm:z-[9999]">
              <p className="font-semibold md:hidden">Thời gian còn lại:</p>
              <Row gutter={16}>
                <Col span={12}>
                  <Countdown
                    title=""
                    valueStyle={{ color: "red" }}
                    value={time}
                    onFinish={onFinish}
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>

        <div className="pt-[4rem]">
          {loading && <Loading />}
          {!docX ? (
            html
          ) : (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
          {haveResult && (
            <div className="fixed bottom-[6rem] left-5 z-[4444]  ">
              <div
                className="flex flex-col items-center gap-y-5"
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
      </div>
    </div>
  );
}

export default PagesMockTest;
