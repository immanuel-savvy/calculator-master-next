import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import { to_title } from "@/assets/js/utils/functions";
import { dow_index, month_index } from "@/assets/js/utils/constants";

class Pregnancy_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calculator: this.calculations[0],
    };
  }

  milestones = [
    { week: 4, milestone: "Embryo is implanted in the uterus", flag: "" },
    { week: 8, milestone: "Fetus has a regular heartbeat", flag: "" },
    {
      week: 12,
      milestone: "Fetus has all body parts and can swallow and urinate",
      flag: "",
    },
    { week: 16, milestone: "Sex of fetus can be determined", flag: "" },
    { week: 20, milestone: "Fetus can hear and has hair on head", flag: "" },
    {
      week: 24,
      milestone: "Fetus can survive outside the womb with medical assistance",
      flag: "",
    },
    {
      week: 28,
      milestone: "Fetus has a good chance of survival if born prematurely",
      flag: "",
    },
    {
      week: 32,
      milestone: "Fetus is fully developed and can open and close eyes",
      flag: "",
    },
    {
      week: 36,
      milestone: "Fetus is gaining weight and losing lanugo hair",
      flag: "",
    },
    {
      week: 40,
      milestone: "Due date - Fetus is fully mature and ready to be born",
      flag: "",
    },
  ];

  milestone_calculations = (weeks) => {
    let milestones = new Array(...this.milestones);

    // Set flag for current milestone
    let current_milestone = "";
    for (let i = 0; i < milestones.length; i++) {
      if (weeks < milestones[i].week) {
        milestones[i].flag = "*";
        break;
      } else if (i === milestones.length - 1) {
        milestones[i].flag = "*";
        current_milestone = milestones[i].milestone;
      }
    }

    // Create chart of pregnancy milestones
    let chart = milestones.reduce((acc, { week, milestone, flag }) => {
      acc += `Week ${week}: ${milestone}${flag}\n`;
      return acc;
    }, "");

    return { current_milestone, chart };
  };

  calculate_from_due_date = () => {
    let { due_date } = this.state;

    due_date = new Date(due_date);

    // Calculate last period date
    let last_period = new Date(due_date.getTime() - this.gestation_period);

    // Calculate pregnancy period
    let now = new Date();
    let weeks = Math.floor((now - last_period) / this.a_week);
    let days =
      Math.floor((now - last_period) / (24 * 60 * 60 * 1000)) - weeks * 7;

    // Calculate pregnancy milestones
    let current_milestone;
    let chart = this.milestones.reduce((acc, { week, milestone }) => {
      let milestone_week = Math.floor((due_date - last_period) / this.a_week);
      if (milestone_week >= week) {
        if (!current_milestone) current_milestone = milestone_week;
        acc += `Week ${week}: ${milestone}\n`;
      }
      return acc;
    }, "");

    this.setState({
      period: { weeks, days },
      milestones: chart,
      current_milestone,
      last_period_date: last_period,
      done: true,
    });
  };

  gestation_period = 280 * 24 * 60 * 60 * 1000;

  calculate_from_conception_date = () => {
    let { conception_date } = this.state;

    conception_date = new Date(conception_date);

    let last_period = new Date(
      conception_date.getTime() - 266 * 24 * 60 * 60 * 1000
    );

    let due_date = new Date(conception_date.getTime() + this.gestation_period);

    // Calculate pregnancy period
    let now = new Date();
    let weeks = Math.floor((now - conception_date) / this.a_week);
    let days =
      Math.floor((now - conception_date) / (24 * 60 * 60 * 1000)) - weeks * 7;

    let chart = this.milestones.reduce((acc, { week, milestone }) => {
      let milestone_weeks = Math.floor((now - conception_date) / this.a_week);
      if (milestone_weeks >= week) {
        acc += `Week ${week}: ${milestone}\n`;
      }
      return acc;
    }, "");

    this.setState({
      period: { weeks, days },
      // current_milestone,
      milestones: chart,
      due_date,
      done: true,
    });
  };

  a_week = 7 * 24 * 60 * 60 * 1000;

  calculate_from_last_period = () => {
    let { last_period } = this.state;

    last_period = new Date(last_period);

    // Calculate due date
    let due_date = new Date(last_period.getTime() + this.gestation_period);

    // Calculate pregnancy period
    let now = new Date();
    let weeks = Math.floor((now - last_period) / this.a_week);
    let days =
      Math.floor((now - last_period) / (24 * 60 * 60 * 1000)) - weeks * 7;

    // Calculate pregnancy milestones
    let { chart, current_milestone } = this.milestone_calculations(weeks);

    // Return pregnancy period, current milestone, and chart of milestones
    this.setState({
      period: { weeks, days },
      current_milestone,
      milestones: chart,
      due_date,
      done: true,
    });
  };

  calculations = new Array("due_date", "conception_date", "last_period");

  render() {
    let { calculator, period, done, last_period_date, due_date } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Pregnancy Calculator</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="form-group">
                    <label>Calculate By</label>

                    <div className="simple-input">
                      <select
                        id="bank"
                        onChange={({ target }) =>
                          this.setState({ calculator: target.value })
                        }
                        className="form-control"
                      >
                        {this.calculations.map((calculator) => (
                          <option key={calculator} value={calculator}>
                            {to_title(calculator.replace(/_/g, " "))}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="">
                      <label>{to_title(calculator.replace(/_/g, " "))}</label>
                      <input
                        type="date"
                        value={this.state[calculator]}
                        onChange={({ target }) =>
                          this.setState({
                            [calculator]: target.value,
                            last_period_date: null,
                            done: false,
                          })
                        }
                        className="form-control"
                        style={{ fontSize: 16, color: "#000" }}
                        placeholder={to_title(calculator.replace(/_/g, " "))}
                      />
                    </div>
                  </div>

                  <Stretch_button
                    title="Calculate"
                    style={{ backgroundColor: "yellow" }}
                    action={this[`calculate_from_${calculator}`]}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            {last_period_date ? (
              <>
                <h3 className="text-center text-dark">Last Period</h3>
                <h2 className="text-center mb-2">
                  {`${
                    dow_index[new Date(last_period_date).getDay() + 1]
                  }, ${new Date(last_period_date).getDate()} ${
                    month_index[new Date(last_period_date).getMonth()]
                  } ${new Date(last_period_date).getFullYear()}`}
                </h2>
              </>
            ) : null}

            <h3 className="text-center mt-2 text-dark">Pregnancy Period</h3>
            <h2 className="text-center mb-2">
              {`${Math.abs(period.weeks)} weeks and ${Math.abs(
                period.days
              )} days`}
            </h2>

            <h3 className="text-center mt-2 text-dark">Due Date</h3>
            <h2 className="text-center mb-2">
              {`${dow_index[new Date(due_date).getDay() + 1]}, ${new Date(
                due_date
              ).getDate()} ${
                month_index[new Date(due_date).getMonth()]
              } ${new Date(due_date).getFullYear()}`}
            </h2>

            <Table
              style={{ width: "100%", textAlign: "center" }}
              className="result_table"
              bordered
              hover
              responsive
            >
              <tbody>
                {this.milestones.map(({ week, milestone }) => (
                  <tr key={week}>
                    <th>Week {week}</th>
                    <td>{milestone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Pregnancy_calculator;
