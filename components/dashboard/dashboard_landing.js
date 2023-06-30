"use client";

import React from "react";
// import Notifications from "../notifications";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Dashboard_stats from "./dashboard_stats";
import Banner_stuffs from "./manage_banner_stuffs";

class Dashboard_landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="dashboard" />

        <Dashboard_stats />

        <div class="row">
          <hr />
          <div class="col-lg-8 col-md-12 col-sm-12">
            <Banner_stuffs />
          </div>

          {/* <Notifications /> */}
        </div>
      </div>
    );
  }
}

export default Dashboard_landing;
