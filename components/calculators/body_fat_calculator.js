import React from "react";
import Checkbox from "../checkbox";
import Stretch_button from "../stretch_btn";
import { to_title } from "@/assets/js/utils/functions";

class Body_fat_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sex: this.sexes[0],
      age: 30,
      waist: 32,
      neck: 35,
      hip: 38,
      height: 170,
      weight: 80,
    };
  }

  sexes = new Array("male", "female");

  calculate = () => {
    let { sex, waist, neck, hip, height, weight } = this.state;
    waist = Number(waist);
    neck = Number(neck);
    hip = Number(hip);
    weight = Number(weight);
    height = Number(height);

    let body_fat_percentage;

    if (sex === "male") {
      let factor1 = 0.082;
      let factor2 = 0.034;
      let factor3 = 2.4;

      let lean_body_mass = weight * (1.0 - factor1);
      let body_fat_mass = weight - lean_body_mass;

      let waist_neck_ratio = waist - neck;

      body_fat_percentage =
        factor2 * waist - factor3 * waist_neck_ratio + factor1 * 100.0;
    } else {
      let factor1 = 0.29288;
      let factor2 = 0.1575;
      let factor3 = 5.41;
      let factor4 = 0.06934;

      let lean_body_mass = weight * (1.0 - factor1);

      let body_fat_mass = weight - lean_body_mass;

      let hipRatio = waist + hip - neck;

      body_fat_percentage =
        factor2 * hipRatio - factor3 * height - factor4 * 100.0;

      if (body_fat_percentage < 0 || body_fat_percentage > 100)
        body_fat_percentage = Math.abs(body_fat_percentage) / 100;
    }

    this.setState({ body_fat_percentage, done: true });
  };

  render() {
    let {
      sex,
      age,
      waist,
      neck,
      hip,
      height,
      weight,
      done,
      body_fat_percentage,
    } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Body Fat Calculator</h3>
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

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
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

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Waist (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Waist"
                        value={waist}
                        onChange={({ target }) =>
                          this.setState({ waist: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Hip (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Hip"
                        value={hip}
                        onChange={({ target }) =>
                          this.setState({ hip: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Neck (cm)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Neck"
                        value={neck}
                        onChange={({ target }) =>
                          this.setState({ neck: target.value })
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

              {done ? (
                <div className="crs_grid p-2 py-5 text-center">
                  <h3 className="text-center text-dark">Body Fat Percentage</h3>
                  <h2 className="text-center mb-2">
                    {parseInt(body_fat_percentage)} %
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

export default Body_fat_calculator;
