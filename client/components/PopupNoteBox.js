import React, {Component} from "react";
import Popup from "reactjs-popup";
import axios from "axios"

class PopupNoteBox extends Component {
    constructor() {
        super()
        this.state = {
            noteContent: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault()
        console.log('noteProps', this.props)
        const {poemName, selectedText, closeNote} = this.props
        const {noteContent} = this.state
        closeNote()
        await axios.post(`/api/annotations/${poemName}`, {noteContent, selectedText})
    }

    render () {
        const { style, selectedText, poemName } = this.props

        return (
            <Popup trigger={<button style={style}> Annotate </button>} modal nested >
            {(close) => (
                <>
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                <div className="header"> Annotate Below </div>
                    <div className="content">
                        {selectedText}
                    </div>
                </div>
                <div className="comment-box">
                <form className="new-form">
                    <div className="u-margin-bottom-medium" />
                    <div className="form__group">
                        <input
                        name="annotation"
                        type="text"
                        className="new-form__input"
                        placeholder="Write Annotation Here"
                        id="annotation"
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="form__group">
                        <button type="submit" className="btn btn--green" onClick={this.handleSubmit}>
                        Submit
                        </button>
                    </div>
                </form>
            </div>
            </>
            )}
            </Popup>
        )
    }
}

export default PopupNoteBox;
