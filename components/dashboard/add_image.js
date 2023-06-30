import React from "react";
import Handle_image_upload from "../handle_image_upload";
import Loadindicator from "../loadindicator";
import Stretch_button from "../stretch_btn";
import { domain, post_request } from "@/assets/js/utils/services";

class Add_image extends Handle_image_upload {
  constructor(props) {
    super(props);

    let { image } = this.props;
    this.state = { ...image };
  }

  add = async () => {
    let { on_add, toggle } = this.props;
    let { image, loading, image_hash, image_name, _id } = this.state;

    if (loading) return;

    this.setState({ loading: true });

    image_name = image_name && image_name.replace(/[ \.]/g, "_");

    let img = { image, image_hash, image_name, _id };

    let res = await post_request(_id ? "update_image" : "add_image", img);

    if (res?._id) {
      img.image = res.image;
      img._id = res._id;
      img.created = res.created;

      on_add && on_add(img);
      toggle();
    } else
      this.setState({
        loading: false,
        message: "Cannot upload image at the moment",
      });
  };

  render() {
    let { toggle } = this.props;
    let { image, image_loading, _id, loading, image_name } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Add Image</h5>
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
                <div className="form-group smalls">
                  <label>Image (1200 x 800)*</label>
                  {image_loading ? (
                    <Loadindicator />
                  ) : (
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={this.handle_image}
                      />
                      <label className="custom-file-label" for="customFile">
                        Choose file
                      </label>
                    </div>
                  )}
                  {image ? (
                    <div style={{ alignItems: "center" }}>
                      <span>
                        <img
                          className="py-3 rounded"
                          style={{
                            width: "100%",
                          }}
                          src={
                            image && image.startsWith("data")
                              ? image
                              : `${domain}/images/${image}`
                          }
                        />
                      </span>
                    </div>
                  ) : null}
                </div>

                <div class="form-group">
                  <label>Image Name (Optional)</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={image_name}
                      onChange={({ target }) =>
                        this.setState({
                          image_name: target.value,
                          message: "",
                        })
                      }
                      placeholder="Image Name"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                <Stretch_button
                  title={_id ? "Update" : "Add"}
                  action={this.add}
                  disabled={!image}
                  loading={loading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_image;
