import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.checkFavorites();
  }

  toggleFavoriteSongs = ({ target }, music) => {
    if (target.checked) {
      this.addToFavorites(music);
    } else {
      this.removeToFavoriteSongs(music);
    }
  }

  removeToFavoriteSongs = (music) => {
    const { funFavoriteSongs } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const ok = await removeSong(music);
      this.setState({
        loading: !ok === 'OK',
        checked: false,
      });
      if (funFavoriteSongs) {
        funFavoriteSongs();
      }
    });
  }

  addToFavorites = (music) => {
    this.setState({
      loading: true,
    }, async () => {
      const ok = await addSong(music);
      this.setState({
        loading: !ok === 'OK',
        checked: true,
      });
    });
  }

  checkFavorites = () => {
    const { music, favoriteSongs } = this.props;
    const yes = favoriteSongs.some((value) => value.trackId === music.trackId);
    if (yes) {
      this.setState({
        checked: true,
      });
    }
  }

  render() {
    const { music } = this.props;
    const { loading, checked } = this.state;
    return (
      <section>
        {
          music.trackId && (
            <div className="card-music-container">
              <div className="card-music-thumb">
                <img src={ music.artworkUrl100 } alt="Thumbnail do albúm" />
              </div>
              <div className="card-music-trackName">
                <p>{music.trackName}</p>
              </div>
              <div className="card-music-player">
                {
                  music.previewUrl && (
                    <audio
                      data-testid="audio-component"
                      src={ music.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                    </audio>
                  )
                }
              </div>
              <div className="card-music-saveFavorite">
                {
                  loading ? <Loading /> : (
                    <label htmlFor={ music.trackId }>
                      Favorita
                      <input
                        type="checkbox"
                        name="favorite-input"
                        checked={ checked }
                        data-testid={ `checkbox-music-${music.trackId}` }
                        onChange={ (e) => { this.toggleFavoriteSongs(e, music); } }
                        id={ music.trackId }
                      />
                    </label>
                  )
                }
              </div>
            </div>
          )
        }
      </section>
    );
  }
}

MusicCard.defaultProps = {
  favoriteSongs: [],
  funFavoriteSongs: () => {},
};

MusicCard.propTypes = {
  music: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object),
  funFavoriteSongs: PropTypes.func,
};

export default MusicCard;
