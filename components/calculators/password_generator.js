import React from "react";
import Stretch_button from "../stretch_btn";
import { gen_random_int } from "@/assets/js/utils/functions";

let _lalpha = "abcdefghijklmnopqrstuvwxyz",
  _ualpha = _lalpha.toUpperCase(),
  _digits = "0123456789",
  _symbols = "'~!@#$%^&*()_+{}|\":?><`[];'/.,";

class Password_generator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pass_length: 8,
      lower_case: true,
    };
  }

  lengths = "."
    .repeat(32)
    .split("")
    .map((x, i) => i + 1);

  generate = (e) => {
    let { lower_case, upper_case, digits, symbols, pass_length } = this.state;

    if (!upper_case && !lower_case && !digits && !symbols) {
      digits = true;
      lower_case = true;
    }

    let wholeset = "";

    if (lower_case) wholeset += _lalpha;
    if (upper_case) wholeset += _ualpha;
    if (digits) wholeset += _digits;
    if (symbols) wholeset += _symbols;

    let random_value = "";

    for (let i = 0; i < (pass_length || 8); i++) {
      let index = gen_random_int(wholeset.length);
      if (index === wholeset.length) index--;

      random_value += wholeset[index];
    }
    this.setState({ password: random_value });
  };

  render() {
    let { pass_length, lower_case, upper_case, digits, symbols, password } =
      this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Password Generator</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Password Length</label>

                      <div className="simple-input">
                        <select
                          id="length"
                          defaultValue={pass_length}
                          onChange={({ target }) =>
                            this.setState({ pass_length: target.value })
                          }
                          className="form-control"
                        >
                          {this.lengths.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <div
                        onClick={() =>
                          this.setState({
                            lower_case: !lower_case,
                          })
                        }
                        className="form-group smalls"
                      >
                        <input
                          id={"lowercase"}
                          className="checkbox-custom"
                          name={"lowercase"}
                          disabled
                          type={"checkbox"}
                          checked={lower_case}
                        />
                        <label
                          for={"lowercase"}
                          className="checkbox-custom-label"
                        >
                          Lowercase letters [abcdefghijkmnpqrstuvwxyz]
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <div
                        onClick={() =>
                          this.setState({
                            upper_case: !upper_case,
                          })
                        }
                        className="form-group smalls"
                      >
                        <input
                          id={"uppercase"}
                          className="checkbox-custom"
                          name={"uppercase"}
                          disabled
                          type={"checkbox"}
                          checked={upper_case}
                        />
                        <label
                          for={"uppercase"}
                          className="checkbox-custom-label"
                        >
                          Uppercase letters [ABCDEFGHJKLMNPQRSTUVWXYZ]
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <div
                        onClick={() =>
                          this.setState({
                            digits: !digits,
                          })
                        }
                        className="form-group smalls"
                      >
                        <input
                          id={"digits"}
                          className="checkbox-custom"
                          name={"digits"}
                          disabled
                          type={"checkbox"}
                          checked={digits}
                        />
                        <label for={"digits"} className="checkbox-custom-label">
                          Digits [23456789]
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <div
                        onClick={() =>
                          this.setState({
                            symbols: !symbols,
                          })
                        }
                        className="form-group smalls"
                      >
                        <input
                          id={"symbols"}
                          className="checkbox-custom"
                          name={"symbols"}
                          disabled
                          type={"checkbox"}
                          checked={symbols}
                        />
                        <label
                          for={"symbols"}
                          className="checkbox-custom-label"
                        >
                          Symbols [!#$%&()*+-=?[]|~@^_]
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.generate}
                />
              </form>
            </div>
          </div>
        </div>

        {password ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Password</h3>
            <h2 className="text-center mb-2" style={{ textTransform: "none" }}>
              {password}
            </h2>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Password_generator;
