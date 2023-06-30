"use client";

import React from "react";
import Explore_more from "./explore_more";
import Featured_calculator from "./featured_calculator";
import Loadindicator from "./loadindicator";
import Small_btn from "./small_btn";
import { copy_object, search_object } from "@/assets/js/utils/functions";

class Top_calculators extends React.Component {
  constructor(props) {
    super(props);

    let { calculators } = this.props;
    this._original_calculators = copy_object(calculators);
    this.state = { slice: this._slice, calculators };
  }

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

  show_all = () =>
    this.setState({ slice: this.state.slice ? undefined : this._slice });

  render() {
    let { categories } = this.props;
    let { search_param, slice, calculators } = this.state;

    if (calculators && !calculators.length && !search_param) return;

    return (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  top <span className="theme-cl">Calculators</span>
                </h2>
                <p>Unlock Your Potential with Our Top Calculators!</p>
              </div>
            </div>
          </div>

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

          {calculators ? (
            <>
              <div className="row justify-content-center">
                {calculators.slice(0, slice).map((calc) => (
                  <Featured_calculator
                    calculator={calc}
                    navs={categories}
                    key={calc._id}
                  />
                ))}
              </div>
              <Explore_more
                title={slice ? "Show more" : "Show less"}
                to="calculators"
                action={this.show_all}
              />
            </>
          ) : (
            <Loadindicator />
          )}
        </div>
      </section>
    );
  }
}

export default Top_calculators;
