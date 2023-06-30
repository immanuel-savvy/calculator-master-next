"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

class Pie_chart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data, title } = this.props;

    return (
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <Pie data={data} />
        {title ? (
          <span
            style={{
              marginTop: 20,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {title}
          </span>
        ) : null}
      </div>
    );
  }
}

export default Pie_chart;
