import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.recoverUser();
  }

  recoverUser = async () => {
    const user = await getUser();
    this.setState({
      user: await user.name,
      loading: false,
    });
    // console.log(await user.name);
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : (
            <span>
              Bem vindo(a) de volta
              <strong data-testid="header-user-name">{ user }</strong>
            </span>
          )
        }
        <ul>
          <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
          <li><Link data-testid="link-to-favorites" to="/favorites">Favorites</Link></li>
          <li><Link data-testid="link-to-profile" to="/profile">Profile</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;
