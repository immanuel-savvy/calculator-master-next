"use client";

import React from "react";
import Comment from "./comment";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Submit_review from "./submit_review";
import { post_request } from "@/assets/js/utils/services";

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 10,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { calculator, article } = this.props;
    let { limit, page } = this.state;

    if (!calculator) calculator = article;

    let comments = await post_request("comments", {
      item: calculator._id,
      limit,
      skip: limit * (page - 1),
    });

    this.setState({ comments });
  };

  append_comment = (comment) => {
    let { comments } = this.state;
    if (!Array.isArray(comments)) comments = new Array();

    comments = new Array(...comments, comment);

    this.setState({ comments });
  };

  render() {
    let { calculator, article } = this.props;

    if (!calculator) calculator = article;

    let { comments } = this.state;

    return (
      <>
        {/* <Ratings /> */}

        <div class="list-single-main-item fl-wrap">
          <div class="list-single-main-item-title fl-wrap">
            {comments && comments.length ? (
              <h3>
                Item Reviews - <span> {comments.length} </span>
              </h3>
            ) : null}
          </div>
          <div class="reviews-comments-wrap">
            {comments ? (
              comments.length ? (
                comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))
              ) : (
                <Listempty text="Be the first to post a review" />
              )
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>

        <Submit_review
          calculator={calculator}
          on_comment={this.append_comment}
        />
      </>
    );
  }
}

export default Reviews;
