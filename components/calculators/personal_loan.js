import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Line_chart from "../line_charts";
import Pie_chart from "../pie_chart";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";
import { scroll_to_top } from "../footer";

class Personal_loan extends React.Component {
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

    // Calculate the number of months in the loan term
    let months = years * 12;

    // Calculate the monthly interest rate
    let monthly_rate = decimal_rate / 12;

    // Calculate the monthly payment
    let monthly_payment =
      (principal * monthly_rate) / (1 - (1 + monthly_rate) ** -months);

    // Round the monthly payment to two decimal places
    let monthly_payment_rounded = Math.round(monthly_payment * 100) / 100;

    // Calculate the total amount paid
    let total_paid = monthly_payment_rounded * months;

    // Calculate the total interest paid
    let total_interest = total_paid - principal;

    // Create an empty array to hold the amortization schedule
    let amortisation_schedule = new Array();

    // Initialize the balance to the principal
    let balance = principal;

    // Loop through each month and calculate the payment, interest, and new balance
    for (let i = 1; i <= months; i++) {
      let interest = balance * monthly_rate;
      let payment = monthly_payment_rounded;
      let principal_paid = payment - interest;
      balance -= principal_paid;
      balance = Math.round(balance * 100) / 100;

      // Add the current month's data to the amortization schedule array
      amortisation_schedule.push({
        month: i,
        payment,
        principal_paid,
        interest_paid: interest,
        balance,
      });
    }

    // Generate an object with the results
    this.setState(
      {
        monthly_payment: monthly_payment_rounded,
        total_paid,
        total_interest,
        amortisation_schedule,
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
      monthly_payment,
      amortisation_schedule,
      amortization_table_index,
      total_paid,
      total_interest,
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
                      Total of {parseInt(amortisation_schedule.length)} Payments
                    </label>
                    <input
                      className="form-control"
                      value={commalise_figures(total_paid.toFixed(2))}
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
                      value={commalise_figures(total_interest.toFixed(2))}
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
                          data: [principal, total_interest],
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
                      labels: amortisation_schedule.map(
                        (res) => res.payment_number
                      ),
                      datasets: [
                        {
                          label: "Balance",
                          data: amortisation_schedule.map((res) => res.balance),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                        {
                          label: "Principal Payment",
                          data: amortisation_schedule.map(
                            (res) => res.principal_paid
                          ),
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "Interest Payment",
                          data: amortisation_schedule.map(
                            (res) => res.interest_paid
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

        {amortisation_schedule && amortisation_schedule.length ? (
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
                  {Object.keys(amortisation_schedule[0]).map((k) => (
                    <th key={k}>{to_title(k.replace(/_/g, " "))}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {amortisation_schedule
                  .slice(0, amortization_table_index)
                  .map((entry) => {
                    return (
                      <tr key={entry.month}>
                        <td>{entry.month}</td>
                        <td>&#x24; {commalise_figures(entry.payment)}</td>
                        <td>
                          &#x24; {commalise_figures(entry.principal_paid)}
                        </td>
                        <td>&#x24; {commalise_figures(entry.interest_paid)}</td>
                        <td>&#x24; {commalise_figures(entry.balance)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            {amortization_table_index < amortisation_schedule.length ? (
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

export default Personal_loan;
