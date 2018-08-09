import React, { Component } from "react";
import queryString from "query-string";
import Header from "./Header";
import Track from "./Track";
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
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
      { headers: { Authorization: "Bearer " + accessToken } }
    )
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }

        return response;
      })
      .then(data => data.json())
      .then(
        data => {
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
    if (this.state.requestFailed)
      return <p>Request Failed, please try again.</p>;

    const trackItems =
      this.state.tracks &&
      this.state.tracks.map(track => (
        <Track
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
              <ul className="uk-tab uk-flex-center">
                <li class="uk-active"><a href="#">Days</a></li>
                <li><a href="#">Months</a></li>
                <li><a href="#">Years</a></li>
              </ul>
            {this.state.tracks ? trackItems : <span uk-spinner="ratio: 4.5" />}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
