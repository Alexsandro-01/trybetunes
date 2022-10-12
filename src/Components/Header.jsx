import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../styles/header.css';

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
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <section>
          <div>
            <h1>
              Stream Tune
            </h1>
          </div>
          <div>
            {
              loading ? <Loading /> : (
                <span>
                  Olá,
                  {' '}
                  <strong data-testid="header-user-name">{ user }</strong>
                </span>
              )
            }
          </div>
        </section>
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
