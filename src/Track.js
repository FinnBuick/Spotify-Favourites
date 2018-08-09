import React, { Component } from "react";

class Track extends Component {
  render() {
    return (
      <div
        className="uk-card uk-card-hover uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-grid"
        uk-grid=""
        uk-scrollspy="target: > div; cls:uk-animation-fade; delay: 500"
      >
        <div className="uk-flex-last@s uk-card-media-left uk-cover-container">
          <img src={this.props.img} alt="" uk-cover="" className="uk-cover" />
          <canvas width="1000" height="1000" />
        </div>
        <div className="uk-first-column">
          <div className="uk-card-header">
            <h3 className="uk-card-title">
              {this.props.track} - {this.props.artist}
            </h3>
          </div>
          <div className="uk-card-body">
            <div className="uk-align-center">
            <audio controls>
              <source src={this.props.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
