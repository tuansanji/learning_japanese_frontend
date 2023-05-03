import React from "react";
import { Link } from "react-router-dom";

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
          <div className="content__row sm:w-full flex  w-[80%] sm:flex-col-reverse">
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
                        <span>Phone :</span> 0968763455
                      </li>
                      <li>
                        <span>Mail :</span>jlptSite@gmail.com
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
                      <li>
                        <Link to={`/courses/n1`}>JLPT Learn- N1</Link>
                      </li>
                      <li>
                        <Link to={`/courses/n2`}>JLPT Learn- N2</Link>
                      </li>
                      <li>
                        <Link to={`/courses/n3`}>JLPT Learn- N3</Link>
                      </li>
                      <li>
                        <Link to={`/courses/n4`}>JLPT Learn- N4</Link>
                      </li>
                      <li>
                        <Link to={`/courses/n5`}>JLPT Learn- N5</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="column column-4 ">
              <div
                class="fb-page"
                data-href="https://www.facebook.com/profile.php?id=100090524688743"
                data-tabs="tin nh&#x1eaf;n"
                data-width=""
                data-height=""
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://www.facebook.com/profile.php?id=100090524688743"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/profile.php?id=100090524688743">
                    JLPT{" "}
                  </a>
                </blockquote>
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
