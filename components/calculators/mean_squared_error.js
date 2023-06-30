import React from "react";
import Alert_box from "../alert_box";
import Stretch_button from "../stretch_btn";

class Mean_squared_error extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      predicted_data: "5,10,15,20,25",
      actual_data: "6,11,14,18,27",
    };
  }

  handle_numbers = ({ target }, type) => {
    let numbers = target.value;

    numbers = numbers.replace(/ /g, ",").split(",");

    numbers = numbers.filter((n, i) => {
      if (!n && i + 1 !== numbers.length) return;

      n = Number(n);
      if (!n && n !== 0) return false;
      return true;
    });

    this.setState({ [type]: numbers.join(","), message: "" });
  };

  calculate = () => {
    let { actual_data, predicted_data } = this.state;

    actual_data = actual_data.split(",").map((n) => Number(n));

    predicted_data = predicted_data.split(",").map((n) => Number(n));

    if (actual_data.length !== predicted_data.length)
      return this.setState({ message: "Data must have the same length" });

    let squared_errors = actual_data.map(
      (val, i) => (val - predicted_data[i]) ** 2
    );
    let mse =
      squared_errors.reduce((acc, val) => acc + val, 0) / actual_data.length;

    this.setState({ mse, done: true, message: "" });
  };

  render() {
    let { actual_data, predicted_data, done, mse, message } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Basic Statistics</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              {message ? <Alert_box message={message} type="info" /> : null}

              <form>
                <div className="row">
                  <div className="form-group">
                    <label>Actual Data</label>
                    <textarea
                      className="form-control"
                      type="number"
                      placeholder="Actual Data"
                      value={actual_data}
                      onChange={(e) => this.handle_numbers(e, "actual_data")}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Predicted Data</label>
                    <textarea
                      className="form-control"
                      type="number"
                      placeholder="Predicted Data"
                      value={predicted_data}
                      onChange={(e) => this.handle_numbers(e, "predicted_data")}
                    ></textarea>
                  </div>
                </div>

                <Stretch_button
                  disabled={!actual_data || !predicted_data}
                  title="Calculate"
                  action={this.calculate}
                />
              </form>
            </div>
          </div>
        </div>

        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Mean Squared Error</h3>
            <h2 className="text-center mb-2">{mse}</h2>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Mean_squared_error;
