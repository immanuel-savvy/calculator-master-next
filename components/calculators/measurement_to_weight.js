import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class Measurement_to_weight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 150,
      unit: this.units[0],
    };
  }

  units = new Array("cup", "tablespoon", "teaspoon");

  is_set = () => {
    let { amount, unit } = this.state;

    return amount && unit;
  };

  calculate = () => {
    let { amount, unit } = this.state;

    amount = Number(amount);

    let grams;
    switch (unit) {
      case "cup":
        grams = amount * 236.59;
        break;
      case "tablespoon":
        grams = amount * 14.79;
        break;
      case "teaspoon":
        grams = amount * 4.93;
        break;
      default:
        grams = 0;
    }

    this.setState({ grams, done: true });
  };

  render() {
    let { amount, unit, grams, done } = this.state;

    return (
      <div>
        {done ? (
          <div>
            <div className="crs_grid py-4 px-3">
              <h3 className="text-center text-dark">Weight in Grams</h3>

              <h2 className="text-center mb-2">
                {commalise_figures(grams.toFixed(2))} grams
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
                  <div className="col-12">
                    <div className="form-group">
                      <label>Amount in ({unit})</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={({ target }) =>
                          this.setState({ amount: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Amount"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Unit</label>
                      <div className="simple-input">
                        <select
                          id="bank"
                          defaultValue={unit}
                          onChange={({ target }) =>
                            this.setState({ unit: target.value })
                          }
                          className="form-control"
                        >
                          {this.units.map((unit) => (
                            <option key={unit} value={unit}>
                              {to_title(unit)}
                            </option>
                          ))}
                        </select>
                      </div>
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

export default Measurement_to_weight;
