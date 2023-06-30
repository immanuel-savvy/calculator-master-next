import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Line_chart from "../line_charts";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { scroll_to_top } from "../footer";
import { to_title } from "@/assets/js/utils/functions";

class Compound_interest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: 1000,
      interest: 5,
      years: 10,
      compound_per_year: 12,
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
    let { principal, years, interest, compound_per_year } = this.state;
    principal = Number(principal) || 0;
    years = Number(years) || 0;
    interest = Number(interest) || 0;
    compound_per_year = Number(compound_per_year) || 0;

    // Convert interest rate from percentage to decimal
    let decimal_rate = interest / 100;

    // Calculate the compound interest
    let total =
      principal *
      (1 + decimal_rate / compound_per_year) ** (compound_per_year * years);

    // Round the result to two decimal places
    let total_rounded = Math.round(total * 100) / 100;

    // Calculate the interest earned
    let interest_earned = total_rounded - principal;

    // Round the interest earned to two decimal places
    let interest_earned_rounded = Math.round(interest_earned * 100) / 100;

    // Calculate the payment schedule
    let payment_schedule = new Array();
    let balance = principal;
    let interest_paid = 0;
    let principal_paid = 0;

    for (let i = 0; i < years * compound_per_year; i++) {
      // Calculate the interest and principal paid for this period
      let period_interest = (balance * decimal_rate) / compound_per_year;
      let period_interval = (total - balance) / (years * compound_per_year - i);

      // Update the balance and totals
      balance -= period_interval;
      interest_paid += period_interest;
      principal_paid += period_interval;

      // Add the payment details to the schedule
      payment_schedule.push({
        period: i + 1,
        balance: Math.round(balance * 100) / 100,
        interest_paid: Math.round(period_interest * 100) / 100,
        principal_paid: Math.round(period_interval * 100) / 100,
      });
    }

    // Generate an object with the results
    this.setState(
      {
        total: total_rounded,
        interest_earned: interest_earned_rounded,
        payment_schedule,
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
      payment_schedule,
      amortization_table_index,
      compound_per_year,
      interest_earned,
      total,
    } = this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Total</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(total.toFixed(2))}
            </h2>

            <h3 className="text-center text-dark">Interest Earned</h3>
            <h2 className="text-center mb-2">
              &#x24; {commalise_figures(interest_earned.toFixed(2))}
            </h2>

            <Container style={{ marginTop: 40, marginBottom: 40 }}>
              <Row style={{ textAlign: "center" }}>
                <Col md={8} sm={12} lg={6}>
                  <Line_chart
                    title="Figures Trend"
                    data={{
                      labels: payment_schedule.map((res) => res.period),
                      datasets: [
                        {
                          label: "Balance",
                          data: payment_schedule.map((res) => res.balance),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                        {
                          label: "Principal",
                          data: payment_schedule.map(
                            (res) => res.interest_paid
                          ),
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "Interest",
                          data: payment_schedule.map(
                            (res) => res.principal_paid
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

        {payment_schedule && payment_schedule.length ? (
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
                  {Object.keys(payment_schedule[0]).map((k) => (
                    <th key={k}>{to_title(k.replace(/_/g, " "))}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {payment_schedule
                  .slice(0, amortization_table_index)
                  .map((entry) => {
                    return (
                      <tr key={entry.period}>
                        <td>{entry.period}</td>
                        <td>&#x24; {commalise_figures(entry.balance)}</td>
                        <td>&#x24; {commalise_figures(entry.interest_paid)}</td>
                        <td>
                          &#x24; {commalise_figures(entry.principal_paid)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            {amortization_table_index < payment_schedule.length ? (
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
                      <label>Compound per Year</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Compound per Year"
                        value={compound_per_year}
                        onChange={({ target }) =>
                          this.setState({ compound_per_year: target.value })
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

export default Compound_interest;
