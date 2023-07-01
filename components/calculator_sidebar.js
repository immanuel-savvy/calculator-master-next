"use client";

import React from "react";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Link from "next/link";
import { post_request } from "@/assets/js/utils/services";
import { trim_id } from "@/assets/js/utils/functions";

class Calculator_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  load_calc = async (nav) => {
    let { calculator } = this.props;
    if (!nav) return;

    let calculators = await post_request("get_calculators", {
      calculators: nav?.calculators.filter((c) => c !== calculator?._id),
    });

    this.setState({ calculators });
  };

  componentDidMount = async () => {
    if (!this.cat) return;

    this.load_calc(this.cat);
  };

  toggle_short_description = () =>
    this.setState({ show_full: !this.state.show_full });

  render() {
    let { show_full, calculators } = this.state;
    let { calculator, navs } = this.props;

    if (!calculator) return <Loadindicator />;

    let nav =
      navs && navs.find && navs.find((n) => n._id === calculator?.category);

    if (!nav) return;

    this.cat = nav;

    nav && !calculators && this.load_calc(nav);

    let { title, description } = nav || new Object();
    return (
      <div className="col-lg-4 col-md-12 order-lg-last">
        <div className="ed_view_box style_2 border min pt-3">
          <span className="ml-3">Calculator Category</span>

          <h4 style={{ cursor: "pointer" }} className="theme-cl ml-3">
            {title}
          </h4>

          <div
            onClick={this.toggle_short_description}
            className="ed_view_short px-3"
          >
            <p style={{ cursor: "pointer" }}>
              {show_full ? description : `${description.slice(0, 150)}...`}
            </p>
          </div>

          <div class="edu_wraper">
            <h4 class="edu_title">More calculators</h4>
            {calculators ? (
              calculators.length ? (
                <ul class="simple-list p-0">
                  {calculators.map((calc, index) => (
                    <li key={index}>
                      <Link
                        href={`/calculator/${calc.title}?_id=${trim_id(
                          calc._id
                        )}`}
                      >
                        {calc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <Listempty />
              )
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator_sidebar;
