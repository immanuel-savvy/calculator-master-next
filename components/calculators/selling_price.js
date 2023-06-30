import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Selling_price extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profit_margin: 150,
      cost: 1000,
    };
  }

  is_set = () => {
    let { profit_margin, cost } = this.state;

    return profit_margin && cost;
  };

  calculate = () => {
    let { profit_margin, cost } = this.state;

    profit_margin = Number(profit_margin);
    cost = Number(cost);
    // Convert profit margin from percentage to decimal
    let decimal_margin = profit_margin / 100;

    // Calculate the selling price
    let selling_price = cost / (1 - decimal_margin);

    this.setState({ selling_price, done: true });
  };

  render() {
    let { profit_margin, cost, selling_price, done } = this.state;

    return (
      <div>
        {done ? (
          <div>
            <div className="crs_grid py-4 px-3">
              <h3 className="text-center text-dark">Profit Margin</h3>

              <h2 className="text-center mb-2">
                &#x24; {commalise_figures(selling_price.toFixed(2))}
              </h2>
            </div>
          </div>
        ) : null}

        <div className="crs_grid">
          <div className="modal-header">
            <h5 className="modal-title text-dark">Calculator</h5>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Profit Margin</label>
                      <input
                        type="number"
                        value={profit_margin}
                        onChange={({ target }) =>
                          this.setState({ profit_margin: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Profit Margin"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Cost</label>
                      <input
                        type="number"
                        value={cost}
                        onChange={({ target }) =>
                          this.setState({ cost: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Cost"
                      />
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate}
                  disabled={!this.is_set()}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Selling_price;
