import React, {Component} from "react";
import Popup from "reactjs-popup";
// import 'reactjs-popup/dist/index.css';

// const PopupNoteBox = ({ style, selectedText }) => {

//   return (
//     <Popup trigger={<button style={style}>Annotate</button>} modal nested>
//       {(close) => (
//         <div className="modal">
//           <button className="close" onClick={close}>
//             &times;
//           </button>
//           <div className="header"> Annotate Below </div>
//           <div className="content">
//             {/* {" "} */}
//             {selectedText}
//           </div>
//           <div className="actions">
//             <Popup
//               trigger={<button className="button"> Trigger </button>}
//               position="top center"
//               nested
//             >
//               <span>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
//                 magni omnis delectus nemo, maxime molestiae dolorem numquam
//                 mollitia, voluptate ea, accusamus excepturi deleniti ratione
//                 sapiente! Laudantium, aperiam doloribus. Odit, aut.
//               </span>
//             </Popup>
//             <button
//               className="button"
//               onClick={() => {
//                 console.log("modal closed ");
//                 close();
//               }}
//             >
//               close modal
//             </button>
//           </div>
//         </div>
//       )}
//     </Popup>
//   );
// };

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

    handleSubmit(e) {}

    render () {
        const { style, selectedText } = this.props

        return (
            <Popup trigger={<button style={style}>Annotate</button>} modal nested>
            {(close) => (
                <div className="modal">
                <button className="close" onClick={close}>
                    &times;
                </button>
                <div className="header"> Annotate Below </div>
                <div className="content">
                    {/* {" "} */}
                    {selectedText}
                </div>
                <div className="actions">
                    <Popup
                    trigger={<button className="button"> Trigger </button>}
                    position="top center"
                    nested
                    >
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                        magni omnis delectus nemo, maxime molestiae dolorem numquam
                        mollitia, voluptate ea, accusamus excepturi deleniti ratione
                        sapiente! Laudantium, aperiam doloribus. Odit, aut.
                    </span>
                    </Popup>
                    <button
                    className="button"
                    onClick={() => {
                        console.log("modal closed ");
                        close();
                    }}
                    >
                    close modal
                    </button>
                </div>
                </div>
            )}
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
            </Popup>
        )
    }
}

export default PopupNoteBox;
