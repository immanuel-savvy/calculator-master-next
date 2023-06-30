import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Line_chart from "../line_charts";
import Pie_chart from "../pie_chart";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class Auto_loan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: 10000,
      interest: 5,
      duration: 3,
      down_payment: 0,
      amortization_table_index: this.index_size,
    };
  }

  is_set = () => {
    let { principal, duration, interest } = this.state;

    return principal && duration && interest;
  };

  index_size = 25;

  load_more = () => {
    let { amortization_table_index } = this.state;

    amortization_table_index += this.index_size;

    this.setState({ amortization_table_index });
  };

  calculate = () => {
    let { principal, duration, interest, down_payment } = this.state;
    principal = Number(principal);
    duration = Number(duration);
    interest = Number(interest);
    down_payment = Number(down_payment);

    // Calculate the loan amount minus the down payment
    principal = principal - down_payment;

    // Calculate the monthly interest rate and number of payments
    let monthly_interest_rate = interest / 12 / 100;
    let number_of_payments = duration * 12;

    // Calculate the monthly payment amount
    let monthly_payment =
      (principal * monthly_interest_rate) /
      (1 - (1 + monthly_interest_rate) ** -number_of_payments);

    // Calculate the total amount paid over the life of the loan
    let total_amount_paid = monthly_payment * number_of_payments;

    // Calculate the total interest paid over the life of the loan
    let total_interest_paid = total_amount_paid - principal;

    // Calculate the amortization table
    let balance = principal;
    let amortization_table = [];

    for (let i = 1; i <= number_of_payments; i++) {
      let interest = balance * monthly_interest_rate;
      let principal_payment = monthly_payment - interest;
      balance = balance - principal_payment;

      amortization_table.push({
        payment_number: i,
        payment_amount: monthly_payment.toFixed(2),
        principal_payment: principal_payment.toFixed(2),
        interest_payment: interest.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    // Return the results
    this.setState({
      done: true,
      monthly_payment,
      total_amount_paid,
      total_interest_paid,
      amortization_table,
    });
  };

  render() {
    let {
      principal,
      done,
      duration,
      interest,
      down_payment,
      monthly_payment,
      total_amount_paid,
      total_interest_paid,
      amortization_table,
      amortization_table_index,
    } = this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Monthly Payment</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(monthly_payment.toFixed(2))}
            </h2>

            <div className="row">
              <div className="col-lg-6 col-md-8 col-sm-12">
                <div className="form-group">
                  <div className="input-with-icon my-auto">
                    <label>
                      Total of {parseInt(amortization_table.length)} Payments
                    </label>
                    <input
                      className="form-control"
                      value={commalise_figures(total_amount_paid.toFixed(2))}
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
                    <label>Total Interest</label>
                    <input
                      className="form-control"
                      value={commalise_figures(total_interest_paid.toFixed(2))}
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
                    title="Total Payments"
                    data={{
                      labels: ["Principal", "Interest"],
                      datasets: [
                        {
                          label: "Amount",
                          data: [principal, total_interest_paid],
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
                      labels: amortization_table.map(
                        (res) => res.payment_number
                      ),
                      datasets: [
                        {
                          label: "Balance",
                          data: amortization_table.map((res) => res.balance),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                        {
                          label: "Principal Payment",
                          data: amortization_table.map(
                            (res) => res.principal_payment
                          ),
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "Interest Payment",
                          data: amortization_table.map(
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

        {amortization_table && amortization_table.length ? (
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
                  {Object.keys(amortization_table[0]).map((k) => (
                    <th key={k}>{to_title(k.replace(/_/g, " "))}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {amortization_table
                  .slice(0, amortization_table_index)
                  .map((entry) => {
                    return (
                      <tr key={entry.payment_number}>
                        <td>{entry.payment_number}</td>
                        <td>
                          &#x24; {commalise_figures(entry.payment_amount)}
                        </td>
                        <td>
                          &#x24; {commalise_figures(entry.principal_payment)}
                        </td>
                        <td>
                          &#x24; {commalise_figures(entry.interest_payment)}
                        </td>
                        <td>&#x24; {commalise_figures(entry.balance)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            {amortization_table_index < amortization_table.length ? (
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
                        value={duration}
                        onChange={({ target }) =>
                          this.setState({ duration: target.value })
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
                      <label>Down Payment</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Down Payment"
                        value={down_payment}
                        onChange={({ target }) =>
                          this.setState({ down_payment: target.value })
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

export default Auto_loan;
