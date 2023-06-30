"use client";

import React from "react";
import Alert_box from "../alert_box";
import Listempty from "../listempty";
import Loadindicator from "../loadindicator";
import Stretch_button from "../stretch_btn";
import Text_btn from "../text_btn";
import { post_request } from "@/assets/js/utils/services";
import { to_title } from "@/assets/js/utils/functions";

class Add_calculator extends React.Component {
  constructor(props) {
    super(props);

    let { calculator } = this.props;
    this.state = {
      title: "",
      description: "",
      ...calculator,
      show_id: !!!calculator,
    };
  }

  set_category = ({ target }) => this.setState({ category: target.value });

  add = async () => {
    let { toggle, on_add } = this.props;
    let { title, category, description, id, _id } = this.state;

    this.setState({ loading: true });

    let calc = { title: title.trim(), id, category, _id, description };

    let result = await post_request(
      _id ? "update_calculator" : "create_calculator",
      calc
    );

    if (result && result._id) {
      calc._id = result._id;
      calc.created = result.created;

      on_add && on_add(calc);
      toggle();
    } else {
      this.setState({
        message:
          (result && result.message) ||
          "Cannot create calculator at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle, navs } = this.props;
    let { title, show_id, loading, category, description, id, _id, message } =
      this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Add Calculator</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form">
              <form>
                {_id ? null : (
                  <div style={{ textAlign: "right" }}>
                    <Text_btn
                      text="Toggle ID"
                      style={{ textAlign: "right" }}
                      action={() =>
                        this.setState({ show_id: !this.state.show_id })
                      }
                    />
                  </div>
                )}
                {show_id ? (
                  <div class="form-group">
                    <label>ID</label>
                    <div class="input-with-icon">
                      <input
                        type="text"
                        class="form-control"
                        value={id}
                        disabled={!!_id}
                        onChange={({ target }) =>
                          this.setState({
                            id: target.value,
                            message: "",
                          })
                        }
                        placeholder="id"
                      />
                      <i class="ti-copy"></i>
                    </div>
                  </div>
                ) : null}

                <div class="form-group">
                  <label>Title</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={title}
                      onChange={({ target }) =>
                        this.setState({
                          title: target.value,
                          message: "",
                        })
                      }
                      placeholder="Title"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  {navs ? (
                    navs.length ? (
                      <div className="simple-input">
                        <select
                          defaultValue={category}
                          id="category"
                          onChange={this.set_category}
                          className="form-control"
                        >
                          <option value="" disabled selected>
                            -- Select Category --
                          </option>
                          {navs.map((category) => (
                            <option key={category._id} value={category._id}>
                              {to_title(category.title.replace(/_/g, " "))}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <Listempty text="Cannot get categories." />
                    )
                  ) : (
                    <Loadindicator smalls />
                  )}
                </div>

                <div class="form-group">
                  <label>Description</label>
                  <div class="">
                    <textarea
                      type={"text"}
                      class="form-control"
                      placeholder="Brief description here..."
                      value={description}
                      style={{ minHeight: 200 }}
                      onChange={({ target }) =>
                        this.setState({
                          description: target.value,
                          message: "",
                        })
                      }
                    ></textarea>
                  </div>
                </div>

                {message ? <Alert_box message={message} /> : null}

                <div class="form-group">
                  <Stretch_button
                    disabled={
                      !title.trim() || (!id && !_id) || !description.trim()
                    }
                    loading={loading}
                    title={_id ? "Update" : "Add"}
                    action={this.add}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_calculator;
