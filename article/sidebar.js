"use client";

import React from "react";
import { domain } from "../assets/js/utils/constants";
import { date_string } from "../assets/js/utils/functions";
import { get_request, post_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Link from "next/link";

class Article_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_param: "",
      search_results: new Array(),
    };
  }

  componentDidMount = async () => {
    let trending_articles = await get_request("trending_articles/5");
    this.setState({ trending_articles });
  };

  search_article = async (e) => {
    e.preventDefault();

    let { search_param } = this.state;
    if (!search_param) return;
    this.setState({ search_results: null });

    let search_results = await post_request("search_articles", {
      search_param,
      limit: 5,
      exclude: this.props.article._id,
    });

    this.setState({ search_results });
  };

  render() {
    let { article } = this.props;
    let { categories } = article;
    let { trending_articles, search_param, search_results } = this.state;

    return (
      <div class="col-lg-4 col-md-12 col-sm-12 col-12">
        <div class="single_widgets widget_search">
          <h4 class="title">Search</h4>
          <form action="#" class="sidebar-search-form">
            <input
              value={search_param}
              onChange={({ target }) =>
                this.setState({ search_param: target.value })
              }
              type="search"
              name="search"
              placeholder="Search.."
            />
            <button onClick={this.search_article} type="submit">
              <i class="ti-search"></i>
            </button>
          </form>
        </div>

        <div class="single_widgets widget_thumb_post">
          {search_results ? (
            search_results.length ? (
              <ul>
                {search_results.map((result) => (
                  <li key={result._id}>
                    <span class="left">
                      <img
                        src={`${domain}/images/${result.image}`}
                        alt=""
                        class=""
                        // style={{ height }}
                      />
                    </span>
                    <span class="right">
                      <a class="feed-title" href="#">
                        {result.title}
                      </a>
                      <span class="post-date">
                        <i class="ti-calendar"></i>
                        {date_string(result.created)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p>No search results.</p>
              </div>
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        {search_results && !search_results.length ? null : categories &&
          categories.length ? (
          <div class="single_widgets widget_category">
            <h4 class="title">Categories</h4>
            <ul>
              {categories.map((category) => (
                <li key={category._id}>
                  <Link href={`/blog?article_category=${category._id}`}>
                    {category.title} <span>{category.articles.length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {search_results && search_results.length ? null : trending_articles ? (
          trending_articles.length ? (
            <div class="single_widgets widget_thumb_post">
              <h4 class="title">Trending Posts</h4>
              <ul>
                {trending_articles.map((trending) => (
                  <li key={trending._id}>
                    <span class="left">
                      <img
                        src={`${domain}/Images/${trending.image}`}
                        alt=""
                        class=""
                      />
                    </span>
                    <span class="right">
                      <a class="feed-title" href="#">
                        {trending.title}
                      </a>
                      <span class="post-date">
                        <i class="ti-calendar"></i>
                        {date_string(trending.created)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        ) : (
          <Loadindicator />
        )}
      </div>
    );
  }
}

export default Article_sidebar;
