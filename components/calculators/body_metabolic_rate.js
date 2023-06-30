import React from "react";
import Checkbox from "../checkbox";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class Body_metabolic_rate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: 70,
      height: 170,
      age: 30,
      sex: this.sexes[0],
    };
  }

  sexes = new Array("male", "female");

  calculate = (prop) => {
    let { weight, height, age, sex } = prop || this.state;

    weight = Number(weight);
    height = Number(height);
    age = Number(age);

    let bmr_constant = sex === this.sexes[0] ? 5 : -161;
    let weight_in_kg = weight * 0.453592; // convert pounds to kilograms
    let height_in_cm = height * 2.54; // convert inches to centimeters
    let bmr = 10 * weight_in_kg + 6.25 * height_in_cm - 5 * age + bmr_constant;

    this.setState({ bmr, done: true });
    return bmr;
  };

  render() {
    let { weight, height, age, bmr, is_male, sex, done } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Body Metabolic Rate</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Weight (Pounds)</label>
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
                      <label>Height (centimeters)</label>
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
                  <div className="col-12">
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={({ target }) =>
                          this.setState({ age: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Sex</label>

                      {this.sexes.map((sex_) => (
                        <Checkbox
                          type="radio"
                          title={to_title(sex_.replace(/_/g, " "))}
                          key={sex_}
                          _id={sex_}
                          checked={sex_ === sex}
                          action={(sex) => this.setState({ sex })}
                          name="sex"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate}
                  disabled={!weight || !height || !age || !sex}
                />
              </form>

              {done ? (
                <div className="crs_grid p-2 py-5 text-center">
                  <h3 className="text-center text-dark">BMR</h3>
                  <h2 className="text-center mb-2">
                    {commalise_figures(bmr.toFixed(1))} calories
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

export default Body_metabolic_rate;
