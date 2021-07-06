import React, {Component, Fragment} from 'react'
import Popup from "reactjs-popup"

class Annotation extends Component {
    constructor() {
        super()
    }

    render() {
        const { match, notes } = this.props
        console.log('notes-->', notes)
        return (
            <Popup trigger={< span className="annotated-text">{match}</ span >} modal nested >
                {(close) => (
                    <>
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                        <div className="note-header"> Commentary on Annotated Lines </div>
                            <div className="content">
                                {match}
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
                        </div>
                    </>
                )}
            </Popup>
        )
    }
}

export default Annotation