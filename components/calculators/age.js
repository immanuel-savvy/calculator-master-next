import React from "react";
import Stretch_button from "../stretch_btn";

class Age extends React.Component {
  constructor(props) {
    super(props);

    let date = new Date();

    this.state = {
      dob: "2001-08-04",
      current_date: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    };
  }

  calculate = () => {
    let { dob, current_date } = this.state;

    dob = new Date(dob);
    current_date = new Date(current_date);

    let birth_year = dob.getFullYear();
    let birth_month = dob.getMonth();
    let birth_day = dob.getDate();
    let current_year = current_date.getFullYear();
    let current_month = current_date.getMonth();
    let current_day = current_date.getDate();

    let age = current_year - birth_year;

    if (
      current_month < birth_month ||
      (current_month === birth_month && current_day < birth_day)
    )
      age--;

    this.setState({ age, done: true });
  };

  render() {
    let { current_date, dob, age, done } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Age Calculator</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        className="form-control"
                        type="date"
                        min="1"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={({ target }) =>
                          this.setState({ dob: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Age at the Date of</label>
                      <input
                        className="form-control"
                        type="date"
                        min="1"
                        placeholder="To present"
                        value={current_date}
                        onChange={({ target }) =>
                          this.setState({ current_date: target.value })
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

        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Age</h3>
            <h2 className="text-center mb-2">{age} Years</h2>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Age;
