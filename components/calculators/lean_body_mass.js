import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Lean_body_mass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: 70,
      body_fat_percentage: 1.75,
    };
  }

  is_set = () => {
    let { weight, body_fat_percentage } = this.state;

    return weight && body_fat_percentage;
  };

  calculate = () => {
    let { weight, body_fat_percentage } = this.state;

    weight = Number(weight);
    body_fat_percentage = Number(body_fat_percentage);

    // Calculate lean body mass
    let lean_body_mass = weight * (1 - body_fat_percentage / 100);

    // Round to two decimal places
    lean_body_mass = Math.round(lean_body_mass * 100) / 100;

    this.setState({ lean_body_mass, done: true });
  };

  render() {
    let { weight, body_fat_percentage, lean_body_mass, done } = this.state;

    return (
      <div>
        {done ? (
          <div>
            <div className="crs_grid py-4 px-3">
              <h3 className="text-center text-dark">Lean Body Mass</h3>

              <h2 className="text-center mb-2">
                {commalise_figures(lean_body_mass.toFixed(2))}
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
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Weight</label>
                      <input
                        type="number"
                        value={weight}
                        onChange={({ target }) =>
                          this.setState({ weight: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Weight"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Body Fat Percentage (%)</label>
                      <input
                        type="number"
                        value={body_fat_percentage}
                        onChange={({ target }) =>
                          this.setState({ body_fat_percentage: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Body Fat Percentage"
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

export default Lean_body_mass;
