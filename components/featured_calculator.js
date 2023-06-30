"use client";

import React from "react";
// import { save_to_session, scroll_to_top } from "../sections/footer";
import Text_btn from "./text_btn";
import Link from "next/link";
import { trim_id } from "@/assets/js/utils/functions";

class Featured_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { calculator, edit, remove, navs } = this.props;
    let { title, icon, category, _id } = calculator || new Object();

    return (
      <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
        <div className="crs_cate_wrap style_2">
          <Link
            href={`/calculator/${title}?_id=${trim_id(_id)}`}
            onClick={() => {
              // save_to_session("calculator", calculator);
              // scroll_to_top();
            }}
            className="crs_cate_box"
          >
            <div className="crs_cate_icon">
              <i className={`fa fa-${icon || "stamp"}`}></i>
            </div>
            <div className="crs_cate_caption text-center">
              <span>{title}</span>
            </div>
            <div className="crs_cate_count text-center">
              <span>
                {navs
                  ? navs.find((nav) => nav._id === category)?.title
                  : "Financial and Accounting"}
              </span>

              {edit || remove ? (
                <>
                  <br />
                  <Text_btn text="Edit" icon="fa-edit" action={edit} />
                  {remove ? (
                    <>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Text_btn text="Remove" action={remove} />
                    </>
                  ) : null}
                </>
              ) : null}
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Featured_calculator;
