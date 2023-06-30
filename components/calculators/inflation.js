import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Inflation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 100,
      initial_value: 100,
      final_value: 150,
      num_years: 5,
      num_years_ad: 5,
      inflation_rate_ad: 8.3,
    };
  }

  calculate_inflation_rate = () => {
    let { initial_value, final_value, num_years } = this.state;

    initial_value = Number(initial_value);
    final_value = Number(final_value);
    num_years = Number(num_years);

    let inflation_rate =
      (Math.pow(final_value / initial_value, 1 / num_years) - 1) * 100;

    this.setState({ inflation_rate });
  };

  adjust_for_inflation = () => {
    let { value, num_years_ad, inflation_rate_ad } = this.state;

    value = Number(value);
    num_years_ad = Number(num_years_ad);
    inflation_rate_ad = Number(inflation_rate_ad);

    let adjusted_value =
      value * Math.pow(1 + inflation_rate_ad / 100, num_years_ad);

    this.setState({ adjusted_value });
  };

  render() {
    let {
      inflation_rate,
      adjusted_value,
      num_years_ad,
      inflation_rate_ad,
      value,
      initial_value,
      final_value,
      num_years,
    } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Calculate Inflation Rate</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Initial Value</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Initial Value"
                        value={initial_value}
                        onChange={({ target }) =>
                          this.setState({ initial_value: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Final Value</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Final Value"
                        value={final_value}
                        onChange={({ target }) =>
                          this.setState({ final_value: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Number of Years</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Number of Years"
                        value={num_years}
                        onChange={({ target }) =>
                          this.setState({ num_years: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Inflation Rate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate_inflation_rate}
                  disabled={!initial_value || !final_value || !num_years}
                />
              </form>

              {inflation_rate ? (
                <div className="crs_grid p-2 py-5 text-center">
                  <h3 className="text-center text-dark">Inflation Rate</h3>
                  <h2 className="text-center mb-2">
                    $ {commalise_figures(inflation_rate.toFixed(2))}
                  </h2>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Adjust for Inflation</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Value</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Value"
                        value={value}
                        onChange={({ target }) =>
                          this.setState({ value: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Number of years</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Number of years"
                        value={num_years_ad}
                        onChange={({ target }) =>
                          this.setState({ num_years_ad: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Inflation Rate</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Inflation Rate"
                        value={inflation_rate_ad}
                        onChange={({ target }) =>
                          this.setState({ inflation_rate_ad: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.adjust_for_inflation}
                  disabled={!value || !inflation_rate_ad || !num_years_ad}
                />
              </form>

              {adjusted_value ? (
                <div className="crs_grid p-2 py-5 text-center">
                  <h3 className="text-center text-dark">
                    Adjusted Value for Inflation
                  </h3>
                  <h2 className="text-center mb-2">
                    $ {commalise_figures(adjusted_value.toFixed(2))}
                  </h2>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inflation;
