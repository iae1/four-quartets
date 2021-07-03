import React, {Component} from 'react'
import Popup from "reactjs-popup"

class Annotation extends Component {
    constructor() {
        super()
    }

    render() {
        const { match, comment, image } = this.props
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
                            <div className="commentary">
                                {comment}
                            </div>
                        </div>
                    </>
                )}
            </Popup>
        )
    }
}

export default Annotation