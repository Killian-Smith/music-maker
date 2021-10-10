import React from "react";

import Player from "./Components/Player";

class App extends React.Component {
  render() {
    return (
      <div className="h-screen mx-auto" style={{ backgroundColor: "#F2F4F6" }}>
        <div className="flex justify-center">
          <Player />
        </div>
      </div>
    );
  }
}

export default App;
