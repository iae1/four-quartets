import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPoems } from "../store/poems";
import { Link } from "react-router-dom";
import Genius from "genius-lyrics";

class AllPoems extends Component {
  componentDidMount() {
    this.props.loadPoems();
  }

  render() {
    const { poems } = this.props;

    return (
      <div className="all-poems">
        <h1>Four Quartets</h1>
        <h4 className="poem-link">
          <Link to={`/poems/burnt-norton`}>Burnt Norton</Link>
        </h4>
        <h4 className="poem-link">
          <Link to={`/poems/east-coker`}>East Coker</Link>
        </h4>
        <h4 className="poem-link">
          <Link to={`/poems/the-dry-salvages`}>The Dry Salvages</Link>
        </h4>
        <h4 className="poem-link">
          <Link to={`/poems/little-gidding`}>Little Gidding</Link>
        </h4>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  poems: state.poems.allPoems
});

const mapDispatchToProps = (dispatch, { history }) => ({
  loadPoems: () => dispatch(fetchPoems())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllPoems);
