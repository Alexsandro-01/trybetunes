import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Artist from '../Components/Artist';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../styles/search.css';
import { addAlbuns } from '../slices';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      termToSearch: '',
      lastTermSearched: '',
      disabled: true,
      loading: false,
      search: false,
    };
  }

  checkTermToSearch = ({ target: { value } }) => {
    this.setState({
      disabled: value.length < 2,
      termToSearch: value,
    });
  }

  albums = (term) => {
    const { addToRTK } = this.props;

    this.setState({
      loading: true,
      termToSearch: '',
    }, async () => {
      const albumsReceived = await searchAlbumsAPI(term);
      addToRTK(albumsReceived);
      this.setState({
        disabled: true,
        loading: false,
        search: true,
        lastTermSearched: term,
      });
    });
  }

  render() {
    const {
      termToSearch,
      disabled,
      loading,
      search,
      lastTermSearched,
    } = this.state;

    const { data } = this.props;
    return (
      <div data-testid="page-search" className="container">
        <Header />
        <section className="search-container-inputs">
          {
            loading ? <Loading />
              : (
                <div className="search-input-container">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={ termToSearch }
                    onChange={ this.checkTermToSearch }
                    data-testid="search-artist-input"
                    placeholder="Busque um artista"
                  />
                  <button
                    type="button"
                    disabled={ disabled }
                    data-testid="search-artist-button"
                    onClick={ () => { this.albums(termToSearch); } }
                  >
                    Find
                  </button>
                </div>
              )
          }
        </section>
        {
          data.albums.length > 0 && (
            <section className="search-result-container content">
              <p className="page-description">
                { `Resultado de álbuns de: ${lastTermSearched}` }
              </p>
              <div className="albuns-result">
                {
                  data.albums
                    .map((value) => <Artist key={ value.collectionId } album={ value } />)
                }
              </div>
            </section>
          )
        }
        {
          search && data.albums.length === 0 && (
            <p className="page-description">Nenhum álbum foi encontrado</p>
          )
        }
      </div>
    );
  }
}

Search.propTypes = {
  addToRTK: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  addToRTK: (value) => dispatch(addAlbuns(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
