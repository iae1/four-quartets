import React, {Component, Fragment} from 'react'
import Popup from "reactjs-popup"
import axios from "axios"
import { Redirect } from "react-router-dom"
import {connect} from "react-redux"

class Annotation extends Component {
    constructor() {
        super()
        this.state = {
            addComment: false,
            anotation: "",
            redirect: false,
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
        try {
            e.preventDefault()
            const {poemName, selectedText, closeNote} = this.props
            const {annotation} = this.state
            const token = window.localStorage.getItem('token');
            const {data} = await axios.post(`/api/annotations/${poemName}`, {annotation, selectedText, token})
        } catch (error) {
            console.log(error)
        }
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

    render() {
        const { selectedText, notes } = this.props
        return (
            <Popup trigger={< span className="annotated-text">{selectedText}</ span >} modal nested >
                {(close) => (
                    <>
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="note-header"> 
                                Commentary on Annotated Lines 
                            </div>
                                <div className="content">
                                    {selectedText}
                                </div>
                                <hr />
                                {
                                    notes.map((note) => (
                                    <div className="individual-comment" key={note.id}>
                                        <div className="author-icon">
                                            {note.author.email[0]}
                                        </div>
                                        <div className="annotation-contents">
                                        <div className="author">
                                            {note.author.email}
                                        </div>
                                        <div className="time-created">
                                            {`Written on ${new Date(note.createdAt).toLocaleDateString('en-US')} at ${new Date(note.createdAt).toLocaleTimeString('en-US')}`}
                                        </div>
                                        <div className="commentary">
                                            {note.content}
                                        </div>
                                        </div>
                                    </div>
                                    ))
                                }
                            {
                                this.props.isLoggedIn
                                ?
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
                                    <button type="submit" className="submit-anttn-btn" onClick={async(e) => {await this.handleSubmit(e); close()}}>
                                        Submit
                                    </button>
                                </>
                                :
                                <>
                                    {this.renderRedirect()}
                                    <button type="button" className="submit-anttn-btn" onClick={this.setRedirect}>
                                        Login to Annotate
                                    </button>
                                </>
                            }
                        </div>
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

export default connect(mapState)(Annotation);