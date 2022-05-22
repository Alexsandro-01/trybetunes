import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      profile: {},
    };
  }

  componentDidMount() {
    this.findUser();
  }

  findUser = () => {
    this.setState({
      loading: true,
    }, async () => {
      this.setState({
        loading: false,
        profile: await getUser(),
      });
    });
  }

  render() {
    const { profile, loading } = this.state;
    return (
      <div data-testid="page-profile" className="container">
        <Header />
        {
          loading ? <Loading /> : (
            <section className="content profile-page">
              <div className="name-user">
                <p><strong>Nome:</strong></p>
                <p>{profile.name}</p>
              </div>
              <div className="email-user">
                <p><strong>Email:</strong></p>
                <p>{profile.email}</p>
              </div>
              <div className="description-user">
                <p><strong>Descrição:</strong></p>
                <p>{profile.description}</p>
              </div>
              <div className="edit-user">
                <button type="button">
                  <Link to="/profile/edit">
                    Editar perfil
                  </Link>
                </button>
              </div>
            </section>
          )
        }
      </div>
    );
  }
}

export default Profile;
