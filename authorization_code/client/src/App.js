
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';


const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', pop:'', artist:'', dur:'', test2: '' , album:'', type:''}
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url,
              pop: response.item.popularity,
              artist: response.item.artists[0].name,
              test2: response.item.artists[0].id,
              album: response.item.album.name,
              dur: response.item.duration_ms,

              //test: (spotifyApi.getArtistTopTracks((response.item.artists[0].id), 'US'))
            }
        });
      }
      )
    } 
  
  getTopTracks( sid){

  }

render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="http://localhost:8888"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login to Spotify
        </a>
        <div> Now Playing: { this.state.nowPlaying.name } </div>
        <div> Artist: { this.state.nowPlaying.artist } </div>
        {/* <div> Album: { this.state.nowPlaying.album } </div> */}
        <div> Popularity: { this.state.nowPlaying.pop } </div>
        <div> Durration: { this.state.nowPlaying.dur } miliseconds </div>
        <div> Spotify ID: { this.state.nowPlaying.test2 }  </div>
        <div>
        <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
        
      }
              {/* { this.state.loggedIn &&
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      } */}
      </header>
    </div>
    );
  }
}

export default App;
