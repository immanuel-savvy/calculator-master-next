"use client";

import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Listempty from "../listempty";
import Loadindicator from "../loadindicator";
import Modal from "../modal";
import Preview_image from "../preview_image";
import Small_btn from "../small_btn";
import Text_btn from "../text_btn";
import Add_image from "./add_image";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Right_btn from "./right_btn";
import { copy_object } from "@/assets/js/utils/functions";
import { post_request, domain, get_request } from "@/assets/js/utils/services";

class Manage_images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let images = await get_request("images");

    this._images = copy_object(images);

    this.setState({ images });
  };

  on_add = (image) => {
    let { images, image_in_edit } = this.state;

    if (image_in_edit) {
      images = images.map((img) => (img._id === image._id ? image : img));
    } else images = new Array(image, ...images);

    this.setState({ images, image_in_edit: null });
  };

  edit = (image) =>
    this.setState({ image_in_edit: image }, this.toggle_add_image);

  remove = async (img) => {
    if (!window.confirm("Are you sure to remove image?")) return;

    let { images } = this.state;
    images = images.filter((i) => i._id !== img);

    this.setState({ images });

    await post_request(`remove_image/${img}`);
  };

  toggle_add_image = () => this.add_image?.toggle();

  copy_alert = (image) => {
    clearTimeout(this.clear_copy);
    this.setState({ copied: image });

    this.clear_copy = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  render() {
    let { search_param, images, copied, image_in_edit } = this.state;

    return (
      <div class="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb={`manage images ${
            images && images.length ? `- ${images.length}` : ""
          }`}
          right_btn={
            <Right_btn title="add image" action={this.toggle_add_image} />
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
                placeholder="Search Images"
                onChange={({ target }) =>
                  this.setState(
                    { search_param: target.value },
                    this.filter_images
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
                      images: this._images,
                    })
                  }
                />
              </div>
            ) : null}
          </div>

          {images ? (
            images.length ? (
              <div className="row">
                {images.map((img) => (
                  <Preview_image
                    key={img.image}
                    image={img.image}
                    class_name={"rounded img-fluid"}
                    parent_class="col-md-3 col-lg-3 col-xl-3 col-sm-6"
                    image_hash={img.image_hash}
                    childs={
                      <span>
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text_btn
                            text="Edit"
                            icon="fa-edit"
                            action={() => this.edit(img)}
                          />
                          <CopyToClipboard
                            text={`${domain}/images/${img.image}`}
                            onCopy={() => this.copy_alert(img.image)}
                          >
                            <span>
                              {copied === img.image ? (
                                <Text_btn text="Copied" icon="fa-copy" />
                              ) : (
                                <Text_btn text="Copy URL" icon="fa-link" />
                              )}
                            </span>
                          </CopyToClipboard>

                          <Text_btn
                            text="Remove"
                            icon="fa-close"
                            action={() => this.remove(img._id)}
                          />
                        </span>
                      </span>
                    }
                  />
                ))}
              </div>
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal
          no_drop_on_backdrop
          ref={(add_image) => (this.add_image = add_image)}
        >
          <Add_image
            toggle={this.toggle_add_image}
            on_add={this.on_add}
            image={image_in_edit}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_images;
