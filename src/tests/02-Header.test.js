import React from 'react';
import { getByTestId, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Loading from '../pages/Loading';

describe('2 - Testa se existe um Header nas páginas esperadas', () => {
  it('Verifica se há um header ná página de /search', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/search');

    const header = screen.getByTestId("header-component");
    expect(header).toBeInTheDocument();

  });

  it('Verifica se há um header ná página de /favorites', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');

    const header = screen.getByTestId("header-component");
    expect(header).toBeInTheDocument();

  });

  it('Verifica se há um header ná página de /album/:id', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/album/123');

    const header = screen.getByTestId("header-component");
    expect(header).toBeInTheDocument();

  });

  it('Verifica se há um header ná página de /profile', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const header = screen.getByTestId("header-component");
    expect(header).toBeInTheDocument();

  });

  it('Verifica se há um header ná página de /profile/edit', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile/edit');

    const header = screen.getByTestId("header-component");
    expect(header).toBeInTheDocument();

  });

  it('Verifica se o nome da pessoa usuária está presente na tela', async () => {
    const { history } = renderWithRouter(<App />);
    
    const inputText = screen.getByTestId('login-name-input');
    const btnLogin = screen.getByTestId('login-submit-button');
    
    userEvent.type(inputText, 'Sam');
    userEvent.click(btnLogin);
    
    const loadin = screen.getByTestId('loadin');
    expect(loadin).toBeInTheDocument();
    
    await waitForElementToBeRemoved(() => screen.getByTestId('loadin'), { timeout: 3500 });
    
    const { location } = history;
    await waitFor(() => expect(location.pathname).toBe('/search'), { timeout: 500 });

    const userName = screen.getByText('Sam');

    expect(userName).toBeInTheDocument();
  });


});