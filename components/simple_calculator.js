"use client";

import React from "react";
import Key from "./key";

class Simple_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { query: "0", expr: "", result: "" };
  }

  keys = "123d456+789-(0)*.^/=";

  clear_state = () => this.setState({ query: "", expr: "", result: "" });

  evaluate_expr = (expr) => {
    let { result } = this.state;
    try {
      result = eval(expr);
      this.setState({ result });
    } catch (e) {
      this.setState({ result: "" });
    }
  };

  key_pressed = (key) => {
    let { expr, result } = this.state;

    if (key === "=") return this.evaluate_expr(expr);

    if (key === "^") key = "**";

    if (key === "d") return this.clear_state();

    expr = `${expr}${key}`;

    this.evaluate_expr(expr);
    this.setState({ expr });
  };

  render() {
    let { query, result, expr } = this.state;

    return (
      <div className="crs_grid">
        <div className="modal-header">
          <h5 className="modal-title text-dark">Quick Calculator</h5>
        </div>

        <div className="modal-body">
          <div className="login-form">
            <h3 className="text-dark text-center">{result}</h3>
            <form>
              <div className="form-group">
                <div className="input-with-icon">
                  <input
                    type="text"
                    className="form-control"
                    value={expr}
                    style={{ fontSize: 16, color: "#000" }}
                    onChange={({ target }) =>
                      this.setState(
                        {
                          expr: target.value,
                          message: "",
                        },
                        () => this.evaluate_expr(target.value)
                      )
                    }
                    placeholder="0 x 0"
                  />
                  <i className="ti-setting"></i>
                </div>
              </div>
            </form>

            <div className="row justify-content-center px-3">
              {this.keys.split("").map((key) => (
                <Key
                  key={key}
                  title={key}
                  action={() => this.key_pressed(key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Simple_calculator;
