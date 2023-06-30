import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Retirement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      annual_earning: 80000,
      retirement_age: 65,
      life_expectancy: 90,
      social_security_income: 2000,
      inflation_rate: 3,
      expected_lifestyle: 70,
      interest_rate: 7,
      current_age: 30,
      monthly_contribution: 1000,
    };
  }

  is_set = () => true;

  calculate = () => {
    let {
      current_age,
      retirement_age,
      life_expectancy,
      monthly_contribution,
      interest_rate,
      inflation_rate,
      social_security_income,
      expected_lifestyle,
      annual_earning,
    } = this.state;

    interest_rate = interest_rate;
    current_age = Number(current_age);
    retirement_age = Number(retirement_age);
    life_expectancy = Number(life_expectancy);
    interest_rate = Number(interest_rate);
    social_security_income = Number(social_security_income);
    monthly_contribution = Number(monthly_contribution);
    expected_lifestyle = Number(expected_lifestyle);

    let monthly_interest_rate = interest_rate / 1200;

    let num_months = (retirement_age - current_age) * 12;
    let social_security_years = Math.min(
      life_expectancy - retirement_age,
      35 * 12
    );

    let total_contributions = monthly_contribution * num_months;
    let future_value = 0;

    for (let i = 0; i < num_months; i++) {
      future_value =
        (future_value + monthly_contribution) * (1 + monthly_interest_rate);
    }

    let social_security_future_value = 0;
    let social_security_monthly_income = social_security_income / 12;
    for (let i = 0; i < social_security_years * 12; i++) {
      social_security_future_value =
        (social_security_future_value + social_security_monthly_income) *
        (1 + monthly_interest_rate);
    }

    let total_future_value = future_value + social_security_future_value;
    let inflation_adjusted_value =
      total_future_value /
      Math.pow(1 + inflation_rate / 100, social_security_years);

    let expected_lifestyle_decimal = expected_lifestyle / 100;
    let retirement_savings_needed =
      inflation_adjusted_value / (1 - expected_lifestyle_decimal);
    let expected_annual_earning =
      (retirement_savings_needed - social_security_income) /
      (life_expectancy - retirement_age);

    let expected_lifestyle_at_retirement =
      (expected_annual_earning / annual_earning) * 100;

    this.setState({
      total_contributions,
      future_value,
      social_security_future_value,
      total_future_value,
      inflation_adjusted_value,
      expected_lifestyle_at_retirement,
      retirement_savings_needed,
      done: true,
    });
  };

  render() {
    let {
      total_contributions,
      future_value,
      social_security_future_value,
      total_future_value,
      inflation_adjusted_value,
      expected_lifestyle_at_retirement,
      principal,
      interest_rate,
      monthly_contribution,
      current_age,
      social_security_income,
      expected_lifestyle,
      inflation_rate,
      life_expectancy,
      retirement_age,
      annual_earning,
      retirement_savings_needed,
      done,
    } = this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center">Retirement Savings Needed</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(retirement_savings_needed)}
            </h2>

            <Table
              style={{ width: "100%", textAlign: "center" }}
              className="result_table"
              bordered
              hover
              responsive
            >
              <tbody>
                <tr>
                  <th>Total Future Value</th>
                  <td>&#x24; {commalise_figures(total_future_value)}</td>
                </tr>
                <tr>
                  <th>Inflation Adjusted Value</th>
                  <td>&#x24; {commalise_figures(inflation_adjusted_value)}</td>
                </tr>
                <tr>
                  <th>Future Value</th>
                  <td>&#x24; {commalise_figures(future_value)}</td>
                </tr>
                <tr>
                  <th>Social Security Future Value</th>
                  <td>
                    &#x24; {commalise_figures(social_security_future_value)}
                  </td>
                </tr>
                <tr>
                  <th>Total Contributions</th>
                  <td>&#x24; {commalise_figures(total_contributions)}</td>
                </tr>

                <tr>
                  <th>Expected Lifestyle at Retirement in %</th>
                  <td>&#x24; {expected_lifestyle_at_retirement}</td>
                </tr>
              </tbody>
            </Table>
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
                      <label>Annual Earning</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Annual Earning"
                        value={annual_earning}
                        onChange={({ target }) =>
                          this.setState({ annual_earning: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Monthly Contributions</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Monthly Contributions"
                        value={monthly_contribution}
                        onChange={({ target }) =>
                          this.setState({ monthly_contribution: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Social Security Income</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Social Security Income"
                        value={social_security_income}
                        onChange={({ target }) =>
                          this.setState({
                            social_security_income: target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Current Age</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Number of Years"
                        value={current_age}
                        onChange={({ target }) =>
                          this.setState({ current_age: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Retirement Age</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Number of Years"
                        value={retirement_age}
                        onChange={({ target }) =>
                          this.setState({ retirement_age: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Interest Rate (%)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Interest Rate"
                        value={interest_rate}
                        onChange={({ target }) =>
                          this.setState({ interest_rate: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Inflation Rate (%)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Inflation Rate"
                        value={inflation_rate}
                        onChange={({ target }) =>
                          this.setState({ inflation_rate: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Expected Lifestyle</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Expected Lifestyle"
                        value={expected_lifestyle}
                        onChange={({ target }) =>
                          this.setState({ expectedkkk_lifestyle: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Life Expectancy</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Life Expectancy"
                        value={life_expectancy}
                        onChange={({ target }) =>
                          this.setState({ life_expectancy: target.value })
                        }
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

export default Retirement;
