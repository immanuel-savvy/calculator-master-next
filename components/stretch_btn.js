"use client";

import React from "react";
import Loadindicator from "./loadindicator";

class Stretch_button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, action, loading, disabled, style } = this.props;

    if (loading) disabled = loading;

    return (
      <button
        type="button"
        className={
          disabled
            ? "btn full-width btn-md gray text-dark"
            : "btn full-width btn-md text-dark"
        }
        disabled={disabled}
        onClick={() => !disabled && action && action()}
        style={{
          ...style,
          textTransform: "capitalize",
          backgroundColor: "#ffdf00",
          color: "#000",
        }}
      >
        {title}

        {loading ? <Loadindicator small /> : null}
      </button>
    );
  }
}

export default Stretch_button;
