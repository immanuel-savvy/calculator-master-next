"use client";

import React from "react";
import Footer from "../../components/footer";
import Custom_Nav from "../../components/nav";
import Stretch_button from "../stretch_btn";
import bg from "../../assets/img/loginbg4.jpg";
import { to_title } from "@/assets/js/utils/functions";
import { post_request } from "@/assets/js/utils/services";

class Admin_login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  set_email = ({ target }) =>
    this.setState({ email: target.value, message: "" });

  set_password = ({ target }) =>
    this.setState({ password: target.value, message: "" });

  login = async () => {
    let { email, password } = this.state;
    this.setState({ loading: true });

    let response = await post_request("admin_login", { email, password });

    response && response.admin
      ? this.props.login(response.admin)
      : this.setState({
          password: "",
          message: response.message,
          loading: false,
        });
  };

  render() {
    let { navs } = this.props;
    let { email, password, message, loading } = this.state;

    return (
      <div id="main-wrapper">
        <Custom_Nav navs={navs} page="signup" />
        <div className="clearfix"></div>
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                <form>
                  <div className="crs_log_wrap">
                    <div className="crs_log__thumb">
                      <img src={bg.src} className="img-fluid" alt="" />
                    </div>
                    <div className="crs_log__caption">
                      <div className="rcs_log_123">
                        <div className="rcs_ico">
                          <i className="fas fa-lock"></i>
                        </div>
                      </div>

                      <div className="rcs_log_124">
                        <div className="Lpo09">
                          <h4>Login to Your Admin Account</h4>
                        </div>
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={this.set_email}
                            placeholder="you@mail.com"
                          />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={this.set_password}
                            placeholder="*******"
                          />
                        </div>
                        <div className="form-group">
                          <Stretch_button
                            action={this.login}
                            loading={loading}
                            title="Login"
                          />
                        </div>
                      </div>
                      {message ? (
                        <p className="text-danger">{to_title(message)}</p>
                      ) : null}
                    </div>

                    {/* <div className="crs_log__footer d-flex justify-content-between">
                      <div className="fhg_45">
                        <p className="musrt">
                          <Link href="/forgot_password" className="text-danger">
                            Forgot Password?
                          </Link>
                        </p>
                      </div>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer navs={navs} />
      </div>
    );
  }
}

export default Admin_login;
