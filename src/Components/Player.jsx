import * as React from "react";

import "./styles.css";

import { connect } from "react-redux";
import { addSong } from "../Redux/Slices/songsSlice";

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
      temp: 1.5,
      loaded: false,
      playing: false,
    };
  }

  async componentDidMount() {
    this.player = new mm.Player();

    this.musicDrums = new mm.MusicVAE(
      "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_4bar_med_q2"
    );

    this.musicMelody = new mm.MusicVAE(
      "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_16bar_small_q2"
    );

    await this.musicDrums.initialize();
    await this.musicMelody.initialize();

    this.setState({ loaded: true });
  }

  generateDrumsSong = () => {
    this.musicDrums
      .sample(1, this.state.temp)
      .then((samples) => this.props.addSong(samples[0]));
  };

  generateMelodySong = () => {
    this.musicMelody
      .sample(1, this.state.temp)
      .then((samples) => this.props.addSong(samples[0]));
  };

  handleChange = (event) => {
    this.setState({ temp: event.target.value });
  };

  render() {
    {
      /*}
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
    {*/
    }

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
                  <div className="grid grid-cols-2 gap-4 pb-4">
                    <button
                      onClick={() => this.generateDrumsSong()}
                      className="border-2 rounded-lg">
                      <p className="font-medium text-lg text-center">Drums</p>
                    </button>
                    <button
                      onClick={() => this.generateMelodySong()}
                      className="border-2 rounded-lg">
                      <p className="font-medium text-lg text-center">Melody</p>
                    </button>
                  </div>
                  <div className="grid grid-cols-12 gap-1 items-center">
                    <p className="col-span-5 font-medium text-lg">Randomness</p>
                    <Slider
                      className="col-span-7"
                      size="small"
                      value={this.state.temp}
                      min={1.5}
                      max={10}
                      onChange={this.handleChange}
                      aria-label="Small"
                      valueLabelDisplay="auto"
                    />
                  </div>
                  <Songs />
                </div>
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
