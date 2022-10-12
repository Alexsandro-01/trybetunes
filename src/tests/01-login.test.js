import React from 'react';
import { screen,waitFor,waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1 - Testa a tela de login', () => {
  it('Verifica se a rota "/" renderiza a tela de login', () => {
    renderWithRouter(<App />);
    const pageLogin = screen.getByTestId('page-login');

    expect(pageLogin).toBeDefined();
  });

  it('Verifica se a tela de login possui um input e um botão para entrar', () => {
    renderWithRouter(<App />);
    const inputText = screen.getByTestId('login-name-input');

    expect(inputText).toBeDefined();

    const btnLogin = screen.getByTestId('login-submit-button');

    expect(btnLogin).toBeDefined();
  });

  it('Verifica se o Botão começa desabilitado e se fica habilitado quando o campo de input é preenchido com pelo menos 3 caracters', () => {
    renderWithRouter(<App />);
    
    const btnLogin = screen.getByTestId('login-submit-button');
    expect(btnLogin).toBeDisabled();

    const inputText = screen.getByTestId('login-name-input');
    userEvent.type(inputText, 'Sa');
    expect(inputText).toHaveValue('Sa');

    expect(btnLogin).toBeDisabled();

    userEvent.type(inputText, 'm');
    expect(inputText).toHaveValue('Sam');

    expect(btnLogin).toBeEnabled();
  });

  it('Verifica se ao cliclar no botão a rota muda para "/search"', async () => {
    const { history } = renderWithRouter(<App />);

    const inputText = screen.getByTestId('login-name-input');
    const btnLogin = screen.getByTestId('login-submit-button');

    userEvent.type(inputText, 'Sam');
    userEvent.click(btnLogin);

    const loadin = screen.getByTestId('loadin');
    expect(loadin).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('loadin'), { timeout: 3500 });

    const { location } = history;
    // expect(loadin).not.toBeInTheDocument();
    await waitFor(() => expect(location.pathname).toBe('/search'), { timeout: 500} );
  })
})