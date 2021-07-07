import React from "react";

const Home = props => {
  return (
    <>
    <header className="header">
      <div className="text-box">
        <h1 className="heading-primary">
          <span className="heading-primary-main">Four Quartets Genius App</span>
          <span className="heading-primary-sub">In my beginning is my end.</span>
        </h1>
        <p className="please-enjoy">
        Please enjoy commenting on T.S. Eliot's masterpiece.
      </p>
      </div>
    </header>
    <img className="background-image" src="./assets/gutenberg.jpg" />
    {/* <img className="opening-image" src="./assets/burnt-norton.jpg" />
    <img className="opening-image" src="./assets/east-coker.jpg" />
    <img className="opening-image" src="./assets/dry-salvages.jpg" />
    <img className="opening-image" src="./assets/little-gidding.jpg" /> */}
    </>
  );
};

export default Home;
