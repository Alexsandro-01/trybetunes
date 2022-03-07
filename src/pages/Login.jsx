import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      disabled: true,
      redirect: false,
      loading: false,
    };
  }

  checkUserName = ({ target: { value } }) => {
    if (value.length > 2) {
      this.setState({
        disabled: false,
      });
    }
    this.setState({
      userName: value,
    });
  }

  render() {
    const { disabled, userName, loading, redirect } = this.state;
    // const { logarUser } = this.props;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <div className="Login">
          <input
            type="text"
            name="nameUser"
            id="nameUser"
            value={ userName }
            onChange={ this.checkUserName }
            data-testid="login-name-input"
          />
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => {
              this.setState({
                loading: true,
              }, async () => {
                this.setState({
                  loading: false,
                  redirect: await createUser({ name: userName }) === 'OK',
                });
                // logarUser();
              });
            } }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
          {
            loading && <Loading />
          }
          {
            redirect && <Redirect to="/search" />
          }
        </div>
      </div>
    );
  }
}

export default Login;
