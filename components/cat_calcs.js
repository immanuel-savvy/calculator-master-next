"use client";

import React from "react";
import Small_btn from "./small_btn";
import Featured_calculator from "./featured_calculator";
import Loadindicator from "./loadindicator";
import Listempty from "./listempty";
import { post_request } from "@/assets/js/utils/services";
import { copy_object, search_object } from "@/assets/js/utils/functions";

class Cat_calcs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate = async () => {
    let { category } = this.props;

    category?._id !== this.category?._id && (await this.fetch_calcs());
  };

  fetch_calcs = async () => {
    let { category } = this.props;

    let calculators = await post_request("get_calculators", {
      calculators: category?.calculators,
    });
    this._original_calculators = copy_object(calculators);

    this.category = copy_object(category);
    this.setState({ calculators });
  };

  componentDidMount = async () => {
    await this.fetch_calcs();
  };

  filter_calculators = () => {
    let { calculators, search_param } = this.state;

    if (search_param)
      calculators = this._original_calculators.filter((c) =>
        search_object(c, search_param)
      );
    else calculators = this._original_calculators;

    this.setState({ calculators });
  };

  _slice = 12;

  render() {
    let { categories } = this.props;
    let { calculators, search_param } = this.state;

    return (
      <>
        <div className="row justify-content-center mb-4">
          <div className="form-group col-lg-6 col-md-6 col-xl-4 col-sm-12">
            <div className="input-with-icon mb-2">
              <i className="ti-search"></i>
              <input
                type="text"
                className="form-control"
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

        <div className="row justify-content-center">
          {calculators ? (
            calculators.length ? (
              calculators.map((calc) => (
                <Featured_calculator
                  navs={categories}
                  calculator={calc}
                  key={calc._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </>
    );
  }
}

export default Cat_calcs;
