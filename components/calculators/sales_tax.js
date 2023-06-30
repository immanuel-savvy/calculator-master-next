import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Sales_tax extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 100,
      tax_rate: 0.1,
    };
  }

  is_set = () => {
    let { price, tax_rate } = this.state;

    return price && tax_rate;
  };

  calculate = () => {
    let { price, tax_rate } = this.state;

    price = Number(price);
    tax_rate = Number(tax_rate);

    // Convert the tax rate from percentage to decimal
    let decimal_rate = tax_rate / 100;

    // Calculate the sales tax
    let sales_tax = price * decimal_rate;

    // Calculate the total cost
    let total_cost = price + sales_tax;

    // Round the results to two decimal places
    let sales_tax_rounded = Math.round(sales_tax * 100) / 100;
    let total_cost_rounded = Math.round(total_cost * 100) / 100;

    // Generate an object with the results
    this.setState({
      done: true,
      price: price,
      tax_rate: tax_rate,
      sales_tax: sales_tax_rounded,
      total_cost: total_cost_rounded,
    });
  };

  render() {
    let { price, tax_rate, sales_tax, total_cost, done } = this.state;

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
                    <th>Total Cost</th>
                    <td>&#x24; {commalise_figures(total_cost)}</td>
                  </tr>

                  <tr>
                    <th>Sales Tax</th>
                    <td>&#x24; {commalise_figures(sales_tax)}</td>
                  </tr>

                  <tr>
                    <th>Tax Rate</th>
                    <td>{tax_rate}</td>
                  </tr>

                  <tr>
                    <th>Price</th>
                    <td>&#x24; {commalise_figures(price)}</td>
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
                      <label>Bill Amount</label>
                      <input
                        type="number"
                        value={price}
                        onChange={({ target }) =>
                          this.setState({ price: target.value })
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
                        value={tax_rate}
                        onChange={({ target }) =>
                          this.setState({ tax_rate: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Tip Percentage"
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

export default Sales_tax;
