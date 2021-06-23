import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchSinglePoem } from "../store/poems";
import Note from "./NoteBox";
import Genius from "genius-lyrics";

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
      showAnnotateBtn: false,
      showNoteCpt: false
    };
    this.selectText = this.selectText.bind(this);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const title = id
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const Client = new Genius.Client(
      "2zmtmacvIEj-UMibtaxqNf4NrP6MbPdnvlh-uJ0vnM9C58wW7mh5PSl-YiMg-1PB"
    );
    const searches = await Client.songs.search(`Four Quartets: ${title}`);

    // Pick first one
    const firstSong = searches[0];
    console.log("About the Song:\n", firstSong, "\n");

    // Ok lets get the lyrics
    const lyrics = await firstSong.lyrics();
    console.log("Lyrics of the Song:\n", lyrics, "\n");
    const artist = await Client.artists.get(742);
    console.log("About the Artist:\n", artist, "\n");
    this.setState({ lyrics, song: firstSong });
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
  render() {
    const {
      lyrics,
      showAnnotateBtn,
      mouseCoordinates: { x, y },
      showNoteCpt,
      selection
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
    console.log(lyrics.split("\n"));
    return (
      <>
        <div className="single-poem">
          {!lyrics ? (
            <h3>Loading Poem</h3>
          ) : (
            <div>
              <h1>{title}</h1>
              <h3>By T.S. Eliot</h3>
              <p id="poem" onMouseUp={e => this.selectText(e)}>
                {lyrics.split("\n").map((l, i, array) => {
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
                })}
              </p>
              {showAnnotateBtn ? (
                <button
                  style={btnStyle}
                  onClick={() =>
                    this.setState({ showNoteCpt: true, showAnnotateBtn: false })
                  }
                >
                  annotate
                </button>
              ) : null}
            </div>
          )}
        </div>
        {showNoteCpt ? <Note selectedText={selection} /> : null}
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
