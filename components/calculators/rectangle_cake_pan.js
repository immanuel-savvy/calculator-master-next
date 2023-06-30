import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class Rectangle_cake_pan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from_unit: this.units[0],
      to_unit: this.units[1],
      length: 9,
      width: 13,
      height: 2,
    };
  }

  units = new Array("inches", "centimeters", "millimeters", "feet", "meters");

  is_set = () => {
    let { from_unit, to_unit, height, length, width } = this.state;

    return from_unit && to_unit && height && width && length;
  };

  calculate = () => {
    let { from_unit, to_unit, width, height, length } = this.state;

    width = Number(width);
    length = Number(length);
    height = Number(height);

    // Convert dimensions to a base unit (inches)
    let base_length, base_width, base_height;
    switch (from_unit.toLowerCase()) {
      case "inches":
        base_length = length;
        base_width = width;
        base_height = height;
        break;
      case "centimeters":
        base_length = length / 2.54;
        base_width = width / 2.54;
        base_height = height / 2.54;
        break;
      case "millimeters":
        base_length = length / 25.4;
        base_width = width / 25.4;
        base_height = height / 25.4;
        break;
      case "feet":
        base_length = length * 12;
        base_width = width * 12;
        base_height = height * 12;
        break;
      case "meters":
        base_length = length * 39.37;
        base_width = width * 39.37;
        base_height = height * 39.37;
        break;
      default:
        throw new Error(
          "Invalid 'from_unit' value. Supported units are: inches, centimeters, millimeters, feet, meters."
        );
    }

    // Convert dimensions to the target unit
    let converted_length, converted_width, converted_height;
    switch (to_unit.toLowerCase()) {
      case "inches":
        converted_length = base_length;
        converted_width = base_width;
        converted_height = base_height;
        break;
      case "centimeters":
        converted_length = base_length * 2.54;
        converted_width = base_width * 2.54;
        converted_height = base_height * 2.54;
        break;
      case "millimeters":
        converted_length = base_length * 25.4;
        converted_width = base_width * 25.4;
        converted_height = base_height * 25.4;
        break;
      case "feet":
        converted_length = base_length / 12;
        converted_width = base_width / 12;
        converted_height = base_height / 12;
        break;
      case "meters":
        converted_length = base_length / 39.37;
        converted_width = base_width / 39.37;
        converted_height = base_height / 39.37;
        break;
      default:
        throw new Error(
          "Invalid 'to_unit' value. Supported units are: inches, centimeters, millimeters, feet, meters."
        );
    }

    // Round the dimensions to two decimal places
    converted_length = parseFloat(converted_length.toFixed(2));
    converted_width = parseFloat(converted_width.toFixed(2));

    converted_height = parseFloat(converted_height.toFixed(2));

    // Calculate the volume of the rectangular cake pan in cubic inches
    let volumeInCubicInches =
      converted_length * converted_width * converted_height;

    // Calculate the area of the rectangular cake pan in square inches
    let areaInSquareInches = converted_length * converted_width;

    // Calculate the circumference of the rectangular cake pan in inches
    let circumference_in_inches = 2 * (converted_length + converted_width);

    // Generate an object with the converted dimensions and other measurements
    this.setState({
      done: true,
      length_r: converted_length,
      width_r: converted_width,
      height_r: converted_height,
      volume: volumeInCubicInches,
      area: areaInSquareInches,
      circumference: circumference_in_inches,
    });
  };

  render() {
    let {
      volume,
      height_r,
      width_r,
      length_r,
      circumference,
      area,
      done,
      from_unit,
      to_unit,
      width,
      height,
      length,
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
                    <th>Circumference (inches)</th>
                    <td> {commalise_figures(circumference)}</td>
                  </tr>

                  <tr>
                    <th>Area</th>
                    <td>{commalise_figures(area)}</td>
                  </tr>

                  <tr>
                    <th>Length</th>
                    <td>{commalise_figures(length_r)}</td>
                  </tr>
                  <tr>
                    <th>Width</th>
                    <td>{commalise_figures(width_r)}</td>
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
                      <label>Length</label>
                      <input
                        type="number"
                        value={length}
                        onChange={({ target }) =>
                          this.setState({ length: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Length"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Width</label>
                      <input
                        type="number"
                        value={width}
                        onChange={({ target }) =>
                          this.setState({ width: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Width"
                      />
                    </div>
                  </div>

                  <div className="col-12">
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

export default Rectangle_cake_pan;
