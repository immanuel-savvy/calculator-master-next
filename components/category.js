"use client";

import React from "react";
import { save_to_session } from "../components/footer";
import Text_btn from "./text_btn";
import Link from "next/link";
import { trim_id } from "@/assets/js/utils/functions";

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  clip = 75;

  toggle_clip = () => this.setState({ expanded: !this.state.expanded });

  render() {
    let { expanded } = this.state;
    let { category, remove, edit } = this.props;
    let { title, description, calculators, _id } = category;

    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <div class="cates_crs_wrip">
          <div class="crs_trios">
            <div class="crs_cate_icon">
              <i class="fa fa-heartbeat"></i>
            </div>
            <div class="crs_cate_link">
              {edit || remove ? (
                <>
                  <Text_btn text="Edit" action={edit} />
                  &nbsp; &nbsp; &nbsp;
                  <Text_btn action={remove} text="Remove" />
                  <br />
                </>
              ) : null}

              {calculators && calculators.length ? (
                <Link
                  href={`/calculators/${title.replace(/ /g, "_")}?_id=${trim_id(
                    _id
                  )}`}
                  onClick={() => save_to_session("category", category)}
                >
                  {calculators.length} Calculators
                </Link>
              ) : null}
            </div>
          </div>
          <div class="crs_capt_cat">
            <Link
              href={`/calculators/${title.replace(/ /g, "_")}?_id=${trim_id(
                _id
              )}`}
              onClick={() => save_to_session("category", category)}
            >
              <h4>{title}</h4>
            </Link>
            <p>{description.slice(0, expanded ? undefined : this.clip)}</p>
            {description.length > this.clip ? (
              <p onClick={this.toggle_clip} href="#">
                {expanded ? "Show less" : "Read more"}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
