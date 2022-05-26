import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaPlay, FaPause } from 'react-icons/fa';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../styles/musiccard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
      audioId: 'audio',
      intervalo: null,
    };
  }

  componentDidMount() {
    const { music } = this.props;
    this.checkFavorites();
    this.setState({
      audioId: music.trackId,
    });
  }

  componentWillUnmount() {
    const { intervalo } = this.state;
    clearInterval(intervalo);
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

  progresso = (audio) => {
    const { music } = this.props;
    const { intervalo } = this.state;
    const percentual = (audio.currentTime / audio.duration) * 100;
    if (audio.currentTime === audio.duration) {
      clearInterval(intervalo);
    }
    const barra = document.getElementsByClassName(music.trackId);
    const bar = barra[0];
    bar.style.cssText = `height: 2px; width: ${percentual}%; background: #fea418;`;
    // bar.style.width = ``;
    // bar.style.background = '#fea418';
  }

  playMusic = () => {
    const { audioId } = this.state;
    const SECOND = 1000;
    const audio = document.getElementById(audioId);
    audio.play();

    const intervalo = setInterval(() => {
      this.progresso(audio);
    }, SECOND);
    this.setState({
      intervalo,
    });
  }

  pauseMusic = () => {
    const { audioId, intervalo } = this.state;
    const audio = document.getElementById(audioId);
    audio.pause();
    clearInterval(intervalo);
  }

  render() {
    const { music } = this.props;
    const { loading, checked, audioId } = this.state;
    return (
      <section>
        {
          music.trackId && (
            <div className="card-music-container">
              <div className="card-music-thumb">
                <img src={ music.artworkUrl100 } alt="Thumbnail do albúm" />
              </div>
              <div className="card-music-label-player">
                <div className="card-music-trackName">
                  <p className="artist-name">
                    <abbr title={ music.trackName }>
                      {music.trackName}
                    </abbr>
                  </p>
                </div>
                <div className="card-music-player">
                  {
                    music.previewUrl && (
                      <>
                        <audio
                          data-testid="audio-component"
                          src={ music.previewUrl }
                          controls
                          id={ audioId }
                        >
                          <track kind="captions" />
                        </audio>
                        <div>
                          <button
                            type="button"
                            onClick={ () => this.playMusic() }
                          >
                            <FaPlay />
                          </button>
                          <button
                            type="button"
                            onClick={ () => this.pauseMusic() }
                          >
                            <FaPause />
                          </button>
                        </div>
                      </>
                    )
                  }
                </div>
                <div className="progress-bar">
                  <div className={ music.trackId } />
                </div>
              </div>
              <div className="card-music-saveFavorite">
                {
                  loading ? <Loading /> : (
                    <label
                      htmlFor={ music.trackId }
                      className={ checked ? 'checked' : '' }
                    >
                      <FaHeart />
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
