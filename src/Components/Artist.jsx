import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/artist.css';

class Artist extends Component {
  render() {
    const { album: {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } } = this.props;
    return (
      <section className="artist-card-container">
        <div className="card-artist">
          <img src={ artworkUrl100 } alt={ artistName } />
          <h5>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              {collectionName}
            </Link>
          </h5>
          <p id="artist-name">{artistName}</p>
        </div>
      </section>
    );
  }
}
Artist.defaultProps = {
  album: {},
};

Artist.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }),
};

export default Artist;
