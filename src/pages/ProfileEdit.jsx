import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/profile.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      disabled: true,
      redirect: false,
      name: '',
      email: '',
      description: '',
      validEmail: false,
    };
  }

  componentDidMount() {
    this.findUser();
    // this.checkDisabled();
  }

  checkDisabled = () => {
    const {
      name,
      email,
      description,
      validEmail,
    } = this.state;
    if (name !== ''
      && email !== ''
      && description !== ''
      && validEmail) {
      this.setState({
        disabled: false,
      });
    }
  }

  findUser = () => {
    this.setState({
      loading: true,
    }, async () => {
      const profile = await getUser();
      const re = /\S+@\S+\.\S+/;
      this.setState({
        loading: false,
        name: profile.name,
        email: profile.email,
        description: profile.description,
        validEmail: re.test(profile.email),
      });
      this.checkDisabled();
    });
  }

  editUser = () => {
    const {
      name,
      email,
      description,
    } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const ok = await updateUser({ name, email, description });
      this.setState({
        loading: false,
        redirect: ok === 'OK',
      });
    });
  }

  handleInputs = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    this.checkDisabled();
  }

  validateEmail = ({ target: { value } }) => {
    // Trecho de código baseado na solução encontrada nesse endereço:
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const re = /\S+@\S+\.\S+/;
    this.setState({
      validEmail: re.test(value),
    });
  }

  render() {
    const {
      loading,
      disabled,
      name,
      email,
      description,
      redirect,
    } = this.state;

    return (
      <div data-testid="page-profile-edit" className="container">
        <Header />
        {
          loading ? <Loading /> : (
            <section className="content profile-page">
              <div className="name-user">
                <p><strong>Nome:</strong></p>
                <input
                  data-testid="edit-input-name"
                  name="name"
                  type="text"
                  placeholder="Editar nome"
                  onChange={ (e) => { this.handleInputs(e); } }
                  value={ name }
                />
              </div>
              <div className="email-user">
                <p><strong>Email:</strong></p>
                <input
                  data-testid="edit-input-email"
                  name="email"
                  type="email"
                  placeholder="Editar email"
                  onChange={ (e) => { this.handleInputs(e); } }
                  onBlur={ (e) => { this.validateEmail(e); } }
                  value={ email }
                  id="email"
                />
              </div>
              <div className="description-user">
                <p><strong>Descrição:</strong></p>
                <input
                  data-testid="edit-input-description"
                  name="description"
                  type="text"
                  placeholder="Editar descrição"
                  onChange={ (e) => { this.handleInputs(e); } }
                  value={ description }
                />
              </div>
              <div className="edit-user">
                <button
                  data-testid="edit-button-save"
                  disabled={ disabled }
                  type="button"
                  onClick={ this.editUser }
                >
                  Salvar
                </button>
              </div>
              {
                redirect && <Redirect to="/profile" />
              }
            </section>
          )
        }
      </div>
    );
  }
}

export default ProfileEdit;
