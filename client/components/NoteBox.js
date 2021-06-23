import React from "react";
import { connect } from "react-redux";

class Note extends React.Component {
  constructor() {
    super();
    this.state = {
      noteContent: "",
      linesAnnotated: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {}

  render() {
    const { auth, selectedText } = this.props;

    return (
      <div className="comment-box">
        <form className="new-form">
          <div className="u-margin-bottom-medium" />
          {selectedText ? <span>{selectedText}</span> : null}
          <div className="form__group">
            <input
              name="annotation"
              type="text"
              className="new-form__input"
              placeholder="Write Annotation Here"
              id="annotation"
              onChange={this.handleChange}
            />
            <label htmlFor="annotation" className="new-form__label">
              Annotation
            </label>
          </div>
          <div className="form__group">
            <button type="submit" className="btn btn--green">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    auth: state.auth
  };
};

const mapDispatch = dispatch => {
  return {
    postNote: poemId => dispatch(postNote(poemId))
  };
};

export default connect(mapState, mapDispatch)(Note);
