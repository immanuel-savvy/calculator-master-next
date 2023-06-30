import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Sales_price extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      original_price: 100,
      discount_percentage: 10,
    };
  }

  is_set = () => {
    let { original_price, discount_percentage } = this.state;

    return original_price && discount_percentage;
  };

  calculate = () => {
    let { original_price, discount_percentage } = this.state;

    original_price = Number(original_price);
    discount_percentage = Number(discount_percentage);

    // Convert the discount percentage from a percentage to a decimal
    let decimalDiscount = discount_percentage / 100;

    // Calculate the amount of the discount
    let discount_amount = original_price * decimalDiscount;

    // Calculate the sales price
    let sales_price = original_price - discount_amount;

    // Generate an object with the results
    this.setState({
      original_price,
      discount_percentage,
      discount_amount,
      sales_price,
      done: true,
    });
  };

  render() {
    let {
      original_price,
      discount_percentage,
      sales_price,
      discount_amount,
      done,
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
                    <th>Original Price</th>
                    <td>&#x24; {commalise_figures(original_price)}</td>
                  </tr>

                  <tr>
                    <th>Discount Percentage</th>
                    <td>{commalise_figures(discount_percentage)}%</td>
                  </tr>

                  <tr>
                    <th>Discount Amount</th>
                    <td>&#x24; {commalise_figures(discount_amount)}</td>
                  </tr>

                  <tr>
                    <th>Sales Price</th>
                    <td>&#x24; {commalise_figures(sales_price)}</td>
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
                      <label>Original Price</label>
                      <input
                        type="number"
                        value={original_price}
                        onChange={({ target }) =>
                          this.setState({ original_price: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Original Price"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Discount Percentage (%)</label>
                      <input
                        type="number"
                        value={discount_percentage}
                        onChange={({ target }) =>
                          this.setState({ discount_percentage: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Discount Percentage"
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

export default Sales_price;
