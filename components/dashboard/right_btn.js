import React from "react";
import { to_title } from "@/assets/js/utils/functions";

class Right_btn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, action } = this.props;

    return (
      <div>
        <div class="elkios" onClick={action}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>
            {to_title(title)}
          </a>
        </div>
      </div>
    );
  }
}

export default Right_btn;
