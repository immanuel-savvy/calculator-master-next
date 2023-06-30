"use client";

import React from "react";
import Preview_image from "../components/preview_image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Reviews from "../components/reviews";
import Article_sidebar from "./sidebar";
import { Img_tag } from "../components/calculator_details";
import { post_request } from "../assets/js/utils/services";

class Article_body extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let { article } = this.props;
    await post_request(`article_viewed/${article._id}`);
  };

  render = () => {
    let { article } = this.props;
    let { title, image, comments, image_hash, sections } =
      article || new Object();

    return (
      <section className="gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <div className="article_detail_wrapss single_article_wrap format-standard">
                <div className="article_body_wrap">
                  <div className="article_featured_image">
                    <Preview_image image_hash={image_hash} image={image} />
                  </div>
                  <div className="article_top_info">
                    <ul className="article_middle_info">
                      <li>
                        <a href="#article_comments">
                          <span className="icons">
                            <i className="ti-comment-alt"></i>
                          </span>
                          {`${comments || 0} Comments`}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h2 className="post-title">{`${title}.`}</h2>
                  {sections.map((section, index) =>
                    section.type === "paragraph" ? (
                      <ReactMarkdown
                        key={index}
                        children={section.text}
                        components={{
                          img: Img_tag,
                        }}
                      />
                    ) : (
                      <blockquote key={index}>
                        <span className="icon">
                          <i className="fas fa-quote-left"></i>
                        </span>
                        <ReactMarkdown
                          children={section.text}
                          components={{
                            img: Img_tag,
                          }}
                        />

                        <h5 className="name">{`- ${section.speaker || ""}`}</h5>
                      </blockquote>
                    )
                  )}
                </div>
                <Reviews article={article} />
              </div>
            </div>
            <Article_sidebar article={article} />
          </div>
        </div>
      </section>
    );
  };
}

export default Article_body;
