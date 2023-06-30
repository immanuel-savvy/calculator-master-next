import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Margin_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      revenue: 1500,
      cost: 1000,
    };
  }

  is_set = () => {
    let { revenue, cost } = this.state;

    return revenue && cost;
  };

  calculate = () => {
    let { revenue, cost } = this.state;

    revenue = Number(revenue);
    cost = Number(cost);

    let profit = revenue - cost;
    let margin = (profit / revenue) * 100;

    this.setState({ margin, done: true });
  };

  render() {
    let { revenue, cost, margin, done } = this.state;

    return (
      <div>
        {done ? (
          <div>
            <div className="crs_grid py-4 px-3">
              <h3 className="text-center text-dark">Profit Margin</h3>

              <h2 className="text-center mb-2">
                {commalise_figures(margin.toFixed(2))}%
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
                      <label>Revenue</label>
                      <input
                        type="number"
                        value={revenue}
                        onChange={({ target }) =>
                          this.setState({ revenue: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Revenue"
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

export default Margin_calculator;
