import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
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
                        onChange={ () => { this.addToFavorites(music); } }
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
};

MusicCard.propTypes = {
  music: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object),
};

export default MusicCard;
