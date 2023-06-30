"use client";

import loader from "../assets/css/img/ajax-loader.gif";

const Loadindicator = ({ height, width, small }) => {
  return (
    <div
      className={
        !small ? "d-flex align-items-center justify-content-center my-5" : ""
      }
    >
      <img
        src={loader.src}
        style={{ height: height || 64, width: width || 64 }}
      />
    </div>
  );
};

export default Loadindicator;
