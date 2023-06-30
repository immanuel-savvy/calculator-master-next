"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

class Line_chart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data, title } = this.props;

    return (
      <div style={{ marginBottom: 40 }}>
        <Line options={options} data={data} />
        {title ? (
          <span
            style={{
              marginTop: 20,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 20,
            }}
          >
            {title}
          </span>
        ) : null}
      </div>
    );
  }
}

export default Line_chart;
