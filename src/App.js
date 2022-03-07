import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
// import Header from './Components/Header';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     logado: false,
  //   };
  // }

  // logarUser = () => {
  //   this.setState({
  //     logado: true,
  //   });
  // }

  render() {
    // const { logado } = this.state;
    return (
      <div>
        {
          // logado && <Header />
        }
        <main>
          <BrowserRouter>
            <Switch>
              <Route path="/profile/edit" component={ ProfileEdit } />
              <Route exact path="/profile" component={ Profile } />
              <Route path="/favorites" component={ Favorites } />
              <Route path="/album/:id" component={ Album } />
              <Route path="/search" component={ Search } />
              <Route
                exact
                path="/"
                render={ () => <Login /> }
              />
              <Route path="*" component={ NotFound } />
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    );
  }
}

export default App;
