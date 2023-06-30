"use client";

import React from "react";
import { post_request } from "@/assets/js/utils/services";
import Article from "./article";
import Loadindicator from "./loadindicator";
import Explore_more from "./explore_more";

class Recent_articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let lastest_articles = await post_request("articles", { limit: 6 });

    this.setState({ lastest_articles });
  };

  render() {
    let { lastest_articles } = this.state;

    if (lastest_articles && !lastest_articles.length) return null;

    return (
      <section className="min">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Latest News & <span className="theme-cl">Articles</span>
                </h2>
                <p>
                  We tell you about the lastest updates in the society of
                  technology to foster awareness all-round
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {lastest_articles ? (
              lastest_articles.map((article) => (
                <Article key={article._id} article={article} />
              ))
            ) : (
              <Loadindicator contained />
            )}
          </div>
          {lastest_articles ? (
            <Explore_more title="Explore articles" to="/blog" />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Recent_articles;
