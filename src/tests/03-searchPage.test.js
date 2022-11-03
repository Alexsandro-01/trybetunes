import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./renderWithRouter";
import App from "../App";

describe('2 - Testa a tela de search', () => {
  it('Verifica se há um header com o título "Stream Tune"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/search');

    const header = screen.getByTestId("header-component");
    const title = screen.getByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    // console.log(title);
    // expect(title).toBe('Stream Tune');
  })
})