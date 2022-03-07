import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      termToSearch: '',
      disabled: true,
    };
  }

  checkTermToSearch = ({ target: { value } }) => {
    // if (value.length > 1) {
    //   this.setState({
    //   });
    // }
    this.setState({
      disabled: value.length < 2,
      termToSearch: value,
    });
  }

  render() {
    const { termToSearch, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
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
            >
              Pesquisar
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
