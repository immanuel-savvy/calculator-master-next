import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Line_chart from "../line_charts";
import Pie_chart from "../pie_chart";
import Stretch_button from "../stretch_btn";
import { scroll_to_top } from "../footer";
import {
  to_title,
  commalise_figures,
  date_string,
} from "@/assets/js/utils/functions";

class Morgage_loan_repayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: 400000,
      interest: 5,
      duration: 30,
      interval: this.payment_intervals[0],
      amortization_table_index: this.index_size,
    };
  }

  index_size = 25;

  load_more = () => {
    let { amortization_table_index } = this.state;

    amortization_table_index += this.index_size;

    this.setState({ amortization_table_index });
  };

  is_set = () => {
    let { principal, duration, interest } = this.state;

    return principal && duration && interest;
  };

  payment_intervals = new Array("monthly", "quarterly", "yearly");

  intervals_et_number_of_annual_payments = new Object({
    [this.payment_intervals[0]]: 12,
    [this.payment_intervals[1]]: 4,
    [this.payment_intervals[2]]: 1,
  });

  month = 60 * 60 * 24 * 30 * 1000;

  commalise_figures = (value) => {
    let integer = Math.floor(value);
    let decimal = (value - integer).toFixed(2).toString();

    let commalised = commalise_figures(integer);

    return `${commalised}${decimal.slice(decimal.indexOf("."))}`;
  };

  calculate = () => {
    let {
      principal: loan_amount,
      duration: loan_term,
      interest: interest_rate,
      interval,
    } = this.state;
    let payments_per_year =
      this.intervals_et_number_of_annual_payments[interval];

    loan_amount = Number(loan_amount);
    loan_term = Number(loan_term);
    interest_rate = Number(interest_rate);

    let total_payments = loan_term * payments_per_year;
    let monthly_interest_rate = interest_rate / 100 / payments_per_year;
    let discount_factor =
      ((1 + monthly_interest_rate) ** total_payments - 1) /
      (monthly_interest_rate * (1 + monthly_interest_rate) ** total_payments);
    let monthly_payment = loan_amount / discount_factor;

    let balance = loan_amount,
      total_interest = 0;
    let amortization_table = [];
    for (let i = 0; i < total_payments; i++) {
      let interest_payment = balance * monthly_interest_rate;
      let principal_payment = monthly_payment - interest_payment;
      balance -= principal_payment;

      total_interest += interest_payment;

      amortization_table.push({
        payment_number: i + 1,
        balance: balance.toFixed(2),
        principal_payment: principal_payment.toFixed(2),
        interest_payment: interest_payment.toFixed(2),
        total_payment: monthly_payment.toFixed(2),
      });
    }

    let total_morgage_repayment = amortization_table.length * monthly_payment;

    let end_date = Date.now();
    let n = total_morgage_repayment / monthly_payment;
    end_date += n * (12 / payments_per_year) * this.month;

    this.setState(
      {
        repayment: monthly_payment,
        amortization_table,
        total_morgage_repayment,
        total_interest,
        end_date,
      },
      scroll_to_top
    );
  };

  render() {
    let {
      principal,
      duration,
      interval,
      interest,
      end_date,
      total_morgage_repayment,
      total_interest,
      repayment,
      amortization_table,
      amortization_table_index,
    } = this.state;

    return (
      <div>
        {total_morgage_repayment ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">{interval} payment</h3>
            <h2 className="text-center mb-2">
              &#x24; {this.commalise_figures(repayment.toFixed(2))}
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
                      value={this.commalise_figures(
                        total_morgage_repayment.toFixed(2)
                      )}
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
                      value={this.commalise_figures(total_interest.toFixed(2))}
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

            <div className="form-group">
              <div className="">
                <label>End Date</label>
                <input
                  value={date_string(end_date).slice(3)}
                  className="form-control"
                  style={{ fontSize: 16, color: "#000", textAlign: "center" }}
                  disabled
                />
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
                        <td>&#x24; {this.commalise_figures(entry.balance)}</td>
                        <td>
                          &#x24;{" "}
                          {this.commalise_figures(entry.principal_payment)}
                        </td>
                        <td>
                          &#x24;{" "}
                          {this.commalise_figures(entry.interest_payment)}
                        </td>
                        <td>
                          &#x24; {this.commalise_figures(entry.total_payment)}
                        </td>
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
                <div className="form-group">
                  <div className="">
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
                <div className="row">
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
                </div>

                <div className="form-group">
                  <label>Payment Intervals</label>

                  <div className="simple-input">
                    <select
                      id="bank"
                      onChange={({ target }) =>
                        this.setState({ interval: target.value })
                      }
                      className="form-control"
                    >
                      {this.payment_intervals.map((interval) => (
                        <option key={interval} value={interval}>
                          {to_title(interval.replace(/_/g, " "))}
                        </option>
                      ))}
                    </select>
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

export default Morgage_loan_repayment;
