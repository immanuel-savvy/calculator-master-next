"use client";

import React from "react";
import Emitter from "semitter";
import Contact_us_today from "@/components/contact_us_today";
import Admin_login from "@/components/dashboard/admin_login";
import Dashboard_landing from "@/components/dashboard/dashboard_landing";
import Dashboard_navbar from "@/components/dashboard/dashboard_navbar";
import Manage_articles from "@/components/dashboard/manage_articles";
import Manage_calculators from "@/components/dashboard/manage_calculators";
import Manage_categories from "@/components/dashboard/manage_categories";
import Manage_images from "@/components/dashboard/manage_images";
import Footer, {
  get_session,
  save_to_session,
  scroll_to_top,
} from "@/components/footer";
import Loadindicator from "@/components/loadindicator";
import { get_request } from "@/assets/js/utils/services";
import Custom_nav from "@/components/nav";
import New_article from "@/components/dashboard/new_article";

const emitter = new Emitter();

class Adminstrator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      check_logged_in: true,
      current_nav: "dashboard",
    };
  }

  componentDidMount = async () => {
    let admin = get_session("admin");

    this.setState({ admin, check_logged_in: false });

    let navs = await get_request("categories");

    this.setState({ navs });

    this.dash_nav_click = (nav_title) =>
      this.setState({ current_nav: nav_title, article: null }, scroll_to_top);

    this.edit_article = (article) =>
      this.setState({ current_nav: "new_article", article }, scroll_to_top);

    emitter.listen("dash_nav_click", this.dash_nav_click);
    emitter.listen("edit_article", this.edit_article);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("dash_nav_click", this.dash_nav_click);
    emitter.remove_listener("edit_article", this.edit_article);
  };

  login = (admin) => {
    this.setState({ admin });
    save_to_session("admin", admin);
  };

  nav_et_component = (navs) =>
    new Object({
      dashboard: <Dashboard_landing navs={navs} />,
      calculator_categories: <Manage_categories navs={navs} />,
      calculators: <Manage_calculators navs={navs} />,
      images: <Manage_images navs={navs} />,
      new_article: <New_article navs={navs} article={this.state.article} />,
      manage_articles: <Manage_articles navs={navs} />,
    });

  render() {
    let { navs, admin, check_logged_in, current_nav } = this.state;

    return check_logged_in ? (
      <Loadindicator />
    ) : admin ? (
      <div id="main-wrapper">
        <Custom_nav page="dashboard" navs={navs} />
        <div className="clearfix"></div>
        <section className="gray pt-4">
          <div className="container-fluid">
            <div className="row">
              <Dashboard_navbar admin={admin} />
              {this.nav_et_component(navs)[current_nav]}
            </div>
          </div>
        </section>

        <Contact_us_today />
        <Footer navs={navs} />
      </div>
    ) : (
      <Admin_login login={this.login} navs={navs} />
    );
  }
}

export default Adminstrator;
export { emitter };
