"use client";

import React from "react";
import Calculator_component from "./calculator_component";
import Reviews from "./reviews";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Calculator_sidebar from "./calculator_sidebar";

const Img_tag = ({ src }) => {
  return (
    <img
      src={src}
      className="img-fluid rounded"
      style={{
        width: "100%",
      }}
    />
  );
};

class Calculator_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { calculator, categories } = this.props;
    let { description } = calculator;

    return (
      <>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 col-sm-12">
            <Calculator_component calculator={calculator} />
          </div>
        </div>
        <div className="row">
          <div class="col-lg-8 col-md-12 order-lg-first">
            <div class="edu_wraper">
              <h4 class="edu_title">Description</h4>

              <ReactMarkdown
                // remarkPlugins={[remarkGfm]}
                children={description}
                components={{
                  img: Img_tag,
                }}
              />
            </div>

            <Reviews calculator={calculator} />
          </div>

          <Calculator_sidebar navs={categories} calculator={calculator} />
        </div>
      </>
    );
  }
}

export default Calculator_details;
export { Img_tag };
