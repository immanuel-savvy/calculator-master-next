import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import { commalise_figures as commalise_figures_ } from "@/assets/js/utils/functions";

const commalise_figures = (value, no_float) => {
  let integer = Math.floor(value);
  let decimal = (value - integer).toFixed(2).toString();

  let commalised = commalise_figures_(integer);

  return no_float
    ? commalised
    : `${commalised}${decimal.slice(decimal.indexOf("."))}`;
};

class Salary_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  payment_intervals = new Array("monthly", "quarterly", "yearly");

  is_set = () => {
    let { salary_amount, hours, days } = this.state;

    return salary_amount, hours, days;
  };

  adjusted = (type) => {
    let { vacations, holidays, total_annual_days, daily, days } = this.state;

    let total_vacs = Number(vacations || 0) + Number(holidays || 0);

    let val = daily * (total_annual_days - total_vacs);

    if (type !== "annually") {
      val /= total_annual_days;

      if (type === "weekly") val *= days;
      else if (type === "bi_weekly") val *= days * 2;
      else if (type === "monthly") val *= days * 4;
      else if (type === "quarterly") val *= days * 4 * 3;
    }

    return val && commalise_figures(val);
  };

  calculate = () => {
    let { salary_amount, days } = this.state;

    let daily = salary_amount * 8;

    this.setState({ daily, total_annual_days: days * 4 * 12, done: true });
  };

  render() {
    let { salary_amount, done, hours, days, holidays, vacations, daily } =
      this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <Table
              style={{ width: "100%", textAlign: "center" }}
              className="result_table"
              bordered
              hover
              responsive
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Unadjusted</th>
                  <th>Holidays & Vacation Days Adjusted</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Daily</td>
                  <td>&#x24; {commalise_figures(daily)}</td>
                  <td>&#x24; {this.adjusted("daily")}</td>
                </tr>
                <tr>
                  <td>Weekly</td>
                  <td>&#x24; {commalise_figures(daily * days)}</td>
                  <td>&#x24; {this.adjusted("weekly")}</td>
                </tr>
                <tr>
                  <td>Bi-Weekly</td>
                  <td>&#x24; {commalise_figures(daily * days * 2)}</td>
                  <td>&#x24; {this.adjusted("bi_weekly")}</td>
                </tr>
                <tr>
                  <td>Monthly</td>
                  <td>&#x24; {commalise_figures(daily * days * 4)}</td>
                  <td>&#x24; {this.adjusted("monthly")}</td>
                </tr>
                <tr>
                  <td>Quarterly</td>
                  <td>&#x24; {commalise_figures(daily * days * 4 * 3)}</td>
                  <td>&#x24; {this.adjusted("quarterly")}</td>
                </tr>
                <tr>
                  <td>Annually</td>
                  <td>&#x24; {commalise_figures(daily * days * 4 * 12)}</td>
                  <td>&#x24; {this.adjusted("annually")}</td>
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
                <div className="form-group">
                  <div className="">
                    <label>Salary Amount per Hour</label>
                    <input
                      type="number"
                      value={salary_amount}
                      onChange={({ target }) =>
                        this.setState({ salary_amount: target.value })
                      }
                      className="form-control"
                      style={{ fontSize: 16, color: "#000" }}
                      placeholder="Hourly Rate"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Hours per Day</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Hours"
                        value={hours}
                        onChange={({ target }) =>
                          this.setState({ hours: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Day per Week</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Days"
                        value={days}
                        onChange={({ target }) =>
                          this.setState({ days: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Holidays per Year</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Holidays"
                        value={holidays}
                        onChange={({ target }) =>
                          this.setState({ holidays: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Vacation Days per Year</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Vacations"
                        value={vacations}
                        onChange={({ target }) =>
                          this.setState({ vacations: target.value })
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

export default Salary_calculator;
export { commalise_figures };
