"use client";

import Link from "next/link";
import React from "react";
import bg_img from "../assets/img/1811066.jpg";

class Breadcrumb_banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { page, title, bg } = this.props;

    return (
      <section
        className="page-title bg-cover"
        style={{
          backgroundImage: `url(${bg || bg_img.src})`,
          backgroundRepeat: "no-repeat",
        }}
        data-overlay="8"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="breadcrumbs-wrap">
                <h1 className="breadcrumb-title text-light">{title || page}</h1>
                <nav className="transparent">
                  <ol className="breadcrumb p-0">
                    <li className="breadcrumb-item">
                      <Link href="/" className="text-light">
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item"
                      aria-current="page"
                      style={{ textTransform: "capitalize", color: "#fff" }}
                    >
                      {page}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Breadcrumb_banner;
