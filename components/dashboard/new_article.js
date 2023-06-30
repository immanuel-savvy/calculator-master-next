import React from "react";
import Handle_image_upload from "../../components/handle_image_upload";
import Loadindicator from "../../components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import { domain, get_request, post_request } from "@/assets/js/utils/services";
import { to_title } from "@/assets/js/utils/functions";

class New_article extends Handle_image_upload {
  constructor(props) {
    super(props);

    let { article } = this.props;
    this.state = {
      sections: new Array(),
      categories: new Array(),
      ...article,
    };
  }

  componentDidMount = async () => {
    let article_categories = await get_request("article_categories");
    this.setState({ article_categories });
  };

  set_title = ({ target }) => this.setState({ title: target.value });

  type = new Array("paragraph", "blockquote");

  set_section = (text, index) => {
    let { sections } = this.state;
    sections[index].text = text;

    this.setState({ sections });
  };

  add_section = (type) => {
    let { sections } = this.state;
    sections.push({ type, text: "" });
    this.setState({ sections });
  };

  remove_section = (index) => {
    let { sections } = this.state;
    sections.splice(index, 1);

    this.setState({ sections });
  };

  handle_check = (category) => {
    let { categories } = this.state;

    if (categories.find((cat) => cat._id === category._id))
      categories = categories.filter((cat) => cat._id !== category._id);
    else categories.push(category);

    this.setState({ categories });
  };

  sumbit = async () => {
    let {
      title,
      image,
      image_hash,
      categories,
      views,
      comments,
      sections,
      _id,
      pages,
      loading,
    } = this.state;
    if (loading) return;

    this.setState({ loading: true });

    let article = {
      title,
      image,
      image_hash,
      pages,
      categories: categories.map((cat) => cat._id),
      sections,
    };

    let response;
    if (_id) {
      article._id = _id;
      article.views = views;
      article.comments = comments;
      response = await post_request("update_article", article);
    } else {
      response = await post_request("new_article", article);
      article._id = response._id;
      article.created = response.created;
      article.categories = response.categories;
    }

    this.setState({
      title: "",
      image: null,
      categories: new Array(),
      sections: new Array(),
      image_name: "",
      loading: false,
    });
  };

  render() {
    let {
      image,
      title,
      sections,
      image_name,
      loading,
      image_loading,
      _id,
      article_categories,
    } = this.state;
    let is_set = title && image && sections.find((section) => section.text);

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="new article" />
        <div class="row">
          <form className="forms_block">
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
                    {image_name || "Choose image"}
                  </label>
                </div>
              )}
              <div class="d-flex align-items-center justify-content-center">
                {image ? (
                  <img
                    className="py-3"
                    style={{
                      maxHeight: 200,
                      maxWidth: 200,
                      resize: "both",
                    }}
                    src={
                      image.startsWith("data")
                        ? this.state.image
                        : `${domain}/images/${image}`
                    }
                  />
                ) : null}
              </div>
            </div>
            <div className="form-group smalls">
              <label>Title*</label>
              <input
                type="text"
                className="form-control"
                onChange={this.set_title}
                value={title}
              />
            </div>

            {article_categories && !article_categories.length ? null : (
              <div className="form-group smalls">
                <label>Categories</label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                  }}
                >
                  {article_categories ? (
                    article_categories.map(({ title, _id }) => (
                      <div className="form-group smalls" key={_id}>
                        <input
                          id={_id}
                          className="checkbox-custom"
                          name="article_category"
                          type="checkbox"
                          checked={this.state.categories.includes(_id)}
                          onChange={() => this.handle_check(_id)}
                        />
                        <label for={_id} className="checkbox-custom-label">
                          {to_title(title)}
                        </label>
                      </div>
                    ))
                  ) : (
                    <Loadindicator />
                  )}
                </div>
              </div>
            )}

            {sections.map((section, index) =>
              section.type === this.type[0] ? (
                <div className="form-group">
                  <span>
                    <label>{`Paragraph - (${index + 1})`}</label>
                    <a
                      onClick={() => this.remove_section(index)}
                      className="btn btn-action"
                    >
                      <i className={`fas fa-window-close`}></i>
                    </a>
                  </span>
                  <textarea
                    onChange={({ target }) =>
                      this.set_section(target.value, index)
                    }
                    value={section.text}
                    className="form-control"
                  ></textarea>
                </div>
              ) : (
                <div className="form-group">
                  <span>
                    <label>Block Quote* </label>
                    <a
                      onClick={() => this.remove_section(index)}
                      className="btn btn-action"
                    >
                      <i className={`fas fa-window-close`}></i>
                    </a>
                  </span>
                  <textarea
                    onChange={({ target }) =>
                      this.set_section(target.value, index)
                    }
                    value={section.text}
                    className="form-control"
                  ></textarea>
                </div>
              )
            )}
            <div>
              {sections.find(
                (section) => !section.text && section.type === this.type[0]
              ) ? null : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    this.add_section(this.type[0]);
                  }}
                  className="btn theme-bg enroll-btn text-light mr-2"
                >
                  Add Paragraph<i className="ti-plus"></i>
                </a>
              )}
              {sections.find(
                (section) => !section.text && section.type === this.type[1]
              ) ? null : (
                <a
                  href="#"
                  onClick={() => this.add_section(this.type[1])}
                  className="btn theme-bg enroll-btn text-light ml-2"
                >
                  Add Blockquote<i className="ti-plus"></i>
                </a>
              )}
            </div>

            <div className="form-group smalls mt-5">
              {loading ? (
                <Loadindicator />
              ) : (
                <button
                  onClick={is_set && this.sumbit}
                  type="button"
                  className={`btn full-width ${
                    is_set ? "theme-bg" : "grey"
                  } short_description-white`}
                >
                  {_id ? "Update Article" : "Create Article"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default New_article;
