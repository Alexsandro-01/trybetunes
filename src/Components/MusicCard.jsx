import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music } = this.props;
    // console.log(music);
    return (
      <div className="card-music-container">
        <div className="card-music-thumb">
          <img src={ music.artworkUrl100 } alt="Thumbnail do albúm" />
        </div>
        <div className="card-music-trackName">
          <p>{ music.trackName }</p>
        </div>
        <div className="card-music-player">
          {
            music.previewUrl && (
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
              </audio>
            )
          }
        </div>
      </div>
    );
  }
}

// MusicCard.DefaultProps = {
//   music: PropTypes.shape({
//     previewUrl: undefined,
//   }),
// };

MusicCard.propTypes = {
  music: PropTypes.shape({
    wrapperType: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
