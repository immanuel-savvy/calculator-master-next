"use client";

import React from "react";

const Alert_box = ({ message, type }) => {
  return (
    <div class={`alert alert-${type || "danger"}`} role="alert">
      {message}
    </div>
  );
};

export default Alert_box;
