import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
// import { HashRouter } from 'react-router-dom';
import store from '../store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>
    ),
    history,
  };
};

export default renderWithRouter;
