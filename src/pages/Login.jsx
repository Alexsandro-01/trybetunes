import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/login.css';

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
    const MIN_CHARACTERS = 3;
    this.setState({
      disabled: value.length < MIN_CHARACTERS,
      userName: value,
    });
  }

  render() {
    const { disabled, userName, loading, redirect } = this.state;
    // const { logarUser } = this.props;
    return (
      <div>
        {
          loading ? <Loading /> : (
            <div data-testid="page-login" className="login-container">
              <h1>Login</h1>
              <div className="login-inputs">
                <div>
                  <input
                    type="text"
                    name="nameUser"
                    placeholder="Qual o seu nome?"
                    id="nameUser"
                    value={ userName }
                    onChange={ this.checkUserName }
                    data-testid="login-name-input"
                  />
                </div>
                <div>
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
                </div>
                {
                  redirect && <Redirect to="/search" />
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default Login;
