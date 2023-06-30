import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Body_mass_index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: 70,
      height: 1.75,
    };
  }

  calculate = () => {
    let { weight, height } = this.state;

    weight = Number(weight);
    height = Number(height);

    const bmi = weight / Math.pow(height, 2);
    this.setState({ bmi, done: true });
  };

  render() {
    let { weight, height, bmi, done } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Body Mass Index</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Weight (kg)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Weight"
                        value={weight}
                        onChange={({ target }) =>
                          this.setState({ weight: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Height (meters)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Height"
                        value={height}
                        onChange={({ target }) =>
                          this.setState({ height: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate}
                  disabled={!weight || !height}
                />
              </form>

              {done ? (
                <div className="crs_grid p-2 py-5 text-center">
                  <h3 className="text-center text-dark">BMI</h3>
                  <h2 className="text-center mb-2">
                    {commalise_figures(bmi.toFixed(1))} kg/m<sup>2</sup>
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

export default Body_mass_index;
