import React, { Component } from 'react';
import Artist from '../Components/Artist';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      termToSearch: '',
      lastTermSearched: '',
      albumsOfTheArtist: [],
      disabled: true,
      loading: false,
      search: false,
    };
  }

  checkTermToSearch = ({ target: { value } }) => {
    this.setState({
      disabled: value.length < 2,
      termToSearch: value,
      lastTermSearched: value,
    });
  }

  albums = (term) => {
    this.setState({
      loading: true,
      termToSearch: '',
    }, async () => {
      const albumsReceived = await searchAlbumsAPI(term);
      this.setState({
        albumsOfTheArtist: albumsReceived,
        disabled: true,
        loading: false,
        search: true,
      });
    });
    // console.log(albumsReceived);
  }

  render() {
    const {
      termToSearch,
      disabled,
      loading,
      search,
      albumsOfTheArtist,
      lastTermSearched,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
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
                  />
                  <button
                    type="button"
                    disabled={ disabled }
                    data-testid="search-artist-button"
                    onClick={ () => { this.albums(termToSearch); } }
                  >
                    Pesquisar
                  </button>
                </div>
              )
          }
        </section>
        {
          search && albumsOfTheArtist.length > 0 && (
            <section>
              <p>
                {`Resultado de álbuns de: ${lastTermSearched}`}
              </p>
              {
                albumsOfTheArtist
                  .map((value) => <Artist key={ value.collectionId } album={ value } />)
              }
            </section>
          )
        }
        {
          search && albumsOfTheArtist.length === 0 && <p>Nenhum álbum foi encontrado</p>
        }
      </div>
    );
  }
}

export default Search;
