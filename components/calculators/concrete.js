import React from "react";
import Stretch_button from "../stretch_btn";

class Concrete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 12,
      length: 12,
      depth: 4,
      width_s: 10,
      height_s: 8,
      radius: 3,
      height_c: 6,
      depth_s: 2,
      num_steps: 5,
    };
  }

  calculate_1 = () => {
    let { width, length, depth } = this.state;
    width = Number(width);
    depth = Number(depth);
    length = Number(length);

    let width_feet = width / 12;
    let length_feet = length / 12;
    let depth_feet = depth / 12;

    // Calculate volume in cubic feet
    let volume_cubic_feet = width_feet * length_feet * depth_feet;

    // Calculate volume in cubic yards
    let volume_cubic_yard = volume_cubic_feet / 27;

    // Round to two decimal places
    let result = Math.round(volume_cubic_yard * 100) / 100;

    // Return result
    this.setState({ square_concrete: result, done1: true });
  };

  calculate_2 = () => {
    let { num_steps, width_s, depth_s, height_s } = this.state;
    num_steps = Number(num_steps);
    width_s = Number(width_s);
    depth_s = Number(depth_s);
    height_s = Number(height_s);

    // Convert dimensions to feet
    let width_feet = width_s / 12;
    let height_feet = height_s / 12;
    let depth_feed = depth_s / 12;

    // Calculate volume in cubic feet
    let volume_cubic_feet = width_feet * height_feet * depth_feed * num_steps;

    // Calculate volume in cubic yards
    let volume_cubic_yard = volume_cubic_feet / 27;

    // Round to two decimal places
    let result = Math.round(volume_cubic_yard * 100) / 100;

    // Return result
    this.setState({ stairs_concrete: result, done2: true });
  };

  calculate_3 = () => {
    let { radius, height_c } = this.state;

    radius = Number(radius);
    height_c = Number(height_c);

    let radius_feet = radius / 12;
    let height_feet = height_c / 12;

    // Calculate volume in cubic feet
    let volume_cubic_feet = Math.PI * radius_feet ** 2 * height_feet;

    // Calculate volume in cubic yards
    let volume_cubic_yard = volume_cubic_feet / 27;

    // Round to two decimal places
    let c_result = Math.round(volume_cubic_yard * 100) / 100;

    // Return result
    this.setState({ c_result, done3: true });
  };

  render() {
    let {
      width,
      length,
      depth,
      done1,
      square_concrete,
      done2,
      width_s,
      depth_s,
      height_s,
      stairs_concrete,
      num_steps,
      radius,
      height_c,
      done3,
      c_result,
    } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">
              Slabs, Square Footings, or Walls
            </h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Width</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={width}
                        placeholder="Width"
                        onChange={({ target }) =>
                          this.setState({ width: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Length</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={length}
                        placeholder="Length"
                        onChange={({ target }) =>
                          this.setState({ length: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Depth</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={depth}
                        placeholder="Depth"
                        onChange={({ target }) =>
                          this.setState({ depth: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate_1}
                />
              </form>
            </div>
          </div>
        </div>

        {done1 ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Result</h3>
            <h2 className="text-center mb-2">{square_concrete}</h2>
          </div>
        ) : null}

        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Stairs Concrete Volume</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Number of Steps</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={num_steps}
                        placeholder="Number of Steps"
                        onChange={({ target }) =>
                          this.setState({ num_steps: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Width</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={width_s}
                        placeholder="Width"
                        onChange={({ target }) =>
                          this.setState({ width_s: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Length</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={height_s}
                        placeholder="Length"
                        onChange={({ target }) =>
                          this.setState({ height_s: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Depth</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={depth_s}
                        placeholder="Depth"
                        onChange={({ target }) =>
                          this.setState({ depth_s: target.value })
                        }
                      />
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
            <h3 className="text-center text-dark">Result</h3>
            <h2 className="text-center mb-2">{stairs_concrete}</h2>
          </div>
        ) : null}

        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Circular Slab Volume</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Radius</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={radius}
                        placeholder="Radius"
                        onChange={({ target }) =>
                          this.setState({ radius: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Height</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={height_c}
                        placeholder="Height"
                        onChange={({ target }) =>
                          this.setState({ height_c: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate_3}
                />
              </form>
            </div>
          </div>
        </div>

        {done3 ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Result</h3>
            <h2 className="text-center mb-2">{c_result}</h2>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Concrete;
