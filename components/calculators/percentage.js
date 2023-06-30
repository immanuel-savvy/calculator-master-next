import React from "react";
import Stretch_button from "../stretch_btn";

class Percentage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 75,
      total: 100,
      num1: 240,
      num2: 160,
      percent: 40,
      total_of: 400,
    };
  }

  calculate_percentage = () => {
    let { amount, total } = this.state;
    amount = Number(amount);
    total = Number(total);

    if (typeof amount !== "number" || typeof total !== "number") {
      throw new Error("Both arguments must be numbers.");
    }

    if (total === 0) return 0;

    this.setState({
      percentage: ((amount / total) * 100).toFixed(2),
      done1: true,
    });
  };

  calculate_percentage_of = () => {
    let { percent, total_of } = this.state;
    percent = Number(percent);
    total_of = Number(total_of);

    if (typeof percent !== "number" || typeof total_of !== "number") {
      throw new Error("Both arguments must be numbers.");
    }

    this.setState({
      percentage_of: (percent / 100).toFixed(2) * total_of,
      done3: true,
    });
  };

  calculate_difference = () => {
    let { num1, num2 } = this.state;
    num1 = Number(num1);
    num2 = Number(num2);

    let difference = Math.abs(num1 - num2);
    let average = (num1 + num2) / 2;
    let percentage_diff = (difference / average) * 100;

    this.setState({ difference: percentage_diff.toFixed(2), done2: true });
  };

  render = () => {
    let {
      amount,
      num1,
      num2,
      total,
      difference,
      percentage,
      done1,
      done3,
      percent,
      percentage_of,
      total_of,
      done2,
    } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Percentage</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Amount</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={({ target }) =>
                          this.setState({ amount: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Total</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Total"
                        value={total}
                        onChange={({ target }) =>
                          this.setState({ total: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate_percentage}
                />
              </form>
            </div>
          </div>
        </div>

        {done1 ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Result</h3>
            <h2 className="text-center mb-2">{`${percentage}%`}</h2>
          </div>
        ) : null}

        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Percentage of</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Percentage (%)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Percentage"
                        value={percent}
                        onChange={({ target }) =>
                          this.setState({ percent: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Total</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Total"
                        value={total_of}
                        onChange={({ target }) =>
                          this.setState({ total_of: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate_percentage_of}
                />
              </form>
            </div>
          </div>
        </div>

        {done3 ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Result</h3>
            <h2 className="text-center mb-2">{`${percentage_of}`}</h2>
          </div>
        ) : null}

        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Percentage Difference</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Value 1</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Value 1"
                        value={num1}
                        onChange={({ target }) =>
                          this.setState({ num1: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Value 2</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Value 2"
                        value={num2}
                        onChange={({ target }) =>
                          this.setState({ num2: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate_difference}
                />
              </form>
            </div>
          </div>
        </div>

        {done2 ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Result</h3>
            <h2 className="text-center mb-2">{`${difference}%`}</h2>
          </div>
        ) : null}
      </div>
    );
  };
}

export default Percentage;
