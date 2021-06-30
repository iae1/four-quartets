import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchSinglePoem } from "../store/poems";
import Note from "./NoteBox";
import Line from "./Line"
import axios from "axios";
import Player from "./Player"
import PopupNoteBox from "./PopupNoteBox"

class SinglePoem extends Component {
  constructor() {
    super();
    this.state = {
      selection: "",
      mouseCoordinates: {
        x: 0,
        y: 0
      },
      song: {},
      lyrics: "",
      annotations: {},
      showAnnotateBtn: false,
      showNoteCpt: false,
      rendered: false,
    };
    this.selectText = this.selectText.bind(this);
    this.openAnnotation = this.openAnnotation.bind(this)
  }

  async componentDidMount() {
    const id = this.props.match.params.id;

    // Get poem lyrics from Genius API
    const lyrics = await axios.get(`/api/poems/${id}`)

    // Get all annotations that have been made on this poem from DB
    const annotations = await axios.get(`/api/annotations/${id}`)

    this.setState({ lyrics: lyrics.data, annotations: annotations.data });
  }

  selectText(e) {
    const selection = document.getSelection().toString();
    if (selection.length > 0) {
      this.setState({
        selection,
        mouseCoordinates: { x: e.pageX, y: e.pageY },
        showAnnotateBtn: true
      });
      console.log(this.state);
    } else {
      this.setState({ selection, showAnnotateBtn: false });
    }
  }

  openAnnotation(annotation) {
    console.log(annotation)
  }

  render() {
    const {
      lyrics,
      showAnnotateBtn,
      mouseCoordinates: { x, y },
      showNoteCpt,
      selection,
      annotations,
      rendered
    } = this.state;

    const title = this.props.match.params.id
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const btnStyle = {
      position: "absolute",
      left: `${x}px`,
      top: `${y + 20}px`
    };

    let theLyrics = lyrics.slice()
    

    if (theLyrics && annotations) {
      annotations.forEach((annotation) => {
        theLyrics = theLyrics.replace(annotation.linesAnnotated, `
          <span class="annotated-text" id="annotation-${annotation.id}" onclick="${annotation.content}">
            ${annotation.linesAnnotated}
          </span>`)
      })
      // this.setState({rendered: true})
    }
    
    return (
      <>
        <div className="single-poem">
          {!lyrics ? (
            <h3 className="loading-poem">Loading Poem</h3>
          ) : (
            <div className="loaded-poem">
              <h1>{title}</h1>
              <h3>By T.S. Eliot</h3>
              <div id="poem-lines" dangerouslySetInnerHTML={{__html: theLyrics}} onMouseUp={e => this.selectText(e)}>
                {
                  
                  
                  
                  // .split("\n").map((l, i, array) => {
                  //   initCharIdx += endCharIdx
                  //   endCharIdx += l.length 
                  //   return <Line key={i} line={l} initCharIdx={initCharIdx} endCharIdx={endCharIdx} />
                  /*
                  if (
                    i < array.length - 1 &&
                    array[i].length > 0 &&
                    array[i + 1].length > 0 &&
                    array[i + 1].includes("II")
                  ) {
                    return (
                      <Fragment key={i}>
                        {" "}
                        <span>{l}</span>
                        <br />
                        <span> </span>
                        <br />{" "}
                      </Fragment>
                    ); //must add new row to clean up data
                  } else {
                    return (
                      <Fragment key={i}>
                        <span>{l}</span>
                        <br />
                      </Fragment>
                    );
                  }
                */}
              </div>
              {
                showAnnotateBtn ? <PopupNoteBox style={btnStyle} selectedText={selection} /> : null
              }
              {/* {showAnnotateBtn ? (
                <button
                  style={btnStyle}
                  onClick={() =>
                    this.setState({ showNoteCpt: true, showAnnotateBtn: false })
                  }
                >
                  annotate
                </button>
              ) : null} */}
            </div>
          )}
        </div>
        {/* {showNoteCpt ? <Note selectedText={selection} /> : null} */}
        <Player trackName={this.props.match.params.id} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  singlePoem: state.poems.singlePoem,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loadSinglePoem: poemId => dispatch(fetchSinglePoem(poemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoem);
