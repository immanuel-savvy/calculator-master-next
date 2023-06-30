import React from "react";
import { Table } from "react-bootstrap";
import Alert_box from "../alert_box";
import Stretch_button from "../stretch_btn";

class Triangle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: 3,
      b: 0,
      c: 5,
      A: 0,
      B: 45,
      C: 0,
    };
  }

  calculate = () => {
    let { a, b, c, A, B, C } = this.state;
    a = Number(a);
    b = Number(b);
    c = Number(c);
    A = Number(A);
    B = Number(B);
    C = Number(C);

    if (!a) a = null;
    if (!b) b = null;
    if (!c) c = null;
    if (!A) A = null;
    if (!B) B = null;
    if (!C) C = null;

    // Convert angles to radians
    let radA = A ? (A * Math.PI) / 180 : null;
    let radB = B ? (B * Math.PI) / 180 : null;
    let radC = C ? (C * Math.PI) / 180 : null;

    // Calculate missing side using Law of Cosines
    let cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c);
    let cosB = (a ** 2 + c ** 2 - b ** 2) / (2 * a * c);
    let cosC = (a ** 2 + b ** 2 - c ** 2) / (2 * a * b);

    let side_a =
      A && b && c
        ? Math.sqrt(b ** 2 + c ** 2 - 2 * b * c * Math.cos(radA))
        : a && B && c
        ? Math.sqrt(a ** 2 + c ** 2 - 2 * a * c * Math.cos(radB))
        : a && b && C
        ? Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(radC))
        : null;

    let side_b =
      A && b && c
        ? Math.sqrt(a ** 2 + c ** 2 - 2 * a * c * Math.cos(radB))
        : a && B && c
        ? Math.sqrt(b ** 2 + c ** 2 - 2 * b * c * Math.cos(radA))
        : a && b && C
        ? Math.sqrt(a ** 2 + c ** 2 - 2 * a * c * Math.cos(radC))
        : null;

    let side_c =
      A && b && c
        ? Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(radC))
        : a && B && c
        ? Math.sqrt(a ** 2 + c ** 2 - 2 * a * c * Math.cos(radB))
        : a && b && C
        ? Math.sqrt(b ** 2 + c ** 2 - 2 * b * c * Math.cos(radA))
        : null;

    // Calculate missing angles using Law of Sines
    let angle_a = A
      ? A
      : side_b && side_c
      ? (Math.asin(side_b / side_c) * 180) / Math.PI
      : null;

    let angle_b = B
      ? B
      : side_a && side_c
      ? (Math.asin(side_a / side_c) * 180) / Math.PI
      : null;

    let angle_c = C
      ? C
      : side_a && side_b
      ? (Math.asin(side_a / side_b) * 180) / Math.PI
      : null;

    // Return missing sides and angles
    this.setState({
      side_a,
      side_b,
      side_c,
      angle_a,
      angle_b,
      angle_c,
      done: true,
    });
  };

  render = () => {
    let {
      a,
      b,
      c,
      A,
      B,
      C,
      side_a,
      side_b,
      side_c,
      angle_a,
      angle_b,
      angle_c,
      done,
    } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Triangle</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <Alert_box
                  message="Leave missing sides / angles as 0"
                  type="info"
                />

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Side a</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Side a"
                        value={a}
                        onChange={({ target }) =>
                          this.setState({ a: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Angle a</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Angle a"
                        value={A}
                        onChange={({ target }) =>
                          this.setState({ A: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Side b</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Side b"
                        value={b}
                        onChange={({ target }) =>
                          this.setState({ b: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Angle b</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Angle b"
                        value={B}
                        onChange={({ target }) =>
                          this.setState({ B: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Side c</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Side c"
                        value={c}
                        onChange={({ target }) =>
                          this.setState({ c: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Angle c</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Angle c"
                        value={C}
                        onChange={({ target }) =>
                          this.setState({ C: target.value })
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
            <h3 className="text-center text-dark">Result</h3>
            <h2 className="text-center mb-2"></h2>

            <Table
              style={{ width: "100%", textAlign: "center" }}
              className="result_table"
              bordered
              hover
              responsive
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }} colSpan={2}>
                    Sides
                  </th>
                  <th style={{ textAlign: "center" }} colSpan={2}>
                    Angles
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>a</th>
                  <td>{side_a ? side_a.toFixed(2) : "-"}</td>
                  <th>A</th>
                  <td>{angle_a ? angle_a.toFixed(2) : "-"}</td>
                </tr>
                <tr>
                  <th>b</th>
                  <td>{side_b ? side_b.toFixed(2) : "-"}</td>
                  <th>B</th>
                  <td>{angle_b ? angle_b.toFixed(2) : "-"}</td>
                </tr>
                <tr>
                  <th>c</th>
                  <td>{side_c ? side_c.toFixed(2) : "-"}</td>
                  <th>C</th>
                  <td>{angle_c ? angle_c.toFixed(2) : "-"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : null}
      </div>
    );
  };
}

export default Triangle;
