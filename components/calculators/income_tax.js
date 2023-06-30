import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import Text_btn from "../text_btn";
import { commalise_figures } from "./salary_calculator";
import { to_title } from "@/assets/js/utils/functions";

class Income_tax extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_advance = () => this.setState({ advanced: !this.state.advanced });

  is_set = () => {
    let { income } = this.state;

    return Number(income) > 0;
  };

  taxBrackets = {
    single: [
      { maxIncome: 9875, rate: 0.1 },
      { maxIncome: 40125, rate: 0.12 },
      { maxIncome: 85525, rate: 0.22 },
      { maxIncome: 163300, rate: 0.24 },
      { maxIncome: 207350, rate: 0.32 },
      { maxIncome: 518400, rate: 0.35 },
      { maxIncome: Infinity, rate: 0.37 },
    ],
    married: [
      { maxIncome: 19750, rate: 0.1 },
      { maxIncome: 80250, rate: 0.12 },
      { maxIncome: 171050, rate: 0.22 },
      { maxIncome: 326600, rate: 0.24 },
      { maxIncome: 414700, rate: 0.32 },
      { maxIncome: 622050, rate: 0.35 },
      { maxIncome: Infinity, rate: 0.37 },
    ],
    head_of_household: [
      { maxIncome: 14100, rate: 0.1 },
      { maxIncome: 53700, rate: 0.12 },
      { maxIncome: 85500, rate: 0.22 },
      { maxIncome: 163300, rate: 0.24 },
      { maxIncome: 207350, rate: 0.32 },
      { maxIncome: 518400, rate: 0.35 },
      { maxIncome: Infinity, rate: 0.37 },
    ],
    widow: [
      { maxIncome: 19750, rate: 0.1 },
      { maxIncome: 80250, rate: 0.12 },
      { maxIncome: 171050, rate: 0.22 },
      { maxIncome: 326600, rate: 0.24 },
      { maxIncome: 414700, rate: 0.32 },
      { maxIncome: 622050, rate: 0.35 },
      { maxIncome: Infinity, rate: 0.37 },
    ],
    married_filing_separately: [
      { maxIncome: 9875, rate: 0.1 },
      { maxIncome: 40125, rate: 0.12 },
      { maxIncome: 85525, rate: 0.22 },
      { maxIncome: 163300, rate: 0.24 },
      { maxIncome: 207350, rate: 0.32 },
      { maxIncome: 311025, rate: 0.35 },
      { maxIncome: Infinity, rate: 0.37 },
    ],
  };

  calculate = () => {
    let {
      income,
      filing_status,
      number_of_dependents,
      deductions,
      standard_deduction,
      itemized_deductions,
      tax_credits,
      other_taxable_income,
      state_tax_paid,
      pre_tax_deductions,
      pre_tax_contributions,
      post_tax_deductions,
    } = this.state;

    income = Number(income) || 0;
    filing_status = filing_status || "single";

    deductions = Number(deductions) || 0;
    standard_deduction = Number(standard_deduction) || 0;
    itemized_deductions = Number(itemized_deductions) || 0;
    tax_credits = Number(tax_credits) || 0;
    number_of_dependents = Number(number_of_dependents) || 0;
    post_tax_deductions = Number(post_tax_deductions) || 0;
    pre_tax_contributions = Number(pre_tax_contributions) || 0;
    pre_tax_deductions = Number(pre_tax_deductions) || 0;
    state_tax_paid = Number(state_tax_paid) || 0;
    other_taxable_income = Number(other_taxable_income) || 0;

    // Define tax brackets based on filing status
    let taxBrackets = this.taxBrackets;

    // Determine tax bracket based on income and filing status
    let taxBracket;
    for (let i = 0; i < taxBrackets[filing_status].length; i++) {
      if (income > taxBrackets[filing_status][i].maxIncome) {
        taxBracket = taxBrackets[filing_status][i];
      } else {
        break;
      }
    }

    if (!taxBracket) taxBracket = taxBrackets[filing_status][0];

    // Calculate tax liability based on income and tax bracket rate
    let tax_liability = (income - taxBracket.maxIncome) * taxBracket.rate;
    for (
      let i = taxBrackets[filing_status].indexOf(taxBracket) - 1;
      i >= 0;
      i--
    ) {
      tax_liability +=
        (taxBrackets[filing_status][i + 1].maxIncome -
          taxBrackets[filing_status][i].maxIncome) *
        taxBrackets[filing_status][i].rate;
    }

    // Calculate adjusted gross income
    const adjusted_gross_icome =
      income -
      (deductions ||
        number_of_dependents * 500 ||
        standard_deduction ||
        itemized_deductions ||
        0);

    // Calculate taxable income
    const taxable_income =
      adjusted_gross_icome +
      other_taxable_income -
      tax_credits -
      state_tax_paid;

    // Calculate final tax liability
    const final_tax_liability = Math.max(tax_liability - taxable_income, 0);

    // Calculate total deductions
    const total_deductions = pre_tax_deductions + post_tax_deductions;

    // Calculate total exemptions
    const total_exemptions = number_of_dependents * 500;

    // Calculate marginal tax rate
    const marginal_tax_rate = taxBracket.rate;

    // Calculate tax pre-payments
    const tax_pre_payments = pre_tax_contributions + state_tax_paid;

    this.setState({
      tax_liability,
      adjusted_gross_icome,
      taxable_income,
      final_tax_liability,
      total_deductions,
      total_exemptions,
      marginal_tax_rate,
      tax_pre_payments,
      done: true,
    });
  };

  render() {
    let {
      done,
      income,
      number_of_dependents,
      deductions,
      total_exemptions,
      tax_liability,
      taxable_income,
      final_tax_liability,
      tax_credits,
      adjusted_gross_icome,
      marginal_tax_rate,
      advanced,
      total_deductions,
      other_taxable_income,
      pre_tax_contributions,
      post_tax_deductions,
      pre_tax_deductions,
      state_tax_paid,
    } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h5 className="modal-title text-dark">Calculator</h5>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="form-group">
                  <div className="">
                    <label>Income</label>
                    <input
                      type="number"
                      value={income}
                      onChange={({ target }) =>
                        this.setState({ income: target.value })
                      }
                      className="form-control"
                      style={{ fontSize: 16, color: "#000" }}
                      placeholder="Income"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Filing Status</label>

                  <div className="simple-input">
                    <select
                      id="status"
                      onChange={({ target }) =>
                        this.setState({ filing_status: target.value })
                      }
                      className="form-control"
                    >
                      {Object.keys(this.taxBrackets).map((filing_status) => (
                        <option key={filing_status} value={filing_status}>
                          {to_title(filing_status.replace(/_/g, " "))}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Number Of Dependents</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Number of Dependents"
                        value={number_of_dependents}
                        onChange={({ target }) =>
                          this.setState({ number_of_dependents: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Deductions</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Deductions"
                        value={deductions}
                        onChange={({ target }) =>
                          this.setState({ deductions: target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text_btn
                    action={this.toggle_advance}
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    text="Advance Options"
                  />
                </div>
                {advanced ? (
                  <>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Pre Tax Deductions</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Pre Tax Deductions"
                            value={pre_tax_deductions}
                            onChange={({ target }) =>
                              this.setState({
                                pre_tax_deductions: target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Post Tax Deductions</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Post Tax Deductions"
                            value={post_tax_deductions}
                            onChange={({ target }) =>
                              this.setState({
                                post_tax_deductions: target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>State Tax Paid</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="State Tax Paid"
                            value={state_tax_paid}
                            onChange={({ target }) =>
                              this.setState({ state_tax_paid: target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Tax Credits</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Tax Credits"
                            value={tax_credits}
                            onChange={({ target }) =>
                              this.setState({ tax_credits: target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Pre Tax Contributions</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Pre Tax Contributions"
                            value={pre_tax_contributions}
                            onChange={({ target }) =>
                              this.setState({
                                pre_tax_contributions: target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Other Taxable Income</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Other Taxable Income"
                            value={other_taxable_income}
                            onChange={({ target }) =>
                              this.setState({
                                other_taxable_income: target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate}
                  disabled={!this.is_set()}
                />

                {done ? (
                  <div className="crs_grid p-2 py-5 text-center">
                    <Table
                      style={{ width: "100%", textAlign: "center" }}
                      className="result_table"
                      bordered
                      hover
                      responsive
                    >
                      <tbody>
                        <tr>
                          <th>Tax Liability</th>
                          <td>&euro; {commalise_figures(tax_liability)}</td>
                        </tr>
                        <tr>
                          <th>Taxable Income</th>
                          <td>&euro; {commalise_figures(taxable_income)}</td>
                        </tr>
                        <tr>
                          <th>Adjusted Gross Income</th>
                          <td>
                            &euro; {commalise_figures(adjusted_gross_icome)}
                          </td>
                        </tr>
                        <tr>
                          <th>Final Tax Liability</th>
                          <td>
                            &euro; {commalise_figures(final_tax_liability)}
                          </td>
                        </tr>
                        <tr>
                          <th>Total Deductions</th>
                          <td>{total_deductions}</td>
                        </tr>
                        <tr>
                          <th>Total Exemptions</th>
                          <td>&euro; {commalise_figures(total_exemptions)}</td>
                        </tr>
                        <tr>
                          <th>Marginal Tax Rate</th>
                          <td>{marginal_tax_rate * 100} %</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Income_tax;
