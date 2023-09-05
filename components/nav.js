"use client";

import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Padder from "../components/padder";
import Link from "next/link";
import { to_title, trim_id } from "@/assets/js/utils/functions";

class Custom_nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    let { navs } = this.props;
    navs &&
      navs.sort &&
      navs?.sort((c1, c2) => {
        let a_title = c1?.title?.toLowerCase(),
          b_title = c2?.title?.toLowerCase();

        if (a_title === "other" && b_title !== "other") return 1;
        else if (a_title !== "other" && b_title === "other") return -1;
        else return 0;
      });

    return (
      <div>
        <div
          className="header"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            position: "fixed",
            width: "100vw",
          }}
        >
          <div className="container">
            <div id="navigation" className="navigation navigation-landscape">
              <Navbar light expand="lg">
                <NavbarBrand href="/" className="nav-brand">
                  <h2 className="text-dark">Calculator Master</h2>
                </NavbarBrand>
                <NavbarToggler
                  ref={(nav_toggle) => (this.nav_toggle = nav_toggle)}
                  style={{
                    color: "#000",
                    // backgroundColor: "pink",
                  }}
                  onClick={this.toggle}
                />

                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav
                    className="ml-auto"
                    navbar
                    style={{ alignItems: "center" }}
                  >
                    {navs && navs.length
                      ? navs.map((nav, index) => {
                          return (
                            <NavItem key={index}>
                              <NavLink
                                style={{
                                  backgroundColor: "transparent",
                                }}
                              >
                                <Link
                                  style={{ textDecorationColor: "none" }}
                                  href={`/calculators/${nav.title.replace(
                                    / /g,
                                    "_"
                                  )}?_id=${trim_id(nav._id)}`}
                                >
                                  <span style={{ color: "#000" }}>
                                    {to_title(nav.title.replace(/_/g, " "))}
                                  </span>
                                </Link>
                              </NavLink>
                            </NavItem>
                          );
                        })
                      : null}

                    <NavItem>
                      <NavLink
                        style={{
                          backgroundColor: "transparent",
                        }}
                      >
                        <Link
                          style={{
                            textDecorationColor: "none",
                            borderLeftColor: "#ccc",
                            borderLeftWidth: 1,
                            borderLeftStyle: "solid",
                            paddingLeft: 10,
                          }}
                          href="/blog"
                        >
                          <span style={{ color: "#000" }}>Blog</span>
                        </Link>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>
        </div>

        <Padder />
      </div>
    );
  }
}

export default Custom_nav;
