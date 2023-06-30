import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Line_chart from "../line_charts";
import Pie_chart from "../pie_chart";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class FHA_loan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: 200000,
      interest: 3.5,
      years: 30,
      upfront_mip_percent: 1.75,
      annual_mip_percent: 0.85,
      amortization_table_index: this.index_size,
    };
  }

  is_set = () => {
    let { principal, years, interest } = this.state;

    return principal && years && interest;
  };

  index_size = 25;

  load_more = () => {
    let { amortization_table_index } = this.state;

    amortization_table_index += this.index_size;

    this.setState({ amortization_table_index });
  };

  calculate = () => {
    let {
      principal: total_loan_amount,
      interest,
      years,
      upfront_mip_percent,
      annual_mip_percent,
    } = this.state;

    // Calculate the upfront MIP
    let upfront_mip = total_loan_amount * (upfront_mip_percent / 100);

    // Calculate the monthly interest rate
    let monthly_rate = interest / 1200;

    // Calculate the number of monthly payments
    let num_payments = years * 12;

    // Calculate the base monthly payment
    let base_payment =
      (total_loan_amount * monthly_rate) /
      (1 - 1 / (1 + monthly_rate) ** num_payments);

    // Calculate the annual MIP amount
    let annual_mip =
      (total_loan_amount + upfront_mip) * (annual_mip_percent / 100);

    // Calculate the total monthly payment
    let total_payment = base_payment + annual_mip / 12;

    // Calculate the total cost of the loan
    let total_cost = total_payment * num_payments;

    // Calculate the amortization schedule
    let amortization_schedule = [];
    let remaining_balance = total_loan_amount;

    for (let i = 1; i <= num_payments; i++) {
      let interest_payment = remaining_balance * monthly_rate;
      let principal_payment = base_payment - interest_payment;
      let total_payment = base_payment + annual_mip / 12;

      amortization_schedule.push({
        payment_number: i,
        balance: remaining_balance,
        principal_payment,
        interest_payment,
        total_payment,
      });

      remaining_balance -= principal_payment;
    }

    // Return an object with the results and the amortization schedule
    this.setState({
      upfront_mip,
      base_payment,
      annual_mip,
      total_payment,
      total_cost,
      amortization_schedule,
      done: true,
    });
  };

  render() {
    let {
      principal,
      done,
      years,
      interest,
      amortization_schedule,
      upfront_mip_percent,
      annual_mip_percent,
      amortization_table_index,
      total_cost,
      base_payment,
      upfront_mip,
      annual_mip,
      total_payment,
    } = this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Total Cost</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(total_cost.toFixed(2))}
            </h2>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <div className="input-with-icon">
                    <label>Total Payment</label>
                    <input
                      className="form-control"
                      value={commalise_figures(total_payment.toFixed(2))}
                      disabled
                      style={{ backgroundColor: "#fff", color: "#000" }}
                    />

                    <i class="fa fa" style={{ marginTop: 15 }}>
                      <span style={{ color: "#000" }}>&#x24;</span>
                    </i>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-8 col-sm-12">
                <div className="form-group">
                  <div className="input-with-icon my-auto">
                    <label>Base Payment</label>
                    <input
                      className="form-control"
                      value={commalise_figures(base_payment.toFixed(2))}
                      disabled
                      style={{ backgroundColor: "#fff", color: "#000" }}
                    />

                    <i class="fa fa" style={{ marginTop: 15 }}>
                      <span style={{ color: "#000" }}>&#x24;</span>
                    </i>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <div className="input-with-icon">
                    <label>Upfront MIP</label>
                    <input
                      className="form-control"
                      value={commalise_figures(upfront_mip.toFixed(2))}
                      disabled
                      style={{ backgroundColor: "#fff", color: "#000" }}
                    />

                    <i class="fa fa" style={{ marginTop: 15 }}>
                      <span style={{ color: "#000" }}>&#x24;</span>
                    </i>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <div className="input-with-icon">
                    <label>Annual MIP</label>
                    <input
                      className="form-control"
                      value={commalise_figures(annual_mip.toFixed(2))}
                      disabled
                      style={{ backgroundColor: "#fff", color: "#000" }}
                    />

                    <i class="fa fa" style={{ marginTop: 15 }}>
                      <span style={{ color: "#000" }}>&#x24;</span>
                    </i>
                  </div>
                </div>
              </div>
            </div>

            <Container style={{ marginTop: 40, marginBottom: 40 }}>
              <Row style={{ textAlign: "center" }}>
                <Col md={8} sm={12} lg={6}>
                  <Pie_chart
                    title="Payments"
                    data={{
                      labels: ["Payments", "Base"],
                      datasets: [
                        {
                          label: "Amount",
                          data: [total_payment, base_payment],
                          backgroundColor: [
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                          ],
                          borderColor: [
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 99, 132, 1)",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </Col>
                <Col md={8} sm={12} lg={6}>
                  <Line_chart
                    title="Figures Trend"
                    data={{
                      labels: amortization_schedule.map(
                        (res) => res.payment_number
                      ),
                      datasets: [
                        {
                          label: "Balance",
                          data: amortization_schedule.map((res) => res.balance),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                        {
                          label: "Principal Payment",
                          data: amortization_schedule.map(
                            (res) => res.principal_payment
                          ),
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "Interest Payment",
                          data: amortization_schedule.map(
                            (res) => res.interest_payment
                          ),
                          borderColor: "rgb(154, 0, 132)",
                          backgroundColor: "rgba(154, 0, 132, 0.5)",
                        },
                      ],
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        ) : null}

        {amortization_schedule && amortization_schedule.length ? (
          <div className="crs_grid p-2 py-5 text-center">
            <Table
              style={{ width: "100%", textAlign: "center" }}
              className="result_table"
              bordered
              hover
              responsive
            >
              <thead>
                <tr>
                  {Object.keys(amortization_schedule[0]).map((k) => (
                    <th key={k}>{to_title(k.replace(/_/g, " "))}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {amortization_schedule
                  .slice(0, amortization_table_index)
                  .map((entry) => {
                    return (
                      <tr key={entry.payment_number}>
                        <td>{entry.payment_number}</td>
                        <td>&#x24; {commalise_figures(entry.balance)}</td>
                        <td>
                          &#x24; {commalise_figures(entry.principal_payment)}
                        </td>
                        <td>
                          &#x24; {commalise_figures(entry.interest_payment)}
                        </td>
                        <td>&#x24; {commalise_figures(entry.total_payment)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            {amortization_table_index < amortization_schedule.length ? (
              <Stretch_button title="Load More" action={this.load_more} />
            ) : null}
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
                      <label>Loan Amount</label>
                      <input
                        type="number"
                        value={principal}
                        onChange={({ target }) =>
                          this.setState({ principal: target.value })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder="Principal"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Loan Term (Years)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Duration"
                        value={years}
                        onChange={({ target }) =>
                          this.setState({ years: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Interest (%)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Interest"
                        value={interest}
                        onChange={({ target }) =>
                          this.setState({ interest: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Upfront MIP (%)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Upfront MIP"
                        value={upfront_mip_percent}
                        onChange={({ target }) =>
                          this.setState({ upfront_mip_percent: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Annual MIP (%)</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Annual MIP"
                        value={annual_mip_percent}
                        onChange={({ target }) =>
                          this.setState({ annual_mip_percent: target.value })
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

export default FHA_loan;
