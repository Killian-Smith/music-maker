import * as React from "react";

import "./styles.css";

import { connect } from "react-redux";
import { addSong } from "../Redux/Slices/songsSlice";

import { BsPlusCircle } from "react-icons/bs";

import * as mm from "@magenta/music";
import Slider from "@mui/material/Slider";

import { ThemeProvider, createTheme } from "@mui/material";
import Songs from "./Songs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0052fe",
    },
  },
});

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 120,
      loaded: false,
      playing: false,
    };
  }

  async componentDidMount() {
    this.player = new mm.Player();

    this.musicVAE = new mm.MusicVAE(
      "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_4bar_med_q2"
    );

    await this.musicVAE.initialize();

    this.setState({ loaded: true });
  }

  generateSong = () => {
    if (this.player.isPlaying()) {
      this.player.stop();
    } else {
      this.musicVAE
        .sample(1, 1.5)
        .then((samples) => this.props.addSong(samples[0]));
    }
  };

  resume = () => {
    if (this.player.isPlaying()) {
      this.player.stop();
    } else {
      this.player.resumeContext();
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
      <ThemeProvider theme={theme}>
        <div
          className="bg-white shadow-sm h-52 rounded-2xl p-6 mt-48 flex items-center"
          style={{ width: "665px" }}>
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
              <div className="flex items-center h-full">
                <div className="w-full">
                  <div>
                    <p className="font-medium text-lg">Drums</p>
                  </div>
                  <div className="grid grid-cols-12 gap-1 items-center">
                    <p className="col-span-2 font-medium text-lg">BPM:‎‏‎</p>
                    <Slider
                      className="col-span-10"
                      size="small"
                      value={this.state.bpm}
                      max={240}
                      min={40}
                      onChange={this.handleChange}
                      aria-label="Small"
                      valueLabelDisplay="auto"
                    />
                  </div>
                  <div className="grid grid-cols-6 items-center">
                    <BsPlusCircle
                      size={28}
                      color="#232946"
                      className="cursor-pointer"
                      onClick={this.generateSong}
                    />
                    <div className="col-span-5">
                      <Songs />
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapDispatchToProps = { addSong };

export default connect(null, mapDispatchToProps)(Player);
