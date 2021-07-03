import React, {Component} from "react";
import Popup from "reactjs-popup";
import axios from "axios"

class PopupNoteBox extends Component {
    constructor() {
        super()
        this.state = {
            annotation: ""
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
        const {poemName, selectedText, closeNote} = this.props
        const {annotation} = this.state
        const {data} = await axios.post(`/api/annotations/${poemName}`, {annotation, selectedText})
        closeNote(data)
    }

    render () {
        const { style, selectedText } = this.props

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
                    {/* <div className="form__group"> */}
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                        Submit
                        </button>
                    {/* </div> */}
                </form>
            </div>
            </>
            )}
            </Popup>
        )
    }
}

export default PopupNoteBox;
