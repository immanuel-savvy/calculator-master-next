import React from "react";
import Stretch_button from "../stretch_btn";

class Ovulation_calculator extends React.Component {
  constructor(props) {
    super(props);

    let d = new Date();
    this.state = {
      last_period_date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
      cycle_length: 28,
    };
  }

  calculate = () => {
    let { cycle_length, last_period_date } = this.state;

    cycle_length = Number(cycle_length);
    last_period_date = new Date(last_period_date);

    // Calculate the ovulation date
    let ovulation_date = new Date(
      last_period_date.getTime() + (cycle_length - 14) * 24 * 60 * 60 * 1000
    );

    this.setState({
      ovulation_date,
      done: true,
    });
  };

  render() {
    let { cycle_length, done, ovulation_date, last_period_date } = this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center mt-2 text-dark">Result</h3>
            <p>Your next ovulation date is </p>
            <h2 className="text-center mb-2">
              {`${ovulation_date.toDateString()}`}
            </h2>
          </div>
        ) : null}

        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Pregnancy Calculator</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="form-group">
                    <label>Last Period Date</label>
                    <input
                      type="date"
                      value={last_period_date}
                      onChange={({ target }) =>
                        this.setState({
                          last_period_date: target.value,
                          done: false,
                        })
                      }
                      className="form-control"
                      style={{ fontSize: 16, color: "#000" }}
                      placeholder="Last period date"
                    />
                  </div>

                  <div className="form-group">
                    <label>Cycle Length</label>
                    <input
                      type="number"
                      value={cycle_length}
                      onChange={({ target }) =>
                        this.setState({
                          cycle_length: target.value,
                          done: false,
                        })
                      }
                      className="form-control"
                      style={{ fontSize: 16, color: "#000" }}
                      placeholder="Cycle Length"
                    />
                  </div>

                  <Stretch_button
                    title="Calculate"
                    style={{ backgroundColor: "yellow" }}
                    action={this.calculate}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ovulation_calculator;
