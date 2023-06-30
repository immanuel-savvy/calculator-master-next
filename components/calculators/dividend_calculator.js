import React from "react";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";

class Dividend_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      share_price: 50,
      dividend_yield: 2.5,
      shares: 1000,
    };
  }

  is_set = () => {
    let { share_price, dividend_yield, shares } = this.state;

    return share_price && dividend_yield && shares;
  };

  calculate = () => {
    let { share_price, dividend_yield, shares } = this.state;

    share_price = Number(share_price);
    dividend_yield = Number(dividend_yield);
    shares = Number(shares);

    // Convert dividend yield from percentage to decimal
    const decimal_yield = dividend_yield / 100;

    // Calculate the annual dividend per share
    const annual_dividend_per_share = share_price * decimal_yield;

    // Calculate the total annual dividend
    const total_annual_dividend = annual_dividend_per_share * shares;

    // Generate an object with the results
    this.setState({
      done: true,
      annual_dividend_per_share: annual_dividend_per_share.toFixed(2),
      total_annual_dividend: total_annual_dividend.toFixed(2),
    });
  };

  render() {
    let {
      annual_dividend_per_share,
      total_annual_dividend,
      share_price,
      dividend_yield,
      shares,
      done,
    } = this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Annual Dividend Per Share</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(annual_dividend_per_share)}
            </h2>

            <h3 className="text-center text-dark">Total Annual Dividend</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(total_annual_dividend)}
            </h2>
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
                      <label>Share Price</label>
                      <input
                        type="number"
                        value={share_price}
                        onChange={({ target }) =>
                          this.setState({ share_price: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Share Price"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Dividend Yield</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Dividend Yield"
                        value={dividend_yield}
                        onChange={({ target }) =>
                          this.setState({ dividend_yield: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Shares</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Duration"
                        value={shares}
                        onChange={({ target }) =>
                          this.setState({ shares: target.value })
                        }
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

export default Dividend_calculator;
