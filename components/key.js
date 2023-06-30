"use client";

import React from "react";

const Key = ({ title, action }) => {
  if (title === "^")
    title = (
      <span>
        x<sup>2</sup>
      </span>
    );
  if (title === "d") title = <i className="fas fa-clear">CE</i>;

  return (
    <div className="col-3 text-center key" onClick={action}>
      {title}
    </div>
  );
};

export default Key;
