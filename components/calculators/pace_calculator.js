import React from "react";
import Stretch_button from "../stretch_btn";
import { to_title } from "@/assets/js/utils/functions";

class Pace_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: 3.1,
      distance_unit: this.distances[0],
      hours: 0,
      minutes: 23,
      seconds: 10,
    };
  }

  kilo = 1.609;

  calculate = () => {
    let { distance, hours, minutes, seconds, distance_unit } = this.state;

    distance = Number(distance);
    hours = Number(hours);
    minutes = Number(minutes);
    seconds = Number(seconds);

    if (distance_unit === this.distances[0]) distance /= this.kilo;

    let total_minutes = hours * 60 + minutes + seconds / 60;
    let pace = total_minutes / distance;
    let pace_minutes = Math.floor(pace);
    let pace_seconds = Math.round((pace - pace_minutes) * 60);

    this.setState({
      result: { minute: pace_minutes, second: pace_seconds },
      done: true,
    });
  };

  distances = new Array("kilometer", "miles");

  render() {
    let { distance, hours, minutes, distance_unit, seconds, done, result } =
      this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Pace Calculator</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Distance ({distance_unit})</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Distance"
                        value={distance}
                        onChange={({ target }) =>
                          this.setState({ distance: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Unit</label>

                      <div className="simple-input">
                        <select
                          id="activity"
                          onChange={({ target }) =>
                            this.setState({ distance_unit: target.value })
                          }
                          className="form-control"
                        >
                          {this.distances.map((distance_unit) => (
                            <option key={distance_unit} value={distance_unit}>
                              {to_title(distance_unit.replace(/_/g, " "))}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>Hours</label>
                      <input
                        className="form-control"
                        type="number"
                        min="0"
                        placeholder="Hours"
                        value={hours}
                        onChange={({ target }) =>
                          this.setState({ hours: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>Minutes</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Minutes"
                        min="0"
                        max="59"
                        value={minutes}
                        onChange={({ target }) =>
                          this.setState({ minutes: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>Seconds</label>
                      <input
                        className="form-control"
                        type="number"
                        min="0"
                        max="59"
                        placeholder="Seconds"
                        value={seconds}
                        onChange={({ target }) =>
                          this.setState({ seconds: target.value })
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
            <h3 className="text-center text-dark">Summary</h3>
            <h2 className="text-center mb-2">{`${result.minute}:${
              result.second < 10 ? "0" : ""
            }${result.second} per ${distance_unit}`}</h2>

            <p>
              Which means you are running each {distance_unit} in{" "}
              {result.minute} minutes and {result.second} seconds.
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Pace_calculator;
