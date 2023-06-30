import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class Cake_pan_converter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from_unit: this.units[0],
      to_unit: this.units[1],
      diameter: 9,
      height: 2,
    };
  }

  units = new Array("inches", "centimeters", "millimeters", "feet", "meters");

  is_set = () => {
    let { from_unit, to_unit, height, diameter } = this.state;

    return from_unit && to_unit && height && diameter;
  };

  calculate = () => {
    let { from_unit, to_unit, height, diameter } = this.state;

    diameter = Number(diameter);
    height = Number(height);

    // Convert dimensions to a base from_unit (inches)
    let base_diameter, base_height;
    switch (from_unit.toLowerCase()) {
      case "inches":
        base_diameter = diameter;
        base_height = height;
        break;
      case "centimeters":
        base_diameter = diameter / 2.54;
        base_height = height / 2.54;
        break;
      case "millimeters":
        base_diameter = diameter / 25.4;
        base_height = height / 25.4;
        break;
      case "feet":
        base_diameter = diameter * 12;
        base_height = height * 12;
        break;
      case "meters":
        base_diameter = diameter * 39.37;
        base_height = height * 39.37;
        break;
      default:
        throw new Error(
          "Invalid 'from_unit' value. Supported units are: inches, centimeters, millimeters, feet, meters."
        );
    }

    // Calculate the radius of the pan
    let radius = base_diameter / 2;

    // Convert dimensions to the target from_unit
    let converted_diameter, converted_height;
    switch (to_unit.toLowerCase()) {
      case "inches":
        converted_diameter = base_diameter;
        converted_height = base_height;
        break;
      case "centimeters":
        converted_diameter = base_diameter * 2.54;
        converted_height = base_height * 2.54;
        break;
      case "millimeters":
        converted_diameter = base_diameter * 25.4;
        converted_height = base_height * 25.4;
        break;
      case "feet":
        converted_diameter = base_diameter / 12;
        converted_height = base_height / 12;
        break;
      case "meters":
        converted_diameter = base_diameter / 39.37;
        converted_height = base_height / 39.37;
        break;
      default:
        throw new Error(
          "Invalid 'to_unit' value. Supported units are: inches, centimeters, millimeters, feet, meters."
        );
    }

    // Calculate the height of the pan
    converted_height = parseFloat(converted_height.toFixed(2));

    // Calculate the diameter of the pan
    converted_diameter = parseFloat(converted_diameter.toFixed(2));

    // Calculate the area of the pan in square inches
    let area = Math.PI * Math.pow(radius, 2);

    // Calculate the volume of the pan in cubic inches
    let volume = area * converted_height;

    // Round the volume to two decimal places
    let rounded_volume = parseFloat(volume.toFixed(2));

    // Return an object with the converted dimensions and volume
    this.setState({
      done: true,
      diameter_r: converted_diameter,
      height_r: converted_height,
      volume: rounded_volume,
    });
  };

  render() {
    let {
      volume,
      diameter_r,
      height_r,
      done,
      from_unit,
      to_unit,
      diameter,
      height,
    } = this.state;

    return (
      <div>
        {done ? (
          <div>
            <div className="crs_grid py-4 px-3">
              <h3 className="text-center text-dark">
                Converting from {from_unit} to {to_unit}
              </h3>
              <Table
                style={{ width: "100%", textAlign: "center" }}
                className="result_table"
                bordered
                hover
                responsive
              >
                <tbody>
                  <tr>
                    <th>Volume</th>
                    <td> {commalise_figures(volume)}</td>
                  </tr>
                  <tr>
                    <th>Diameter</th>
                    <td>{commalise_figures(diameter_r)}</td>
                  </tr>

                  <tr>
                    <th>Height</th>
                    <td>{commalise_figures(height_r)}</td>
                  </tr>
                </tbody>
              </Table>
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
                      <label>Diameter</label>
                      <input
                        type="number"
                        value={diameter}
                        onChange={({ target }) =>
                          this.setState({ diameter: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Diameter"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Height</label>
                      <input
                        type="number"
                        value={height}
                        onChange={({ target }) =>
                          this.setState({ height: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Height"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>From Unit</label>
                      <div className="simple-input">
                        <select
                          id="bank"
                          defaultValue={from_unit}
                          onChange={({ target }) =>
                            this.setState({ from_unit: target.value })
                          }
                          className="form-control"
                        >
                          {this.units.map((from_unit) => (
                            <option key={from_unit} value={from_unit}>
                              {to_title(from_unit)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>To Unit</label>
                      <div className="simple-input">
                        <select
                          id="bank"
                          defaultValue={to_unit}
                          onChange={({ target }) =>
                            this.setState({ to_unit: target.value })
                          }
                          className="form-control"
                        >
                          {this.units.map((to_unit) => (
                            <option key={to_unit} value={to_unit}>
                              {to_title(to_unit)}
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

export default Cake_pan_converter;
