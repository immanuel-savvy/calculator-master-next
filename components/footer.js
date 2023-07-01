"use client";

import React from "react";
import Link from "next/link";
import { trim_id } from "@/assets/js/utils/functions";

const scroll_to_top = () => window.scrollTo({ top: 0, behavior: "smooth" });

const save_to_session = (key, value) =>
  window.sessionStorage.setItem(key, JSON.stringify(value));

const get_session = (key) => {
  let value = window.sessionStorage.getItem(key);

  try {
    value = JSON.parse(value);
  } catch (e) {}

  return value;
};

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { navs } = this.props;
    navs &&
      navs.sort &&
      navs?.sort((c1, c2) => {
        let a_title = c1?.title?.toLowerCase(),
          b_title = c2?.title?.toLowerCase();

        if (a_title === "other" && b_title !== "other") return 1;
        else if (a_title !== "other" && b_title === "other") return -1;
        else return 0;
      });

    return (
      <footer
        className="dark-footer skin-dark-footer style-2"
        style={{ backgroundColor: "#000" }}
      >
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5">
                <div className="footer_widget">
                  <Link href="/">
                    {/* <img src="assets/img/logo-light.png" className="img-footer small mb-2" alt="" /> */}
                    <h2 className="text-light">Calculator Master</h2>
                  </Link>

                  <h6 className="extream text-light mb-3">UK</h6>
                  <p className="text-light">
                    Crunch those numbers with confidence - our top calculators
                    have got you covered!
                  </p>
                </div>
              </div>

              <div className="col-lg-6 col-md-7 ml-auto">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <div className="footer_widget">
                      <h4 className="widget_title">Categories</h4>
                      <ul className="footer-menu">
                        {navs && navs.length
                          ? navs.map((nav) =>
                              nav === "developer" ? null : (
                                <li
                                  className={`text-light`}
                                  key={nav._id}
                                  onClick={scroll_to_top}
                                >
                                  <Link
                                    href={`/calculators/${nav.title.replace(
                                      / /g,
                                      ""
                                    )}?_id=${trim_id(nav._id)}`}
                                    onClick={() =>
                                      save_to_session("category", nav)
                                    }
                                  >
                                    {(nav && nav.title) || "home"}
                                  </Link>
                                </li>
                              )
                            )
                          : null}
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="footer_widget">
                      <h4 className="widget_title">Company</h4>
                      <ul className="footer-menu">
                        {/* <li>
                                <Link to={`/about`}>About</Link>
                              </li> */}
                        <li>
                          <Link href={`/blog`}>Blog</Link>
                        </li>
                        {/* <li>
                                <Link to={`/contact`}>Contact</Link>
                              </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ backgroundColor: "#000" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12 text-center">
                <p className="mb-0">
                  © {new Date().getFullYear()} Calculator Master. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
export { scroll_to_top, save_to_session, get_session };
