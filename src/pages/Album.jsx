import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumReceived: [],
      // albumReceivedTracks: [],
    };
  }

  componentDidMount() {
    this.receiveAlbum();
  }

  receiveAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const alb = await getMusics(id);
    this.setState({
      // albumReceivedTracks: alb.filter((music) => music.wrapperType === 'track'),
      albumReceived: alb,
    });
  }

  render() {
    // const { match: { params: { id } } } = this.props;
    const { albumReceived } = this.state;
    // const albumTracks = albumReceived.filter((value) => value.wrapperType === 'track');
    console.log(albumReceived);
    return (
      <div data-testid="page-album">
        <Header />
        {
          albumReceived.length > 0 && (
            <section>
              <div>
                <div className="img-album">
                  <img src={ albumReceived[0].artworkUrl100 } alt="" />
                </div>
                <div className="description-album">
                  <h3 data-testid="album-name">{albumReceived[0].collectionName}</h3>
                  <p data-testid="artist-name">{albumReceived[0].artistName}</p>
                </div>
              </div>
              <div>
                {
                  albumReceived
                    .map((music, index) => <MusicCard key={ index } music={ music } />)
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
