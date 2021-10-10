import * as React from "react";

import "./styles.css";

import * as mm from "@magenta/music";
import Slider from "@mui/material/Slider";

import Dropdown from "react-dropdown";
const musicInstuments = ["Drums", "Melody", "Trio", "Multitrack"];

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 120,
      loaded: false,
    };
  }

  async componentDidMount() {
    this.player = new mm.Player();

    this.musicVAE = new mm.MusicVAE(
      "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_4bar_med_q2"
    );

    await this.musicVAE.initialize();

    console.log("IT WORKED, SO I AM A GOOD PROGRAMMER");

    this.setState({ loaded: true });
  }

  playSongWithAI = () => {
    if (this.player.isPlaying()) {
      this.player.stop();
    } else {
      this.musicVAE
        .sample(1, 1.5)
        .then((samples) => this.player.start(samples[0]));
    }
  };

  handleChange = (event) => {
    this.setState({ bpm: event.target.value });
    this.player.setTempo(event.target.value);
  };

  render() {
    if (!this.state.loaded)
      return (
        <div>
          <div className="loader" />
          <p className="text-black">
            Loading... This may take a few minutes depending on your internet
            speed.
          </p>
        </div>
      );

    return (
      <div
        className="bg-white shadow-sm h-52 rounded-2xl p-6 mt-48 flex items-center"
        style={{ width: "730px" }}>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <img
              src="https://raw.githubusercontent.com/magenta/listen-to-transformer/master/assets/icon-512.png"
              alt="Music"
              style={{
                borderRadius: "50%",
                height: "300px",
                width: "300px",
                animation: "spin 6s linear infinite",
                border: "10px solid white",
              }}
            />
          </div>
          <div className="col-span-6 py-16">
            <p className="font-medium text-xl">Drums</p>
            <Slider
              size="small"
              value={this.state.bpm}
              max={240}
              min={40}
              onChange={this.handleChange}
              aria-label="Small"
              valueLabelDisplay="auto"
            />
            <button onClick={() => this.playSongWithAI()}>TEST</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
