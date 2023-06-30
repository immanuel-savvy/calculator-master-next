import React from "react";
import { Table } from "react-bootstrap";
import Alert_box from "../alert_box";
import Stretch_button from "../stretch_btn";

class Standard_deviation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { numbers: "1,2,3,4,5,6,7,8,9,1" };
  }

  handle_numbers = ({ target }) => {
    let numbers = target.value;

    numbers = numbers.replace(/ /g, ",").split(",");

    numbers = numbers.filter((n, i) => {
      if (!n && i + 1 !== numbers.length) return;

      n = Number(n);
      if (!n && n !== 0) return false;
      return true;
    });

    this.setState({ numbers: numbers.join(",") });
  };

  calculate_mode = (numbers) => {
    // Create an object to store the frequency of each number
    let frequency = {};

    // Loop through the array of numbers and count the frequency of each number
    for (let i = 0; i < numbers.length; i++) {
      if (frequency[numbers[i]]) {
        frequency[numbers[i]]++;
      } else {
        frequency[numbers[i]] = 1;
      }
    }

    // Find the number(s) with the highest frequency
    let max_frequency = 0;
    let modes = [];
    for (let number in frequency) {
      if (frequency[number] > max_frequency) {
        max_frequency = frequency[number];
        modes = [Number(number)];
      } else if (frequency[number] === max_frequency) {
        modes.push(Number(number));
      }
    }

    return modes;
  };

  calculate = () => {
    let { numbers } = this.state;

    numbers = numbers.split(",").map((n) => Number(n));

    let n = numbers.length;
    let mean = numbers.reduce((sum, num) => sum + num, 0) / n;
    let variance = numbers.reduce((sum, num) => sum + (num - mean) ** 2, 0) / n;
    let std = Math.sqrt(variance);

    let median;
    numbers = numbers.sort((i, j) => i - j);
    if (n % 0) median = numbers[Math.ceil(n / 2)];
    else {
      let m = n / 2;
      median = (numbers[m] + numbers[m + 1]) / 2;
    }

    this.setState({
      std,
      variance,
      mean,
      median,
      mode: this.calculate_mode(numbers),
      done: true,
    });
  };

  render() {
    let { numbers, mean, std, mode, median, variance, done } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Basic Statistics</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <Alert_box message="Separate numbers by comma (,)" type="info" />

              <form>
                <div className="row">
                  <div className="form-group">
                    <label>Numbers</label>
                    <textarea
                      className="form-control"
                      type="number"
                      placeholder="Numbers"
                      value={numbers}
                      onChange={this.handle_numbers}
                    ></textarea>
                  </div>
                </div>

                <Stretch_button
                  disabled={!numbers}
                  title="Calculate"
                  action={this.calculate}
                />
              </form>
            </div>
          </div>
        </div>

        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Result</h3>
            <h2 className="text-center mb-2"></h2>

            <Table
              style={{ width: "100%", textAlign: "center" }}
              className="result_table"
              bordered
              hover
              responsive
            >
              <tbody>
                <tr>
                  <th>Standard Deviation</th>
                  <td>{std}</td>
                </tr>
                <tr>
                  <th>Mean</th>
                  <td>{mean}</td>
                </tr>
                <tr>
                  <th>Mode</th>
                  <td>{mode}</td>
                </tr>
                <tr>
                  <th>Variance</th>
                  <td>{variance}</td>
                </tr>
                <tr>
                  <th>Median</th>
                  <td>{median}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Standard_deviation;
