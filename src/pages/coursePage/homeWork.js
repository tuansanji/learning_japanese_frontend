import file from "../../assets/doc/doctest.doc";
import file1 from "../../assets/doc/docx.docx";
// import file2 from "../../assets/doc/html.html";
import parse from "html-react-parser";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toastErr, toastSuccess } from "../../redux/slice/toastSlice";
import Loading from "../../component/SupportTab/Loading";
function HomeWork({ url }) {
  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (html) {
  //     const tb = document.querySelectorAll("table");
  //     tb[0].classList.add("opacity-0", "w-full");
  //     const span = tb[0].querySelectorAll("span");
  //     const newSpan = Array.from(span).slice(span.length / 2, span.length);
  //     const contents = [];
  //     newSpan.forEach((paragraph, i) => {
  //       contents.push(paragraph.textContent);
  //     });
  //     const question = document.querySelectorAll(".question");
  //     question.forEach((q, i) => {
  //       const labels = q.querySelectorAll("label");
  //       labels.forEach((l) => {
  //         l.setAttribute("data-correct", contents[i]);
  //       });
  //     });
  //     const checkAnswersButton = document.getElementById("btn_checked");
  //     checkAnswersButton.addEventListener("click", () => {
  //       if (checkAnswersButton.disabled) {
  //         return;
  //       }
  //       checkAnswersButton.disabled = true;
  //       const questions = document.querySelectorAll(".question");
  //       let score = 0;
  //       let hasEmptyQuestion = false; // đánh dấu nếu có câu hỏi bị bỏ trống
  //       questions.forEach((question) => {
  //         const correctAnswer = question
  //           .querySelector("label[data-correct]")
  //           .getAttribute("data-correct");

  //         if (!question.querySelector("input:checked")) {
  //           hasEmptyQuestion = true; // cập nhật biến cờ khi gặp câu hỏi bị bỏ trống
  //         } else {
  //           const selectedAnswer =
  //             question.querySelector("input:checked").value;
  //           if (correctAnswer === selectedAnswer) {
  //             score++;
  //           }
  //         }
  //       });
  //       if (hasEmptyQuestion) {
  //         dispatch(toastErr("Vui lòng hoàn thành đầy đủ đáp án"));
  //       } else {
  //         dispatch(
  //           toastSuccess(
  //             `Bạn đã trả lời đúng ${score} trong ${questions.length} câu`
  //           )
  //         );
  //       }
  //       checkAnswersButton.disabled = false;
  //     });
  //   }
  // }, [html]);

  // useEffect(() => {
  //   if (html) {
  //     const tb = document.querySelectorAll("table");
  //     const btnResult = document.getElementById("btn_viewResult");
  //     btnResult.addEventListener("click", () => {
  //       let checked = [];
  //       if (btnResult.disabled) {
  //         return;
  //       }

  //       const questions = document.querySelectorAll(".question");
  //       questions.forEach((question) => {
  //         if (!question.querySelector("input:checked")) {
  //           checked.push("Chưa chọn");
  //         } else {
  //           checked.push(question.querySelector("input:checked").value);
  //         }
  //       });

  //       const span = tb[0].querySelectorAll("span");
  //       const newSpan = Array.from(span).slice(span.length / 2, span.length);

  //       newSpan.forEach((paragraph, i) => {
  //         if (
  //           checked[i] === paragraph.textContent ||
  //           checked[i] === "Chưa chọn"
  //         ) {
  //           paragraph.textContent = paragraph.textContent;
  //         } else {
  //           if (paragraph.textContent.length > 1) {
  //             paragraph.textContent =
  //               paragraph.textContent[paragraph.textContent.length - 1];
  //           }
  //           paragraph.textContent = `${checked[i]} -> ${paragraph.textContent}`;
  //         }
  //       });
  //       btnResult.disabled = true;
  //       tb[0].classList.toggle("opacity-0");
  //       btnResult.disabled = false;
  //     });
  //   }
  // }, [html]);

  useEffect(() => {
    if (html) {
      const answerA = "a.",
        answerB = "b.",
        answerC = "c.",
        answerD = "d.",
        kekkaA = "a ",
        kekkaB = "b ",
        kekkaC = "c ",
        kekkaD = "d ";
      var As = new Array(),
        countas = 0;
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

        if (text.includes(answerA)) {
          element.insertAdjacentHTML(
            "afterbegin",
            '<input type="radio" name="' + countA + '" value="a">'
          );
          countA++;
        }
        if (text.includes(answerB)) {
          element.insertAdjacentHTML(
            "afterbegin",
            '<input type="radio" name="' + countB + '" value="b">'
          );
          countB++;
        }
        if (text.includes(answerC)) {
          element.insertAdjacentHTML(
            "afterbegin",
            '<input type="radio" name="' + countC + '" value="c">'
          );
          countC++;
        }
        if (text.includes(answerD)) {
          element.insertAdjacentHTML(
            "afterbegin",
            '<input type="radio" name="' + countD + '" value="d">'
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
          console.log(text);
          countas++;
        }
      }
      var D = 0,
        C = 0;
      function GetAnswer() {
        for (var i = 0; i < countA; i++) {
          const Value = document.querySelector(`input[name="${i}"]:checked`);
          if (Value != null) {
            if (As[i].textContent.includes(Value.value)) {
              D++;
              As[i].style.color = "green";
            }
            As[i].append("=>" + Value.value);
          } else {
            C++;
          }
        }
        alert("đúng: " + D + "\r\nSai: " + C);
      }
    }
  }, [html]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        let index = response.data.indexOf("<table");
        let index2 = response.data.indexOf("回答");

        if (index > 1) {
          let part1 = response.data.substring(0, index);
          let part2 = response.data.substring(index);
          let count = 1;

          part1 = part1.replace(/<\/span><\/li><\/ol>/g, function () {
            return ` 
            </span></li></ol><div className="question flex w-full justify-center  mx-auto py-[1rem] gap-[5rem] sm:justify-between sm:gap-[0]" data-index=${count++}>
                  <label className='flex items-center text-[1.8rem] font-bold gap-[1rem] text-[brown] cursor-pointer hover:text-[red]  sm:text-[1.2rem]  '>
                    <input type="radio" className='scale-150' name="answer${count}" value="a">
                     Đáp án A
                  </label>
                  <label className='flex items-center text-[1.8rem] font-bold gap-[1rem] text-[brown] cursor-pointer hover:text-[red]  sm:text-[1.2rem] '>
                    <input type="radio" className='scale-150' name="answer${count}" value="b">
                    Đáp án B
                  </label>
                  <label className='flex items-center text-[1.8rem] font-bold gap-[1rem] text-[brown] cursor-pointer hover:text-[red]  sm:text-[1.2rem] '>
                    <input type="radio" className='scale-150' name="answer${count}" value="c">
                    Đáp án C
                  </label>
                  <label className='flex items-center text-[1.8rem] font-bold gap-[1rem] text-[brown] cursor-pointer hover:text-[red]  sm:text-[1.2rem] '>
                    <input type="radio" className='scale-150' name="answer${count}" value="d">
                     Đáp án D
                  </label>
                </div>
            `;
          });
          response.data = part1.concat(part2);

          response.data = response.data.replace(
            "回答",
            "<div className='flex w-full justify-center gap-[10rem] sm:gap-[6rem] h-[8rem] text-[3rem] pb-[4rem] ' aria-label='button-combination' > <span className='hidden' id='text-result'>回答</span> <button  id='btn_checked' className='inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide text-white bg-red-500 rounded-lg h-[40px] md:h-[7rem] md:text-[2rem] md:w-[14rem]'>Kiểm tra </button> <button className='inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide text-blue-500 border border-blue-500 rounded-lg h-[40px] md:h-[7rem] md:text-[2rem] shadow-desc' id='btn_viewResult'>Xem kết quả</button></div>"
          );
          const jsx = parse(response.data);
          setHtml(jsx);
        }
        if (index < 1 && index2 > 1) {
          let part1 = response.data.substring(0, index2);
          let part2 = response.data.substring(index2);

          const jsx = parse(response.data);
          setHtml(jsx);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mb-[11rem]">
      {loading && <Loading />}
      {html}
    </div>
  );
}
export default HomeWork;
