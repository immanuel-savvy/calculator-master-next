"use client";

import React from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loadindicator from "./loadindicator";
import { domain } from "@/assets/js/utils/constants";

class Preview_image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { image_loaded } = this.state;
    let {
      onclick,
      style,
      no_preview,
      image,
      class_name,
      image_hash,
      height,
      width,
      parent_class,
      childs,
    } = this.props;

    return (
      <span className={parent_class}>
        <LazyLoadImage
          src={
            (image &&
              (image.startsWith("/") ||
                image.startsWith("http") ||
                image.startsWith("data"))) ||
            typeof image !== "string"
              ? image
              : `${domain}/images/${image}`
          }
          onLoad={() => this.setState({ image_loaded: true })}
          beforeLoad={() => this.setState({ image_load_started: true })}
          className={class_name || "img-fluid rounded image-responsive"}
          onClick={onclick}
          style={{
            height: image_loaded ? height || null : 0,
            width: width || null,
            ...style,
          }}
        />
        {!image_loaded && image_hash ? (
          no_preview ? (
            <Loadindicator small />
          ) : (
            <Blurhash
              hash={image_hash}
              height={height || 210}
              width={width || 600}
              className={class_name || "img-fluid rounded"}
              punch={1}
              onClick={onclick}
            />
          )
        ) : null}

        {childs}
      </span>
    );
  }
}

export default Preview_image;
