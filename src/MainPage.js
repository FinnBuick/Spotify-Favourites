import React, { Component } from 'react';
import UIkit from 'uikit';
import '../node_modules/uikit/dist/css/uikit.css'
import '../node_modules/uikit/dist/css/uikit-core.css'
import testUserData from './user.json';
import testFavData from './data.json';



class Header extends Component {
  render() {
    return (
      <nav className="uk-navbar uk-navbar-transparent">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-logo uk-active"><a href="">Spotify Favourites</a></li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li><a href="">Logout</a></li>
            <div className="uk-navbar-item">{testUserData.display_name}</div>
            <div className="uk-navbar-item">
              <img className="uk-border-circle" src={testUserData.images[0].url} height='40' width='40'/>
            </div>
          </ul>
        </div>
      </nav>

    )
  }
}

class Item extends Component {
  render() {
    return (
      // <div class="uk-card uk-card-default uk-child-width-1-2" uk-grid>
      //   <div class="uk-card-media-left uk-cover-container">
      //     <img src={this.props.img} height='500' width='500'uk-cover/>
      //     <canvas width="500" height="500"></canvas>
      //   </div>
      //   <div>
      //     <div class="uk-card-body">
      //       <h2>{this.props.track}</h2>
      //       <h2>{this.props.artist}</h2>
      //     </div>
      //   </div>
      // </div>
      //
      //
      <div class="uk-card uk-card-hover uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-grid" uk-grid="">
        <div class="uk-flex-last@s uk-card-media-right uk-cover-container">
          <img src={this.props.img} alt="" uk-cover="" class="uk-cover"/>
          <canvas width="1000" height="1000"></canvas>
        </div>
        <div class="uk-first-column">
          <div class="uk-card-body">
            <h3 class="uk-card-title">{this.props.track} - {this.props.artist}</h3>
          </div>
        </div>
      </div>

      )
    }
  }

  class MainPage extends Component {
    constructor() {
      super()
      this.state = {items: {}}
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({items: testFavData.items})
      }, 0)
    }

    render() {
      return (
        <div >
          <Header/>
          <div>
            <div className="uk-container" style={{width: '600px'}}>
              <h2>Your Top 5</h2>
              {this.state.items[0] && this.state.items.map(item => <Item track={item && item.name} artist={item && item.artists[0].name} img={item && item.album.images[0].url}/>)}
            </div>
          </div>
        </div>
      );
    }
  }

  export default MainPage;
