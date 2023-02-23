import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import "./footer.scss";

function Footer() {
  return (
    <div className="container__footer" id="footer">
      <div className="footer__content">
        <div className="title__content">
          <div className="title__container">
            <div className="row">
              <div className="col">
                <div
                  className="wrap md:flex md:justify-center  px-[6rem] py-[4rem]
                md:px-[3.5rem] "
                >
                  <div className="wrap__title">
                    <h2 className="font-mono">
                      Learn
                      <span> Japanese</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content flex  justify-center relative top-[2rem] sm:top-[-2.5rem]">
          <div className="content__row flex  w-[80%] sm:flex-col-reverse">
            <div className="column column-1">
              <div className="table">
                <div className="text">
                  <div className="title">
                    <h5>Công ty</h5>
                  </div>
                  <div className="contact">
                    <ul>
                      <li>
                        <span>Address :</span> Thủ đức - HCM
                      </li>
                      <li>
                        <span>Phone :</span> 0968763453
                      </li>
                      <li>
                        <span>Mail :</span>sanji@gmail.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="column column-2 xl:hidden">
              <div className="table">
                <div className="title">
                  <h5>Khóa học</h5>
                  <div className="text">
                    <ul>
                      <li
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: `smooth`,
                          });
                        }}
                      >
                        <Link to={`/courses/n1`}>Dũng Mori - N1</Link>
                      </li>
                      <li
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: `smooth`,
                          });
                        }}
                      >
                        <Link to={`/courses/n2`}>Dũng Mori - N2</Link>
                      </li>
                      <li
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: `smooth`,
                          });
                        }}
                      >
                        <Link to={`/courses/n3`}>Dũng Mori - N3</Link>
                      </li>
                      <li
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: `smooth`,
                          });
                        }}
                      >
                        <Link to={`/courses/n4`}>Dũng Mori - N4</Link>
                      </li>
                      <li
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: `smooth`,
                          });
                        }}
                      >
                        <Link to={`/courses/n5`}>Dũng Mori - N5</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="column column-4 ">
              <div className="table">
                <div className="title">
                  <h5>Liên hệ</h5>
                </div>
                <div className="list__contact">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/ngheoketaupl/">
                        <FacebookIcon></FacebookIcon>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/tuansanji/HoangMinhTuan_CIJS77/tree/master/final_project_2"
                        style={{ backgroundColor: "brown" }}
                      >
                        <GitHubIcon></GitHubIcon>
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{ backgroundColor: "red" }}>
                        <EmailIcon></EmailIcon>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <PhoneIcon></PhoneIcon>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fire-left">
          <img
            src="https://themebeyond.com/html/geco/Geco/img/images/footer_fire.png"
            alt=""
          />
        </div>
        <div className="fire-right">
          <img
            src="https://themebeyond.com/html/geco/Geco/img/images/footer_fire.png"
            alt=""
          />
        </div>
      </div>
      <div className="footer__copyright"></div>
    </div>
  );
}

export default Footer;
