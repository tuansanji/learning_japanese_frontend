import React from "react";

import "./footer.scss";

function Footer() {
  return (
    <div className="container__footer" id="footer">
      <div className="footer__content">
        <div className="title__content">
          <div className="title__container">
            <div className="row">
              <div className="col">
                <div className="wrap">
                  <div className="wrap__title">
                    <h2 className="font-mono">
                      Cùng Học Tiếng Nhật Với
                      <span> Sanji Rose</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content__row">
            <div className="column column-1">
              <div className="table">
                <div className="logo">Sanji</div>
                <div className="text">
                  <p></p>
                  <div className="contact">
                    <ul>
                      <li>
                        <span>Address :</span> 338 nguyễn duy trinh - thành phố
                        thủ đức -thành phố hồ chí minh
                      </li>
                      <li>
                        <span>Phone :</span> 0968763453
                      </li>
                      <li>
                        <span>Mail :</span> hoangtuan17012015@gmail.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="column column-2">
              <div className="table">
                <div className="title">
                  <h5>tiêu đề</h5>
                  <div className="text">
                    <ul>
                      <li>
                        <a href="#">Garena (4)</a>
                      </li>
                      <li>
                        <a href="#">Riot (2)</a>
                      </li>
                      <li>
                        <a href="#">Fifa (11)</a>{" "}
                      </li>
                      <li>
                        <a href="#">Fortnite (1)</a>
                      </li>
                      <li>
                        <a href="#">CS:GO (1)</a>
                      </li>
                      <li>
                        <a href="#">Dota 2 (2)</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="column column-3">
              <div className="table">
                <div className="title">
                  <h5>tiêu đề</h5>
                </div>
                <div className="text">
                  <ul>
                    <li>
                      <a href="#">cái này thêm sau</a>
                    </li>
                    <li>
                      <a href="#">cái này thêm sau</a>
                    </li>
                    <li>
                      <a href="#">cái này thêm sau</a>{" "}
                    </li>
                    <li>
                      <a href="#">cái này thêm sau</a>
                    </li>
                    <li>
                      <a href="#">cái này thêm sau</a>
                    </li>
                    <li>
                      <a href="#">cái này thêm sau</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="column column-4">
              <div className="table">
                <div className="title">
                  <h5>tiêu đề</h5>
                </div>
                <div className="list__contact">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/ngheoketaupl/">
                        thêm sau
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/tuansanji/HoangMinhTuan_CIJS77/tree/master/final_project_2"
                        style={{ backgroundColor: "brown" }}
                      >
                        thêm sau
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{ backgroundColor: "red" }}>
                        thêm sau
                      </a>
                    </li>
                    <li>
                      <a href="#">thêm sau</a>
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
