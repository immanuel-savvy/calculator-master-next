import React from "react";
import Checkbox from "../checkbox";
import Stretch_button from "../stretch_btn";
import Text_btn from "../text_btn";
import {
  to_title,
  gen_random_int,
  gen_randon_value,
} from "@/assets/js/utils/functions";

const sorts = new Array("ascending", "descending", "no");
const types = new Array("int", "decimal");

class Random_number_generator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upper_bound: 100,
      lower_bound: 1,
      number_of_values: 1,
      decimal_place: 4,
      type: types[0],
      allow_duplicate: false,
      sort: sorts[0],
    };
  }

  calculate = () => {
    let {
      upper_bound,
      lower_bound,
      number_of_values,
      type,
      allow_duplicate,
      decimal_place,
      sort,
    } = this.state;

    upper_bound = Number(upper_bound);
    lower_bound = Number(lower_bound);
    number_of_values = Number(number_of_values) || 1;

    if (number_of_values < 1) number_of_values = 1;

    let value = new Array();

    let fn = type === types[0] ? gen_random_int : gen_randon_value;

    for (let i = 0; i < number_of_values; i++) {
      let val = fn(upper_bound, lower_bound, decimal_place);

      if (!allow_duplicate)
        if (
          Math.abs(upper_bound - lower_bound) > number_of_values &&
          type !== types[1]
        )
          while (value.includes(val))
            val = fn(upper_bound, lower_bound, decimal_place);

      value.push(val);
    }

    if (value.length > 1) {
      if (sort === sorts[0]) value = value.sort((a, b) => a - b);
      else if (sort === sorts[1]) value = value.sort((a, b) => b - a);
    }

    this.setState({
      value,
      done: true,
    });
  };

  toggle_advance = () => this.setState({ advance: !this.state.advance });

  render() {
    let {
      upper_bound,
      lower_bound,
      advance,
      number_of_values,
      allow_duplicate,
      decimal_place,
      sort,
      type,
      value,
      done,
    } = this.state;

    return (
      <div>
        <div className="crs_grid">
          <div className="modal-header">
            <h3 className="modal-title text-dark">Random Number</h3>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Upper Bound</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Upper Bound"
                        value={upper_bound}
                        onChange={({ target }) =>
                          this.setState({ upper_bound: target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Lower Bound</label>
                      <input
                        className="form-control"
                        type="number"
                        min="0"
                        placeholder="Lower Bound"
                        value={lower_bound}
                        onChange={({ target }) =>
                          this.setState({ lower_bound: target.value })
                        }
                      />
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
                      text="More Options"
                    />
                  </div>

                  {advance ? (
                    <>
                      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          {types.map((type_) => (
                            <Checkbox
                              type="radio"
                              title={to_title(type_.replace(/_/g, " "))}
                              key={type_}
                              _id={type_}
                              checked={type_ === type}
                              action={(type) => this.setState({ type })}
                              name="type"
                            />
                          ))}
                        </div>
                      </div>

                      {type === types[1] ? (
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Decimal Place</label>
                            <input
                              className="form-control"
                              type="number"
                              min="0"
                              placeholder="Decimal Place"
                              value={decimal_place}
                              onChange={({ target }) =>
                                this.setState({ decimal_place: target.value })
                              }
                            />
                          </div>
                        </div>
                      ) : null}

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Number of Values</label>
                          <input
                            className="form-control"
                            type="number"
                            min="1"
                            placeholder="Number of Values"
                            value={number_of_values}
                            onChange={({ target }) =>
                              this.setState({ number_of_values: target.value })
                            }
                          />
                        </div>
                      </div>

                      {Number(number_of_values) > 1 ? (
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <div
                              onClick={() =>
                                this.setState({
                                  allow_duplicate: !allow_duplicate,
                                })
                              }
                              className="form-group smalls"
                            >
                              <input
                                id={"dups"}
                                className="checkbox-custom"
                                name={"dups"}
                                disabled
                                type={"checkbox"}
                                checked={allow_duplicate}
                              />
                              <label
                                for={"dups"}
                                className="checkbox-custom-label"
                              >
                                Allow Duplicates
                              </label>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {number_of_values > 1 ? (
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Sort by</label>
                            {sorts.map((sort_) => (
                              <Checkbox
                                type="radio"
                                title={to_title(sort_.replace(/_/g, " "))}
                                key={sort_}
                                _id={sort_}
                                checked={sort_ === sort}
                                action={(sort) => this.setState({ sort })}
                                name="sort"
                              />
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate}
                />
              </form>
            </div>
          </div>
        </div>

        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">Value</h3>
            <h2 className="text-center mb-2">
              {value.length > 1
                ? value.map((v, i) => (
                    <span>
                      {v}
                      {i + 1 === value.length ? "" : ", "}
                    </span>
                  ))
                : value[0]}
            </h2>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Random_number_generator;
