import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Annuity_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: 200000,
      interest: 3.5,
      years: 30,
    };
  }

  is_set = () => {
    let { interest, years, principal } = this.state;

    return interest && years && principal;
  };

  calculate = () => {
    let { interest, years, principal } = this.state;

    interest = Number(interest);
    years = Number(years);
    principal = Number(principal);

    // Convert interest rate from percentage to decimal
    let decimal_rate = interest / 100;

    // Calculate the periodic interest rate
    let periodic_rate = decimal_rate / 12;

    // Calculate the total number of payments
    let num_payments = years * 12;

    // Calculate the annuity payment
    let annuity_payment =
      (principal * periodic_rate) /
      (1 - Math.pow(1 + periodic_rate, -num_payments));

    // Round the result to two decimal places
    let annuity_payment_round = Math.round(annuity_payment * 100) / 100;

    // Calculate the total cost of the annuity
    let total_cost = annuity_payment_round * num_payments;

    // Generate an object with the results
    this.setState({
      annuity_payment: annuity_payment_round,
      total_cost,
      done: true,
    });
  };

  render() {
    let { annuity_payment, total_cost, interest, years, done, principal } =
      this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Annuity Payment</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(annuity_payment.toFixed(2))}
            </h2>

            <h3 className="text-center text-dark">Total Cost</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(total_cost.toFixed(2))}
            </h2>
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
                      <label>Principal</label>
                      <input
                        type="number"
                        value={principal}
                        onChange={({ target }) =>
                          this.setState({ principal: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Principal"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Years</label>
                      <input
                        className="form-control"
                        type="number"
                        min="0"
                        placeholder="Years"
                        value={years}
                        onChange={({ target }) =>
                          this.setState({ years: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Interest (%)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Interest"
                        value={interest}
                        onChange={({ target }) =>
                          this.setState({ interest: target.value })
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

export default Annuity_calculator;
