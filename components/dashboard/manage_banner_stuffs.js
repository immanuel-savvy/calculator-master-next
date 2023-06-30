import React from "react";
import Handle_image_upload from "../handle_image_upload";
import Loadindicator from "../loadindicator";
import Preview_image from "../preview_image";
import { get_request, post_request } from "@/assets/js/utils/services";
// import Video from "../../Components/video";

class Banner_stuffs extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = { banner_stuffs: "fetching", show_vid: true };
  }

  componentDidMount = async () => {
    let banner_stuffs = await get_request("banner_stuffs");

    this.setState({ banner_stuffs, ...banner_stuffs });
  };

  submit = async () => {
    let {
      video,
      image,
      thumbnail,
      thumbnail_hash,
      thumbnail_image,
      thumbnail_image_hash,
    } = this.state;
    this.setState({ uploading: true });
    if (thumbnail_image) thumbnail = thumbnail_image;
    if (thumbnail_image_hash) thumbnail_hash = thumbnail_image_hash;

    let banner_stuffs = {
      video,
      image,
      thumbnail,
      thumbnail_hash,
    };

    if (video && video.startsWith("data")) {
      let response = await post_request("update_banner_video", {
        thumbnail,
        thumbnail_hash,
        video,
      });
      banner_stuffs.video = response.video;
      banner_stuffs.thumbnail = response.thumbnail;
    }

    if (image && image.startsWith("data")) {
      let response = await post_request("update_banner_image", { image });
      banner_stuffs.image = response.image;
    }

    this.setState({ uploading: false, banner_stuffs });
  };

  render() {
    let {
      banner_stuffs,
      thumbnail,
      uploading,
      video,
      image,
      thumbnail_image,
      image_loading,
      show_vid,
      image_hash,
    } = this.state;

    return (
      <div>
        {banner_stuffs !== "fetching" ? (
          <div className="row ">
            <div className="justify-content-center">
              {image ? (
                <Preview_image
                  style={{ marginBottom: 20 }}
                  image_hash={image_hash}
                  image={image}
                />
              ) : null}

              {(video || thumbnail || thumbnail_image) && show_vid ? (
                <></> /*  <Video
                  url={
                    video.startsWith("data")
                      ? video
                      : `${domain}/Videos/${video}`
                  }
                  thumbnail={thumbnail_image || thumbnail}
                  thumbnail_hash={thumbnail_image_hash || thumbnail_hash}
                /> */
              ) : null}
            </div>
            <form>
              <div class="row mt-3">
                <div className="form-group smalls">
                  <label>Banner Image (1920 x 1200)</label>
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
                </div>
                <hr />
                {/* <div className="form-group smalls">
                  <label>Video</label>
                  {video_loading ? (
                    <Loadindicator />
                  ) : (
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept="video/*"
                        onChange={this.handle_video}
                        control
                      />
                      <label className="custom-file-label" for="customFile">
                        Choose file
                      </label>
                    </div>
                  )}
                </div>
                <div className="form-group smalls">
                  <label>Video Thumbnail</label>
                  {thumbnail_image_loading ? (
                    <Loadindicator />
                  ) : (
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={(e) => this.handle_image(e, "thumbnail")}
                      />
                      <label className="custom-file-label" for="customFile">
                        Choose file
                      </label>
                    </div>
                  )}
                </div> */}

                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    {uploading ? (
                      <Loadindicator />
                    ) : (
                      <a
                        href="#"
                        style={{ color: "#000" }}
                        onClick={
                          (video || image || thumbnail_image) && this.submit
                        }
                        class="btn theme-bg btn-md"
                      >
                        {banner_stuffs ? "Update" : "Upload"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <Loadindicator contained />
        )}
      </div>
    );
  }
}

export default Banner_stuffs;
