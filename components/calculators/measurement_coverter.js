import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class Measurement_converter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 15,
      from: this.units[0],
      to: this.units[2],
    };
  }

  units = new Array("cup", "tablespoon", "teaspoon");

  is_set = () => {
    let { value, from } = this.state;

    return value && from;
  };

  calculate = () => {
    let { value, from, to } = this.state;

    value = Number(value);

    let teaspoon_per_tablespoon = 3;
    let tablespoon_per_cup = 16;

    // Convert everything to teaspoons
    let teaspoons;
    switch (from) {
      case "teaspoon":
        teaspoons = value;
        break;
      case "tablespoon":
        teaspoons = value * teaspoon_per_tablespoon;
        break;
      case "cup":
        teaspoons = value * tablespoon_per_cup * teaspoon_per_tablespoon;
        break;
      default:
        throw new Error('Invalid "from" from');
    }

    // Convert teaspoons to the desired from
    let result;
    switch (to) {
      case "teaspoon":
        result = teaspoons;
        break;
      case "tablespoon":
        result = teaspoons / teaspoon_per_tablespoon;
        break;
      case "cup":
        result = teaspoons / (teaspoon_per_tablespoon * tablespoon_per_cup);
        break;
      default:
        throw new Error('Invalid "to" from');
    }

    this.setState({ result, done: true });
  };

  render() {
    let { value, result, from, to, done } = this.state;

    return (
      <div>
        {done ? (
          <div>
            <div className="crs_grid py-4 px-3">
              <h3 className="text-center text-dark">Result</h3>

              <h2 className="text-center mb-2">
                {commalise_figures(result.toFixed(2))} {from}
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
                      <label>Value in ({from})</label>
                      <input
                        type="number"
                        value={value}
                        onChange={({ target }) =>
                          this.setState({ value: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Value"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>From</label>
                      <div className="simple-input">
                        <select
                          id="from"
                          defaultValue={from}
                          onChange={({ target }) =>
                            this.setState({ from: target.value })
                          }
                          className="form-control"
                        >
                          {this.units.map((from) =>
                            from === to ? null : (
                              <option key={from} value={from}>
                                {to_title(from)}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>To</label>
                      <div className="simple-input">
                        <select
                          id="to"
                          defaultValue={to}
                          onChange={({ target }) =>
                            this.setState({ to: target.value })
                          }
                          className="form-control"
                        >
                          {this.units.map((to) =>
                            to === from ? null : (
                              <option key={to} value={to}>
                                {to_title(to)}
                              </option>
                            )
                          )}
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

export default Measurement_converter;
