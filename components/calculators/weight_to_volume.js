import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Weight_to_volume extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      density: 1,
      weight: 1,
    };
  }

  is_set = () => {
    let { density, weight } = this.state;

    return density && weight;
  };

  calculate = () => {
    let { density, weight } = this.state;

    density = Number(density);
    weight = Number(weight);

    // Convert weight to grams
    let weight_in_grams = weight * 1000;

    // Calculate volume in milliliters
    let volume_in_milliliters = weight_in_grams / density;

    // Return the result

    this.setState({ volume: volume_in_milliliters, done: true });
  };

  render() {
    let { density, weight, volume, done } = this.state;

    return (
      <div>
        {done ? (
          <div>
            <div className="crs_grid py-4 px-3">
              <h3 className="text-center text-dark">Volume</h3>

              <h2 className="text-center mb-2">
                {commalise_figures(volume.toFixed(2))} ml
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
                      <label>Weight (kg)</label>
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
                      <label>Density</label>
                      <input
                        type="number"
                        value={density}
                        onChange={({ target }) =>
                          this.setState({ density: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Density"
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

export default Weight_to_volume;
