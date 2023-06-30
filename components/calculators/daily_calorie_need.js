import React from "react";
import Checkbox from "../checkbox";
import Stretch_button from "../stretch_btn";
import { commalise_figures, to_title } from "@/assets/js/utils/functions";

class Daily_calorie_need extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: 75,
      height: 180,
      age: 30,
      sex: this.sexes[0],
      activity: this.activities[0],
    };
  }

  activities = new Array(
    "sedentary",
    "lightly_active",
    "moderately_active",
    "very_active",
    "extra_active"
  );

  sexes = new Array("male", "female");

  calculate = (prop) => {
    let { weight, height, age, sex, activity } = prop || this.state;

    let bmr;

    // Calculate BMR based on sex
    if (sex === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate daily calorie needs based on BMR and activity level
    let daily_calorie_need;

    switch (activity) {
      case "lightly_active":
        daily_calorie_need = bmr * 1.375;
        break;
      case "moderately_active":
        daily_calorie_need = bmr * 1.55;
        break;
      case "very_active":
        daily_calorie_need = bmr * 1.725;
        break;
      case "extra_active":
        daily_calorie_need = bmr * 1.9;
        break;
      default:
        daily_calorie_need = bmr * 1.2;
        break;
    }

    this.setState({ daily_calorie_need, done: true });
    return daily_calorie_need;
  };

  render() {
    let { weight, height, daily_calorie_need, age, bmr, sex, done } =
      this.state;

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

                  <div className="col-12">
                    <div className="form-group">
                      <label>Activity Level</label>

                      <div className="simple-input">
                        <select
                          id="activity"
                          onChange={({ target }) =>
                            this.setState({ activity: target.value })
                          }
                          className="form-control"
                        >
                          {this.activities.map((activity) => (
                            <option key={activity} value={activity}>
                              {to_title(activity.replace(/_/g, " "))}
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
                  action={this.calculate}
                  disabled={!weight || !height || !age || !sex}
                />
              </form>

              {done ? (
                <div className="crs_grid p-2 py-5 text-center">
                  <h3 className="text-center text-dark">Daily Calorie Need</h3>
                  <h2 className="text-center mb-2">
                    {commalise_figures(parseInt(daily_calorie_need))} calories
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

export default Daily_calorie_need;
