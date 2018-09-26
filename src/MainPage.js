import React, { Component } from "react";
import Header from "./Header";
import Track from "./Track";
import Tabs from "./Tabs";
import Tab from "./Tab";
import { ApiService } from './Service/ApiService.js'
import "./MainPage.css";
import "../node_modules/uikit/dist/css/uikit.css";
import "../node_modules/uikit/dist/js/uikit-icons.js";


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracksDays: [],
      tracksMonths: [],
      tracksYears: [],
      requestFailed: false
    };
  }

  componentDidMount() {
    let shortTermURL = "top/tracks?time_range=short_term&limit=5"
    let mediumTermURL = "top/tracks?time_range=medium_term&limit=5"
    let longTermURL = "top/tracks?time_range=long_term&limit=5"

    // Fetch the users favourite tracks from spotify (short_term)
    ApiService.userApi(shortTermURL, this, "tracksDays");

    // Fetch the users favourite tracks from spotify (medium_term)
    ApiService.userApi(mediumTermURL, this, "tracksMonths");

    // Fetch the users favourite tracks from spotify (long_term)
    ApiService.userApi(longTermURL, this, "tracksYears");
  }

  render() {
    // Catch the error
    if (this.state.requestFailed)
      return <p>Request Failed, please try again.</p>;

    const tracksDays =
      this.state.tracksDays &&
      this.state.tracksDays.map(track => (
        <Track
          key={track && track.id}
          track={track && track.name}
          artist={track && track.artists[0].name}
          img={track && track.album.images[1].url}
          audio={track && track.preview_url}
        />
      ));

    const tracksMonths =
      this.state.tracksMonths &&
      this.state.tracksMonths.map(track => (
        <Track
          key={track && track.id}
          track={track && track.name}
          artist={track && track.artists[0].name}
          img={track && track.album.images[1].url}
          audio={track && track.preview_url}
        />
      ));

    const tracksYears =
      this.state.tracksYears &&
      this.state.tracksYears.map(track => (
        <Track
          key={track && track.id}
          track={track && track.name}
          artist={track && track.artists[0].name}
          img={track && track.album.images[1].url}
          audio={track && track.preview_url}
        />
      ));

    return (
      <div className="MainPage">
        <Header />
        <div>
          <div className="uk-container" style={{ width: "600px" }}>
            <h2 className="uk-text-center"><span>Your Top 5</span></h2>
              <Tabs defaultActiveTabIndex={0}>
                <Tab isActive={true} tabText="Days">
                  {this.state.tracksDays ? tracksDays : <span uk-spinner="ratio: 4.5" />}
                </Tab>
                <Tab tabText="Months">
                  {this.state.tracksMonths ? tracksMonths : <span uk-spinner="ratio: 4.5" />}
                </Tab>
                <Tab tabText="Years">
                  {this.state.tracksYears ? tracksYears : <span uk-spinner="ratio: 4.5" />}
                </Tab>
              </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
