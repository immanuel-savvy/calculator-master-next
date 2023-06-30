import React from "react";
import Modal from "../modal";
import Add_calculator from "./add_calculator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Right_btn from "./right_btn";
import Featured_calculator from "../featured_calculator";
import Loadindicator from "../loadindicator";
import List_empty from "../listempty";
import Small_btn from "../small_btn";
import { post_request } from "@/assets/js/utils/services";
import { copy_object, search_object } from "@/assets/js/utils/functions";

class Manage_calculators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let calculators = await post_request("calculators");

    this._original_calculators = copy_object(calculators);

    this.setState({ calculators });
  };

  on_add = (calculator) => {
    let { calculators, calculator_in_edit } = this.state;

    if (calculator_in_edit)
      calculators = calculators.map((cal) => {
        if (cal._id === calculator_in_edit._id) return calculator;
        return cal;
      });
    else calculators = new Array(calculator, ...calculators);
    this.setState({ calculators, calculator_in_edit: null });
  };

  toggle_add_calculator = () => this.add_calculator?.toggle();

  edit = (calculator) =>
    this.setState(
      { calculator_in_edit: calculator },
      this.toggle_add_calculator
    );

  filter_calculators = () => {
    let { calculators, search_param } = this.state;

    if (search_param)
      calculators = this._original_calculators.filter((c) =>
        search_object(c, search_param)
      );
    else calculators = this._original_calculators;

    this.setState({ calculators });
  };

  remove = async (calculator) => {
    if (!window.confirm("Are you sure to remove calculator?")) return;

    let { calculators } = this.state;
    calculators = calculators.filter((cal) => cal._id !== calculator);

    this.setState({ calculators });

    await post_request(`remove_calculator/${calculator}`);
  };

  render() {
    let { navs } = this.props;
    let { calculators, calculator_in_edit, search_param, show } = this.state;

    return (
      <div class="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb={`manage calculators ${
            calculators && calculators.length ? `- ${calculators.length}` : ""
          }`}
          right_btn={
            <Right_btn
              title="add calculator"
              action={this.toggle_add_calculator}
            />
          }
        />

        <div className="row justify-content-center mb-4">
          <div className="form-group col-lg-6 col-md-6 col-xl-4 col-sm-12">
            <div className="input-with-icon mb-2">
              <i className="ti-search"></i>
              <input
                type="text"
                className="form-control"
                value={search_param}
                style={{ backgroundColor: "#eee" }}
                placeholder="Search Calculators"
                onChange={({ target }) =>
                  this.setState(
                    { search_param: target.value },
                    this.filter_calculators
                  )
                }
              />
            </div>

            {search_param ? (
              <div style={{ textAlign: "center" }}>
                <Small_btn
                  title="Show all"
                  action={() =>
                    this.setState({
                      search_param: "",
                      calculators: this._original_calculators,
                    })
                  }
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="row">
          {calculators ? (
            calculators.length ? (
              calculators.map((calculator) => (
                <Featured_calculator
                  calculator={calculator}
                  edit={(e) => {
                    e.preventDefault();
                    this.edit(calculator);
                  }}
                  // remove={(e) => {
                  //   e.preventDefault();
                  //   this.remove(calculator._id);
                  // }}
                  key={calculator._id}
                />
              ))
            ) : (
              <List_empty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(add_calculator) => (this.add_calculator = add_calculator)}>
          <Add_calculator
            navs={navs}
            toggle={this.toggle_add_calculator}
            on_add={this.on_add}
            calculator={calculator_in_edit}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_calculators;
