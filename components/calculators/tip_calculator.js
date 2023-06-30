import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Tip_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bill_amount: 75,
      tip_percentage: 18,
      num_people: 4,
    };
  }

  is_set = () => {
    let { bill_amount, tip_percentage, num_people } = this.state;

    return bill_amount && tip_percentage && num_people;
  };

  calculate = () => {
    let { bill_amount, tip_percentage, num_people } = this.state;

    bill_amount = Number(bill_amount);
    tip_percentage = Number(tip_percentage);
    num_people = Number(num_people);

    tip_percentage /= 100;

    // Calculate tip amount
    let tip_amount = bill_amount * (tip_percentage / 100);

    let per_person_amount = tip_amount / num_people;

    // Calculate bill_amount amount including tip
    let total_amount = bill_amount + tip_amount;

    // Generate an object with the results
    this.setState({
      tip_amount,
      total_amount,
      per_person_amount,
      done: true,
    });
  };

  render() {
    let {
      bill_amount,
      tip_percentage,
      num_people,
      done,
      tip_amount,
      total_amount,
      per_person_amount,
    } = this.state;

    return (
      <div>
        {done ? (
          <div>
            <div className="crs_grid py-4 px-3">
              <h3 className="text-center text-dark">Result</h3>
              <Table
                style={{ width: "100%", textAlign: "center" }}
                className="result_table"
                bordered
                hover
                responsive
              >
                <tbody>
                  <tr>
                    <th>Tip Amount</th>
                    <td>&#x24; {commalise_figures(tip_amount)}</td>
                  </tr>

                  <tr>
                    <th>Tip per Person</th>
                    <td>&#x24; {commalise_figures(per_person_amount)}</td>
                  </tr>

                  <tr>
                    <th>Total Amount</th>
                    <td>&#x24; {commalise_figures(total_amount)}</td>
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
                  <div className="col-12">
                    <div className="form-group">
                      <label>Bill Amount</label>
                      <input
                        type="number"
                        value={bill_amount}
                        onChange={({ target }) =>
                          this.setState({ bill_amount: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Bill Amount"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Tip Percentage (%)</label>
                      <input
                        type="number"
                        value={tip_percentage}
                        onChange={({ target }) =>
                          this.setState({ tip_percentage: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Tip Percentage"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Number of People</label>
                      <input
                        type="number"
                        min="0"
                        value={num_people}
                        onChange={({ target }) =>
                          this.setState({ num_people: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Number of People"
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

export default Tip_calculator;
