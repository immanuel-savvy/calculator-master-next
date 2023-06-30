"use client";

import React from "react";
import Link from "next/link";
import { to_title } from "@/assets/js/utils/functions";

const Explore_more = ({ to, title, action }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-7 col-md-8 mt-2">
        <div className="text-center">
          <Link
            href={to}
            onClick={
              action &&
              ((e) => {
                e.preventDefault();
                action && action();
              })
            }
            className="btn btn-md theme-bg-light theme-cl"
          >
            {title || `Explore More ${to_title(to)}`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore_more;
