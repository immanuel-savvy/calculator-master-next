"use client";

import React from "react";
import { emitter } from "@/pages/adminstrator";
import { to_title } from "@/assets/js/utils/functions";

const default_admin = "adminstrators~123calculator_master~1234567890123";

class Dashboard_nav_menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_nav: "dashboard",
      navs: new Array(
        {
          title: "dashboard",
          icon: "fa-th",
        },
        {
          title: "calculator_categories",
          icon: "fa-th",
        },
        {
          title: "calculators",
          icon: "fa-th",
        },
        {
          title: "images",
          icon: "fa-th",
        },
        {
          title: "new_article",
          icon: "fa-th",
        },
        {
          title: "manage_articles",
          icon: "fa-th",
        },
        {
          title: "logout",
          icon: "fa-th",
        }
      ),
    };
  }

  nav_click = (title) =>
    this.setState({ current_nav: title }, () => {
      emitter.emit("dash_nav_click", title);
    });

  nav_sub_click = (subtitle) =>
    this.setState({ current_nav: subtitle }, () =>
      emitter.emit("dash_nav_click", subtitle)
    );

  render_nav = ({ title, icon, subnav }, index) => {
    let { current_nav, current_slide_index } = this.state;

    return subnav ? (
      <div>
        <div id="headingOne" class="card-header bg-white shadow-sm border-0">
          <h6 class="m-2 accordion_title">
            <a
              href="#"
              data-toggle="collapse"
              data-target={`#collapse${index}`}
              aria-expanded={current_slide_index === index ? "true" : "false"}
              aria-controls={`collapse${index}`}
              class="d-block position-relative text-dark collapsible-link py-2"
            >
              {`${to_title(title.replace(/_/g, " "))}`}
            </a>
          </h6>
        </div>
        <div
          id={`collapse${index}`}
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
          class={`collapse ${current_slide_index === index ? "show" : ""}`}
          style={{ margin: 0, marginLeft: 0, padding: 0, paddingRight: 0 }}
        >
          <div>
            {subnav.map(({ title }, index) => (
              <li
                style={{ flexWrap: "wrap", padding: 10, cursor: "pointer" }}
                key={index}
                class={"incomplete" || "complete"}
                onClick={() => this.nav_dash(title)}
              >
                {to_title(title.replace(/_/g, " "))}
              </li>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <h6
        class="p-2"
        style={{ cursor: "pointer" }}
        onClick={() => this.nav_dash(title)}
      >
        <a class="d-block position-relative text-dark py-2">{`${to_title(
          title.replace(/_/g, " ")
        )}`}</a>
      </h6>
    );
  };

  nav_dash = (title) => emitter.emit("dash_nav_click", title);

  render = () => {
    let { admin } = this.props;
    let { navs } = this.state;

    return (
      <div id="accordionExample" class="accordion shadow circullum">
        {navs.map((nav, i) =>
          admin && admin._id !== default_admin && nav.title === "admins"
            ? null
            : this.render_nav(nav, i)
        )}
      </div>
    );
  };
}

export default Dashboard_nav_menu;
export { default_admin };
