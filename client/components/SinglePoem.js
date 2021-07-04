import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchSinglePoem } from "../store/poems";
import axios from "axios";
import Player from "./Player"
import PopupNoteBox from "./PopupNoteBox"
import reactStringReplace from 'react-string-replace';
import Annotation from "./Annotation"


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
      annotations: [],
      showAnnotateBtn: false,
      rendered: false,
    };
    this.selectText = this.selectText.bind(this);
    this.closeNoteCpt = this.closeNoteCpt.bind(this)
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
    } else {
      this.setState({ selection, showAnnotateBtn: false });
    }
  }

  closeNoteCpt(newAnnotation) {
    const {annotations} = this.state
    let newAnnotations = annotations.slice()
    newAnnotations.push(newAnnotation)
    this.setState({showAnnotateBtn: false, annotations: newAnnotations })
  }

  render() {
    const {
      lyrics,
      showAnnotateBtn,
      mouseCoordinates: { x, y },
      selection,
      annotations,
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
    let result;

    if (theLyrics && annotations) {

      annotations.forEach((annotation, idx) => {
        console.log(annotation)
        if (idx > 0) {
          result = reactStringReplace(result, annotation.linesAnnotated, (match, i) => 
          (<Annotation key={annotation.id} match={annotation.linesAnnotated} comment={annotation.content} />)
          )
        } else {
          result = reactStringReplace(theLyrics, annotation.linesAnnotated, (match, i) => 
          (<Annotation key={annotation.id} match={annotation.linesAnnotated} comment={annotation.content} />)
          )
        }      
          
      })
    }
    
    return (
      <>
        <div className="single-poem">
          {!lyrics ? (
            // <h3 className="loading-poem">Loading Poem</h3>
            <div class="lds-hourglass"></div>
          ) : (
            <div className="loaded-poem">
              <h1>{title}</h1>
              <h3>By T.S. Eliot</h3>
              <div id="poem-lines" onMouseUp={e => this.selectText(e)}>
                {
                  result
                }
              </div>
              {
                showAnnotateBtn ? <PopupNoteBox style={btnStyle} selectedText={selection} poemName={this.props.match.params.id} closeNote={this.closeNoteCpt}/> : null
              }
            </div>
          )}
        </div>
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
