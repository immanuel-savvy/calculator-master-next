import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Line_chart from "../line_charts";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";
import { scroll_to_top } from "../footer";

class Business_loan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: 10000,
      interest: 5,
      years: 3,
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
    let { principal, years, interest } = this.state;
    principal = Number(principal);
    years = Number(years);
    interest = Number(interest);

    // Convert interest rate from percentage to decimal
    let decimal_rate = interest / 100;

    // Calculate the monthly interest rate
    let monthly_rate = decimal_rate / 12;

    // Calculate the number of monthly payments
    let months = years * 12;

    // Calculate the monthly payment
    let payment =
      (principal * monthly_rate) / (1 - (1 + monthly_rate) ** -months);

    // Round the result to two decimal places
    let payment_rounded = Math.round(payment * 100) / 100;

    // Generate an array to store the amortization table
    let amortization_table = [];

    // Calculate the starting balance
    let balance = principal;
    let total_amount_paid = 0,
      total_interest_paid = 0;

    // Loop through each month and calculate the interest and principal payments
    for (let i = 1; i <= months; i++) {
      // Calculate the interest for the current month
      let interest = balance * monthly_rate;
      total_interest_paid += interest;

      // Calculate the principal for the current month
      let principal = payment - interest;

      // Round the principal to two decimal places
      let principal_rounded = Math.round(principal * 100) / 100;
      total_amount_paid += payment_rounded;

      // Calculate the remaining balance after the current month's payment
      balance = balance - principal;

      // Round the balance to two decimal places
      let balance_rounded = Math.round(balance * 100) / 100;

      // Add the current month's data to the amortization table
      amortization_table.push({
        month: i,
        balance: balance_rounded,
        principal: principal_rounded,
        interest: Math.round(interest * 100) / 100,
        payment: payment_rounded,
      });
    }

    // Generate an object with the results and the amortization table
    this.setState(
      {
        loan_amount: principal,
        loan_interest: interest,
        total_amount_paid,
        total_interest_paid,
        duration: years,
        monthly_payment: payment_rounded,
        amortization_table,
        done: true,
      },
      scroll_to_top
    );
  };

  render() {
    let {
      principal,
      done,
      years,
      interest,
      total_amount_paid,
      total_interest_paid,
      amortization_table,
      amortization_table_index,
      monthly_payment,
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
                  <Line_chart
                    title="Figures Trend"
                    data={{
                      labels: amortization_table.map((res) => res.month),
                      datasets: [
                        {
                          label: "Balance",
                          data: amortization_table.map((res) => res.balance),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                        {
                          label: "Principal",
                          data: amortization_table.map((res) => res.principal),
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "Interest",
                          data: amortization_table.map((res) => res.interest),
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
                      <tr key={entry.month}>
                        <td>{entry.month}</td>
                        <td>&#x24; {commalise_figures(entry.balance)}</td>
                        <td>&#x24; {commalise_figures(entry.principal)}</td>
                        <td>&#x24; {commalise_figures(entry.interest)}</td>
                        <td>&#x24; {commalise_figures(entry.payment)}</td>
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
                  <div className="col-12">
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

export default Business_loan;
