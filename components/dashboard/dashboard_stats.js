"use client";

import React from "react";
import Loadindicator from "../loadindicator";
import { get_request } from "@/assets/js/utils/services";
import { to_title } from "@/assets/js/utils/functions";

class Dashboard_stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let stats = await get_request("stats");

    this.setState({ stats });
  };

  stat_icon_et_name = {
    courses: "fa-book",
    students: "fa-users",
    enrollments: "fa-gem",
    instructors: "fa-users",
  };

  format_figure = (figure) => figure;

  stat_card = ({ title, figure, name }) => {
    return (
      <div key={name} class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
        <div class="dashboard_stats_wrap">
          <div class="rounded-circle p-4 p-sm-4 d-inline-flex align-items-center justify-content-center theme-bg mb-2">
            <div class="position-absolute text-white h5 mb-0">
              <i class={`fas ${this.stat_icon_et_name[name]}`}></i>
            </div>
          </div>
          <div class="dashboard_stats_wrap_content">
            <h4>{this.format_figure(figure)}</h4> <span>{to_title(title)}</span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { stats } = this.state;

    return (
      <div class="row">
        {stats ? (
          stats.map ? (
            stats?.map((stat) => this.stat_card(stat))
          ) : null
        ) : (
          <Loadindicator contained />
        )}
      </div>
    );
  }
}

export default Dashboard_stats;
