import React, { Component } from "react";
import queryString from "query-string";
import Header from "./Header";
import Track from "./Track";
import Tabs from "./Tabs";
import Tab from "./Tab";
import "./MainPage.css";
import "../node_modules/uikit/dist/css/uikit.css";
import "../node_modules/uikit/dist/js/uikit-icons.js";


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      requestFailed: false
    };
  }

  componentDidMount() {
    // Parse the users access token
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    // Fetch the users favourite tracks from spotify
    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
      { headers: { Authorization: "Bearer " + accessToken } }
    )
      .then(response => {
        // Throw an error if the request fails
        if (!response.ok) {
          throw Error("Network request failed");
        }

        return response;
      })
      .then(data => data.json())
      .then(data => {
          // Store response in local state
          this.setState({
            tracks: data.items
          });
        },
        () => {
          this.setState({
            requestFailed: true
          });
        }
      );
  }

  render() {
    // Catch the error
    if (this.state.requestFailed)
      return <p>Request Failed, please try again.</p>;

    const tracksDays =
      this.state.tracks &&
      this.state.tracks.map(track => (
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
                  {this.state.tracks ? tracksDays : <span uk-spinner="ratio: 4.5" />}
                </Tab>
                <Tab tabText="Months">Months</Tab>
                <Tab tabText="Years">Years</Tab>
              </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
