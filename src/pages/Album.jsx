import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Album extends Component {
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        {
          id
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
