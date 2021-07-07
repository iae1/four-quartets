import React, {Component} from "react";
import Popup from "reactjs-popup";
import axios from "axios"
import {connect} from "react-redux"
import { Redirect } from "react-router-dom"

class PopupNoteBox extends Component {
    constructor() {
        super()
        this.state = {
            annotation: "",
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault()
        const {poemName, selectedText, closeNote} = this.props
        const {annotation} = this.state
        const token = window.localStorage.getItem('token');
        const {data} = await axios.post(`/api/annotations/${poemName}`, {annotation, selectedText, token})
        closeNote(data)
    }

    setRedirect () {
        this.setState({
            redirect: true
        })
    }

    renderRedirect () {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }

    render () {
        let { style, selectedText, isLoggedIn } = this.props
        return (
            <Popup trigger={<button className="annotate-btn" style={style}> Annotate </button>} modal nested >
            {(close) => (
                <>
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                <div className="comment-header"> Annotate Below </div>
                    <div className="content">
                        {selectedText}
                    </div>
                </div>
                    {
                        isLoggedIn ? (
                        <>
                        <div className="comment-box">
                            <form className="new-form">
                                <div className="form__group">
                                    <textarea
                                    name="annotation"
                                    type="text"
                                    className="form-control"
                                    placeholder="Write Annotation Here"
                                    id="annotation"
                                    required
                                    minLength='1'
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <button type="submit" className="submit-anttn-btn" onClick={this.handleSubmit}>
                            Submit
                        </button>
                        </>
                        ) : (
                            <>
                                {this.renderRedirect()}
                                <button type="button" className="submit-anttn-btn" onClick={this.setRedirect}>
                                    Login to Annotate
                                </button>
                            </>
                        )
                    }
            </>
            )}
            </Popup>
        )
    }
}

const mapState = state => {
    return {
      isLoggedIn: !!state.auth.id
    };
  };

export default connect(mapState)(PopupNoteBox);
