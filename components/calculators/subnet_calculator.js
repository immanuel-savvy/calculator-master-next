import React from "react";
import { Table } from "react-bootstrap";
import Stretch_button from "../stretch_btn";
import { commalise_figures } from "./salary_calculator";
import { get_request } from "@/assets/js/utils/services";

class Subnet_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      masks: new Array(
        "255.255.255.255",
        "255.255.255.254",
        "255.255.255.252",
        "255.255.255.248",
        "255.255.255.240",
        "255.255.255.224",
        "255.255.255.192",
        "255.255.255.128",
        "255.255.255.0",
        "255.255.254.0",
        "255.255.252.0",
        "255.255.248.0",
        "255.255.240.0",
        "255.255.224.0",
        "255.255.192.0",
        "255.255.128.0",
        "255.255.0.0",
        "255.254.0.0",
        "255.252.0.0",
        "255.248.0.0",
        "255.240.0.0",
        "255.224.0.0",
        "255.192.0.0",
        "255.128.0.0",
        "255.0.0.0",
        "254.0.0.0",
        "252.0.0.0",
        "248.0.0.0",
        "240.0.0.0",
        "224.0.0.0",
        "192.0.0.0",
        "128.0.0.0",
        "0.0.0.0"
      ),
      mask: "32",
      v6mask: Array.from(Array(129).keys()),
    };
  }

  componentDidMount = async () => {
    let your_ip = await get_request(
      "https://bckend.techmastertools.net/what_is_my_ip"
    );

    this.setState({ your_ip });
  };

  set_ip = (ip) => this.setState(ip.includes(":") ? { ipv6: ip } : { ip });

  calculate_v6 = (e) => {
    e && e.preventDefault();

    let { ipv6, v6_mask } = this.state;
    if (!ipv6) ipv6 = "fa60::8e71:0021:cb6e:e31c";
    let ip = ipv6;

    let mask = v6_mask || "64";
    mask = parseInt(mask);

    let result = new Object({
      ip,
    });
    ip = ip.split(":");

    if (ip.length < 8) {
      if (ip.includes("")) {
        let zeros = new Array(8 - ip.length);
        zeros = zeros.map((z) => "0000");
        ip.splice(ip.indexOf(""), 0, ...zeros);
        ip = ip.map((p) => p || "");
      }
    }

    ip = ip.map((p) => p.padStart(4, "0"));
    result.full_address = ip.join(":");
    let binary = ip.map((p) => {
      return parseInt(p, 16).toString(2).padStart(16, "0");
    });
    result.binary = binary.join(":");
    binary = binary.join("");

    let net = new Array();
    let network_address = binary.slice(0, mask);

    while (true) {
      if (network_address.length >= 16) {
        net.push(network_address.slice(0, 16));
        network_address = network_address.slice(16);
      } else {
        network_address.length && net.push(network_address);
        break;
      }
    }
    net = ip.slice(0, net.length);
    let net_upper_bound = new Array(...net);

    let x = net_upper_bound.slice(-1)[0];
    if (x && x.endsWith("0")) {
      let i = 0;
      while (i < x.length) {
        if (x[i] === "0") {
          x = x.slice(0, i);
          break;
        }
        i++;
      }
      x = x.padEnd(4, "f");
      net_upper_bound.pop();
      net_upper_bound.push(x);
    }
    while (net.length < 8) {
      net.push("0000");
      net_upper_bound.push("ffff");
    }

    result.network_address = net.join(":");
    result.address_range = `${result.network_address} - ${net_upper_bound.join(
      ":"
    )}`;

    let assignable_hosts = binary.slice(mask);
    assignable_hosts = assignable_hosts.split("").map((a) => "1");

    result.assignable_hosts = commalise_figures(
      parseInt(assignable_hosts.join(""), 2),
      true
    );

    result.prefix_length = mask;

    this.setState({
      result6: result,
      result_header6: Object.keys(result),
      done6: true,
    });
  };

  calculate = async (e) => {
    e && e.preventDefault();

    let { ip, your_ip, calculating, mask } = this.state;

    if (calculating) return;

    if (!ip) ip = your_ip && your_ip.ip;

    if (!ip) return;
    this.setState({ calculating: true });
    mask = mask || "32";
    if (mask.startsWith("/")) mask = mask.slice(1);

    let result = await get_request(
      `https://networkcalc.com/api/ip/${ip.trim()}/${mask}?binary=true`,
      undefined,
      true
    );

    if (result && result.address)
      result.address.assignable_hosts = commalise_figures(
        Number(result.address.assignable_hosts),
        true
      );

    result = result && result.address;
    let result_header = result && Object.keys(result);

    this.setState({ result, result_header, calculating: false, done: true });
  };

  render() {
    let {
      done,
      ip,
      masks,
      calculating,
      result,
      result_header,
      your_ip,
      ipv6,
      v6mask,
      done6,
      result6,
      result_header6,
      v6_mask,
    } = this.state;

    return (
      <div>
        {done ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">IPv4 Result</h3>
            <Table style={{ width: "100%" }} striped bordered hover responsive>
              <tbody style={{ width: "100%" }}>
                {result_header.map((header, index) => {
                  return header === "binary" ? null : (
                    <tr key={index}>
                      <th style={{ width: "45vw" }}>
                        {(header === "ip"
                          ? header.toUpperCase()
                          : header
                        ).replace(/_/g, " ")}
                      </th>
                      <td style={{ width: "55vw" }}>{result[header]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : null}

        <div className="crs_grid">
          <div className="modal-header">
            <h5 className="modal-title text-dark">IPv4</h5>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="form-group">
                  <div className="">
                    <label>IP Address</label>
                    <input
                      value={ip}
                      onChange={({ target }) =>
                        this.setState({ ip: target.value })
                      }
                      className="form-control"
                      style={{ fontSize: 16, color: "#000" }}
                      placeholder="IPv4"
                    />
                  </div>
                </div>
                <label for="">
                  Your IP Address* <span>{your_ip?.ip || "..."}</span>
                </label>
                <br />

                <div className="form-group">
                  <label>Subnet Mask</label>

                  <div className="simple-input">
                    <select
                      id="ipv4_mask"
                      onChange={({ target }) =>
                        this.setState({ mask: target.value })
                      }
                      className="form-control"
                    >
                      {masks.map((msk, index) => (
                        <option key={msk} value={32 - index}>
                          {msk} /{32 - index}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate}
                  loading={calculating}
                  disabled={!ip}
                />
              </form>
            </div>
          </div>
        </div>

        {done6 ? (
          <div className="crs_grid p-2 py-5 text-center">
            <h3 className="text-center text-dark">IPv4 Result</h3>
            <Table style={{ width: "100%" }} striped bordered hover responsive>
              <tbody style={{ width: "100%" }}>
                {result_header6.map((header, index) => {
                  return header === "binary" ? null : (
                    <tr key={index}>
                      <th style={{ width: "45vw" }}>
                        {(header === "ip"
                          ? header.toUpperCase()
                          : header
                        ).replace(/_/g, " ")}
                      </th>
                      <td style={{ width: "55vw" }}>{result6[header]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : null}

        <div className="crs_grid">
          <div className="modal-header">
            <h5 className="modal-title text-dark">IPv6</h5>
          </div>

          <div className="modal-body">
            <div className="login-form">
              <form>
                <div className="form-group">
                  <div className="">
                    <label>IPv6 Address</label>
                    <input
                      value={ipv6}
                      onChange={({ target }) =>
                        this.setState({ ipv6: target.value })
                      }
                      className="form-control"
                      style={{ fontSize: 16, color: "#000" }}
                      placeholder={"fa60::8e71:0021:cb6e:e31c"}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Prefix length</label>

                  <div className="simple-input">
                    <select
                      id="ipv4_mask"
                      onChange={({ target }) =>
                        this.setState({ v6_mask: target.value })
                      }
                      className="form-control"
                    >
                      {v6mask.map((msk) => (
                        <option key={msk} value={msk.toString()}>
                          /{msk}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Stretch_button
                  title="Calculate"
                  style={{ backgroundColor: "yellow" }}
                  action={this.calculate_v6}
                  disabled={!ipv6}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Subnet_calculator;
