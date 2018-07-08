import React, { Component } from 'react';
import '../node_modules/uikit/dist/css/uikit.css'
import testUserData from './user.json';
import testFavData from './data.json';

class Logo extends Component {
  render() {
    return (
      <h2 style={{float: 'left'}}>Spotify Favourites</h2>
    );
  }
}

class User extends Component {
  render() {
    return (
      <div style={{float: 'right'}}>
        <div style={{color: '#222', display: 'inline-block', padding: '5px'}}>
          {this.props.name}
          <a href='#' style={{display: 'block'}}>Logout</a>
        </div>
        <div style={{display: 'inline-block'}}>
          <img src={this.props.img} height='40' width='40' style={{borderRadius: '20px'}}/>
        </div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="uk-navbar-container" style={{height: '60px', padding: '10px'}}>
        <Logo/>
        <User name={testUserData.display_name} img={testUserData.images[0].url}/>
      </div>
    )
  }
}

class Item extends Component {
  render() {
    return (
      <div className="uk-card uk-card-hover uk-card-body uk-text-center" style={{display: 'inline-block', padding: '10px'}}>
        <img src={this.props.img} />
        <h2>{this.props.track}</h2>
        <h2>{this.props.artist}</h2>
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
    }, 1000)
  }

  render() {
    return (
      <div>
        <Header/>
        <div style={{ marginLeft: 'auto', marginRight: 'auto'}}>
          {this.state.items[0] && this.state.items.map(item => <Item track={item && item.name} artist={item && item.artists[0].name} img={item && item.album.images[0].url}/>)}
        </div>
      </div>
    );
  }
}

export default MainPage;
