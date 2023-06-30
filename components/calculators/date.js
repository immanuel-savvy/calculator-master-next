import React from "react";
import Stretch_button from "../stretch_btn";

class Date_calculator extends React.Component {
  constructor(props) {
    super(props);

    let d = new Date();
    let td = `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;

    this.state = {
      day1: `${d.getFullYear()}-${d.getMonth().toString().padStart(2, "0")}-${(
        d.getDate() + 0
      )
        .toString()
        .padStart(2, "0")}`,
      day2: td,
      operation: this.operations[0],
      date: td,
      years: 1,
      months: 2,
      days: 3,
    };
  }

  operations = new Array("addition", "subtraction");

  calculate = () => {
    let { day1, day2 } = this.state;

    day1 = new Date(day1);
    day2 = new Date(day2);

    let date1_time = day1.getTime();
    let date2_time = day2.getTime();

    let time_diff = Math.abs(date2_time - date1_time);

    let day_diff = Math.ceil(time_diff / (1000 * 3600 * 24));

    this.setState({ diff: day_diff, done1: true });
  };

  calculate_2 = () => {
    let { months, years, days, operation, date } = this.state;

    date = new Date(date);
    months = Number(months);
    years = Number(years);
    days = Number(days);
    // Convert the date to a JavaScript date object
    let original_date = new Date(date);

    // Perform the requested operation (addition or subtraction)
    let new_date =
      operation === this.operations[0]
        ? new Date(
            original_date.getFullYear() + years,
            original_date.getMonth() + months,
            original_date.getDate() + days
          )
        : new Date(
            original_date.getFullYear() - years,
            original_date.getMonth() - months,
            original_date.getDate() - days
          );

    // Return the new date in YYYY-MM-DD format
    let year = new_date.getFullYear();
    let month = (new_date.getMonth() + 1).toString().padStart(2, "0");
    let day = new_date.getDate().toString().padStart(2, "0");

    this.setState({ result: `${year}-${month}-${day}`, done2: true });
  };

  render() {
    let {
      day1,
      day2,
      done1,
      diff,
      done2,
      result,
      date,
      operation,
      years,
      months,
      days,
    } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Date Calculator</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Day1</label>
                      <input
                        className="form-control"
                        type="date"
                        placeholder="Day1"
                        value={day1}
                        onChange={({ target }) =>
                          this.setState({ day1: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Day2</label>
                      <input
                        className="form-control"
                        type="date"
                        placeholder="Day 2"
                        value={day2}
                        onChange={({ target }) =>
                          this.setState({ day2: target.value })
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

        {done1 ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Number of Days</h3>
            <h2 className="text-center mb-2">{diff} Days</h2>
          </div>
        ) : null}

        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Date +/-</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        className="form-control"
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={({ target }) =>
                          this.setState({ date: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Years</label>
                      <input
                        className="form-control"
                        type="number"
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
                      <label>Months</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Months"
                        value={months}
                        onChange={({ target }) =>
                          this.setState({ months: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Days</label>
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

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Operation</label>

                      <div className="simple-input">
                        <select
                          id="length"
                          defaultValue={operation}
                          onChange={({ target }) =>
                            this.setState({ operation: target.value })
                          }
                          className="form-control"
                        >
                          {this.operations.map((l) => (
                            <option key={l} value={l}>
                              {l}
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
                  action={this.calculate_2}
                />
              </form>
            </div>
          </div>
        </div>

        {done2 ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Date</h3>
            <h2 className="text-center mb-2">{result}</h2>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Date_calculator;
