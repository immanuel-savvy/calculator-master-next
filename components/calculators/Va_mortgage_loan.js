import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Line_chart from "../line_charts";
import Pie_chart from "../pie_chart";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class VA_mortgage_loan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: 200000,
      interest: 4,
      years: 30,
      va_funding_fee: 2.3,
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
    let { principal, years, interest, va_funding_fee } = this.state;
    principal = Number(principal);
    years = Number(years);
    interest = Number(interest);
    va_funding_fee = Number(va_funding_fee);

    // Convert interest rate from percentage to decimal
    let decimal_rate = interest / 100;

    // Calculate the monthly interest rate
    let monthly_rate = decimal_rate / 12;

    // Calculate the number of monthly payments
    let months = years * 12;

    // Calculate the VA funding fee
    let funding_fee = va_funding_fee / 100;

    // Calculate the loan amount with funding fee included
    let loanAmount = principal * (1 + funding_fee);

    // Calculate the monthly payment
    let monthly_payment =
      (loanAmount * monthly_rate) / (1 - 1 / (1 + monthly_rate) ** months);

    // Calculate the total cost of the loan
    let total_cost = monthly_payment * months;

    // Generate the amortization schedule
    let amortisation_schedule = [];
    let balance = loanAmount;
    for (let i = 1; i <= months; i++) {
      let interest = balance * monthly_rate;
      let principal = monthly_payment - interest;
      balance -= principal;
      let payment = interest + principal;
      let row = {
        "S/N": i,
        payment: payment.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance.toFixed(2),
      };
      amortisation_schedule.push(row);
    }

    // Round the results to two decimal places
    let monthly_payment_rounded = Math.round(monthly_payment * 100) / 100;
    let total_cost_rounded = Math.round(total_cost * 100) / 100;

    // Generate an object with the results and the amortization schedule
    this.setState({
      monthly_payment: monthly_payment_rounded,
      total_cost: total_cost_rounded,
      amortisation_schedule,
      done: true,
    });
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
      va_funding_fee,
      total_cost,
    } = this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Monthly Payment</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(monthly_payment.toFixed(2))}
            </h2>

            <h3 className="text-center text-dark">Total Cost</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(total_cost.toFixed(2))}
            </h2>

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
                          data: [principal, total_cost - principal],
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
                      labels: amortisation_schedule.map((res) => res["S/N"]),
                      datasets: [
                        {
                          label: "Balance",
                          data: amortisation_schedule.map((res) => res.balance),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                        {
                          label: "Interest",
                          data: amortisation_schedule.map(
                            (res) => res.interest
                          ),
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "Principal",
                          data: amortisation_schedule.map(
                            (res) => res.principal
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
                      <tr key={entry["S/N"]}>
                        <td>{entry["S/N"]}</td>
                        <td>&#x24; {commalise_figures(entry.payment)}</td>
                        <td>&#x24; {commalise_figures(entry.principal)}</td>
                        <td>&#x24; {commalise_figures(entry.interest)}</td>
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
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Principal</label>
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
                      <label>Years</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Years"
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
                      <label>VA Funding Fee</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="VA Funding Fee"
                        value={va_funding_fee}
                        onChange={({ target }) =>
                          this.setState({ va_funding_fee: target.value })
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

export default VA_mortgage_loan;
