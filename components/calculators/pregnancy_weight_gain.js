import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";

class Pregnancy_weight_gain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_weight: 150,
      pre_pregnancy_weight: 125,
      weeks_pregnant: 28,
    };
  }

  weeks = "*"
    .repeat(40)
    .split("")
    .map((s, i) => i + 1);

  calculate = () => {
    let { current_weight, pre_pregnancy_weight, weeks_pregnant } = this.state;

    current_weight = Number(current_weight);
    pre_pregnancy_weight = Number(pre_pregnancy_weight);
    weeks_pregnant = Number(weeks_pregnant);

    let recommended_min, recommended_max;
    if (weeks_pregnant < 14) {
      recommended_min = 1.1;
      recommended_max = 4.4;
    } else if (weeks_pregnant < 27) {
      recommended_min = 0.5;
      recommended_max = 2.2;
    } else if (weeks_pregnant < 40) {
      recommended_min = 0.4;
      recommended_max = 1.8;
    } else {
      recommended_min = 0.0;
      recommended_max = 0.5;
    }

    // Calculate expected weight gain based on pre-pregnancy weight
    let expected_gain =
      ((recommended_min + recommended_max) / 2) * (weeks_pregnant / 4.3);
    let expected_weight = pre_pregnancy_weight + expected_gain;

    // Calculate actual weight gain and percentage
    let actual_gain = current_weight - pre_pregnancy_weight;
    let percent_complete = (actual_gain / expected_gain) * 100;

    // Create result object
    let result = {
      expected: {
        gain: expected_gain.toFixed(1),
        weight: expected_weight.toFixed(1),
      },
      actual: {
        gain: actual_gain.toFixed(1),
        weight: percent_complete.toFixed(1),
      },
    };

    this.setState({ result, done: true });
  };

  render() {
    let { current_weight, pre_pregnancy_weight, weeks_pregnant, result, done } =
      this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Pregnancy Weight Gain</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="form-group">
                    <label>Pregnancy Week</label>

                    <div className="simple-input">
                      <select
                        id="bank"
                        defaultValue={`${weeks_pregnant}`}
                        onChange={({ target }) =>
                          this.setState({ weeks_pregnant: target.value })
                        }
                        className="form-control"
                      >
                        {this.weeks.map((week) => (
                          <option key={week} value={week}>
                            Week {week}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Current Weight</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Current Weight"
                        value={current_weight}
                        onChange={({ target }) =>
                          this.setState({ current_weight: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Pre-Pregnancy Weight</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Pre Pregnancy Weight"
                        value={pre_pregnancy_weight}
                        onChange={({ target }) =>
                          this.setState({ pre_pregnancy_weight: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate}
                />
              </form>
            </div>
          </div>
        </div>

        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Expected Result</h3>
            <Table
              style={{ width: "100%", textAlign: "center" }}
              className="result_table"
              bordered
              hover
              responsive
            >
              <tbody>
                <tr>
                  <th>Gain</th>
                  <td>{result.expected.gain}</td>
                </tr>

                <tr>
                  <th>Weight</th>
                  <td>{result.expected.weight}</td>
                </tr>
              </tbody>
            </Table>

            <h3 className="text-center mt-3 text-dark">Actual Result</h3>
            <Table
              style={{ width: "100%", textAlign: "center" }}
              className="result_table"
              bordered
              hover
              responsive
            >
              <tbody>
                <tr>
                  <th>Gain</th>
                  <td>{result.actual.gain}</td>
                </tr>

                <tr>
                  <th>Weight</th>
                  <td>{result.actual.weight}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Pregnancy_weight_gain;
