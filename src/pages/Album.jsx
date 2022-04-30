import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import Loading from './Loading';
import '../styles/album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      albumReceived: [],
      favoriteSongsList: [],
    };
  }

  componentDidMount() {
    this.receiveAlbum();
    this.favoriteSongs();
  }

  receiveAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const alb = await getMusics(id);
    this.setState({
      albumReceived: alb,
    });
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
    const { albumReceived, loading, favoriteSongsList } = this.state;
    return (
      <div data-testid="page-album" className="container">
        <Header />
        {
          albumReceived.length > 0 && (
            <section className="content">
              <div className="thumb-album">
                <div className="img-album">
                  <img src={ albumReceived[0].artworkUrl100 } alt="" />
                </div>
                <div className="description-album">
                  <h3 data-testid="album-name">{albumReceived[0].collectionName}</h3>
                  <p data-testid="artist-name">{albumReceived[0].artistName}</p>
                </div>
              </div>
              <div className="music">
                {
                  loading ? <Loading /> : albumReceived
                    .map((music, index) => (
                      <MusicCard
                        key={ index }
                        music={ music }
                        favoriteSongs={ favoriteSongsList }
                      />
                    ))
                }
              </div>
            </section>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
