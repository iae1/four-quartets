import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchSinglePoem } from "../store/poems";
import Note from "./NoteBox";
import Line from "./Line"
import axios from "axios";
import Player from "./Player"
import PopupNoteBox from "./PopupNoteBox"
import {findAll} from  "highlight-words-core"
import reactStringReplace from 'react-string-replace';
import Annotation from "./Annotation"
const replace = require('string-replace-to-array')


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
      rendered: false,
    };
    this.selectText = this.selectText.bind(this);
    this.openAnnotation = this.openAnnotation.bind(this)
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

  openAnnotation(annotation) {
    console.log(annotation)
  }

  closeNoteCpt() {
    this.setState({showAnnotateBtn: false})
  }

  render() {
    const {
      lyrics,
      showAnnotateBtn,
      mouseCoordinates: { x, y },
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
    let result;

    if (theLyrics && annotations) {

      // theLyrics = reactStringReplace(theLyrics, "Herakleitos", (match, i) => 
      //     <Annotation key={match + i} match={match} comment={annotations[1].comment} />
      //     // <span key={i} style={{ color: 'red' }}>{match}</span>
      //     )
      // theLyrics.join('')
      const words = ['time', 'Herakleitos', 'ζώουσιν']
      // result = reactStringReplace(theLyrics, words[0], (match, i) => 
      //     (<Annotation key={match + i} match={words[0]} comment={'annotation.comment'} />)
      //     )

      annotations.forEach((annotation, idx) => {
        // replace(theLyrics, word, function() {
        //   return <Annotation key={match + i} match={word} comment={'annotation.comment'} />
        // })
        if (idx > 0) {
          result = reactStringReplace(result, annotation.linesAnnotated, (match, i) => 
          (<Annotation key={match + i} match={annotation.linesAnnotated} comment={annotation.comment} />)
          )
        } else {
          result = reactStringReplace(theLyrics, annotation.linesAnnotated, (match, i) => 
          (<Annotation key={match + i} match={annotation.linesAnnotated} comment={annotation.comment} />)
          )
        }
        
          
      })

      console.log('result', result)
      // theLyrics.join('')
      
      

      // annotations.forEach((annotation) => {
      //   const lineAnnotated = new RegExp(annotation.lineAnnotated, 'g')
      //   theLyrics = reactStringReplace(theLyrics, new RegExp(annotation.lineAnnotated, 'gi'), (match, i) => 
      //     <Annotation key={match + i} match={match} comment={annotation.comment} />
      //     // <span key={i} style={{ color: 'red' }}>{match}</span>
      //     )
      // })
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
              <div id="poem-lines" onMouseUp={e => this.selectText(e)}>
                {
                  result
                  
                  
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
