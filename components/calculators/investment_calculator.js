import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Line_chart from "../line_charts";
import Pie_chart from "../pie_chart";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class Investment_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: 20000,
      monthly_contribution: 1000,
      num_years: 10,
      interest_rate: 6,
      amortization_table_index: this.index_size,
    };
  }

  index_size = 12;

  load_more = () => {
    let { amortization_table_index } = this.state;

    amortization_table_index += this.index_size;

    this.setState({ amortization_table_index });
  };

  is_set = () => {
    let { principal, interest_rate, monthly_contribution, num_years } =
      this.state;

    return principal && interest_rate && monthly_contribution && num_years;
  };

  calculate = () => {
    let { principal, interest_rate, monthly_contribution, num_years } =
      this.state;

    principal = Number(principal) || 0;
    interest_rate = Number(interest_rate) || 0;
    monthly_contribution = Number(monthly_contribution) || 0;
    num_years = Number(num_years) || 0;

    let monthly_interest_rate = interest_rate / 1200;
    let num_months = num_years * 12;

    // Calculate total contributions
    let total_contributions = monthly_contribution * num_months + principal;

    // Calculate total interest
    let total_interest = 0;
    let balance = principal;
    for (let i = 0; i < num_months; i++) {
      let interest = balance * monthly_interest_rate;
      total_interest += interest;
      balance += monthly_contribution + interest;
    }

    // Calculate monthly payment
    let monthly_payment =
      (principal *
        monthly_interest_rate *
        Math.pow(1 + monthly_interest_rate, num_months)) /
      (Math.pow(1 + monthly_interest_rate, num_months) - 1);

    // Generate amortization table
    let amortization_table = [];
    let remaining_balance = principal;
    for (let i = 0; i < num_months; i++) {
      let interest = remaining_balance * monthly_interest_rate;
      let principal_payment = monthly_payment - interest;
      remaining_balance -= principal_payment;
      amortization_table.push({
        month: i + 1,
        balance: remaining_balance,
        principal_payment,
        interest_payment: interest,
        total_payment: monthly_payment,
      });
    }

    this.setState({
      total_contributions,
      total_interest,
      amortization_table,
      ending_balance: amortization_table.slice(-1)[0].balance,
      done: true,
    });
  };

  render() {
    let {
      principal,
      interest_rate,
      total_interest,
      total_contributions,
      monthly_contribution,
      num_years,
      amortization_table,
      amortization_table_index,
      done,
    } = this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Total Contributions</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(total_contributions.toFixed(2))}
            </h2>

            <br />
            <h3 className="text-center text-dark">Total Interest</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(total_interest.toFixed(2))}
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
                          data: [total_contributions, total_interest],
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
                      labels: amortization_table.map((res) => res.month),
                      datasets: [
                        {
                          label: "Interest Payment",
                          data: amortization_table.map(
                            (res) => res.interest_payment
                          ),
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
                <tr>
                  <th colSpan={5} style={{ textAlign: "center" }}>
                    Year {1}
                  </th>
                </tr>

                {amortization_table
                  .slice(0, amortization_table_index)
                  .map((entry) => {
                    return (
                      <>
                        <tr key={entry.month}>
                          <td>{entry.month}</td>
                          <td>&#x24; {commalise_figures(entry.balance)}</td>
                          <td>
                            &#x24; {commalise_figures(entry.principal_payment)}
                          </td>
                          <td>
                            &#x24; {commalise_figures(entry.interest_payment)}
                          </td>
                          <td>
                            &#x24; {commalise_figures(entry.total_payment)}
                          </td>
                        </tr>

                        {entry.month % 12 === 0 ? (
                          <tr>
                            <th style={{ textAlign: "center" }} colSpan={5}>
                              Year {entry.month / 12 + 1}
                            </th>
                          </tr>
                        ) : null}
                      </>
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
                <div className="form-group">
                  <div className="">
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
                <div className="form-group">
                  <div className="">
                    <label>Monthly Contributions</label>
                    <input
                      type="number"
                      value={monthly_contribution}
                      onChange={({ target }) =>
                        this.setState({ monthly_contribution: target.value })
                      }
                      className="form-control"
                      style={{ fontSize: 16, color: "#000" }}
                      placeholder="Monthly Contribution"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Interest Rate</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Interest Rate"
                        value={interest_rate}
                        onChange={({ target }) =>
                          this.setState({ interest_rate: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Number Of Years</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Number Of Years"
                        value={num_years}
                        onChange={({ target }) =>
                          this.setState({ num_years: target.value })
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

export default Investment_calculator;
