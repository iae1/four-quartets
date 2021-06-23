import React from "react";

const Home = props => {
  return (
    // <div>
    //   <h1>Welcome to Four Quartets Genius App</h1>
    //   <p>
    //     Please enjoy commenting on T.S. Eliot's masterpiece
    //   </p>
    // </div>
    <header className="header">
      {/* <div class="logo-box">
        <img src="img/Cat_Logo_3.png" alt="Logo" className="logo" />
      </div>
       */}
      <div className="text-box">
        <h1 className="heading-primary">
          <span className="heading-primary-main">Four Quartets</span>
          <span className="heading-primary-sub">in my beginning is my end</span>
        </h1>
      </div>
    </header>
  );
};

export default Home;
