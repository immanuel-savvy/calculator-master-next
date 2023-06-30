import React from "react";
import { default_admin } from "./dashboard_nav_menu";
import { to_title } from "@/assets/js/utils/functions";
import { domain } from "@/assets/js/utils/constants";

class Admin_card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { admin } = this.props;

    let { firstname, lastname, image: _image, _id } = admin || {};
    return (
      <div class="d-user-avater">
        <img
          src={`${domain}/Images/${_image || "logo_single.png"}`}
          class="img-fluid avater"
          alt=""
        />
        <h4>{to_title(`${firstname} ${lastname}`.trim())}</h4>
        <span>{_id === default_admin ? "Default Admin" : "Admin"}</span>
        <div class="elso_syu89">
          <ul>
            <li>
              <a href="#">
                <i class="ti-pencil"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Admin_card;
