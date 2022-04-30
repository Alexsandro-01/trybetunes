import React, { Component } from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoriteSongsList: [],
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  favoriteSongs = () => {
    this.setState({
      loading: true,
    }, async () => {
      this.setState({
        loading: false,
        favoriteSongsList: await getFavoriteSongs(),
      });
    });
  }

  render() {
    const { favoriteSongsList, loading } = this.state;
    return (
      <div data-testid="page-favorites" className="container">
        <Header />
        <h3>Musicas Favoritas</h3>
        <div className="content">
          <div>
            {
              loading ? <Loading /> : favoriteSongsList
                .map((music, index) => (
                  <MusicCard
                    key={ index }
                    music={ music }
                    funFavoriteSongs={ this.favoriteSongs }
                    favoriteSongs={ favoriteSongsList }
                  />
                ))
            }
          </div>
        </div>

      </div>
    );
  }
}

export default Favorites;
