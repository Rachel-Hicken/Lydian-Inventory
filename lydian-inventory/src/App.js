import React, { Component } from 'react';
import './reset.css';
import { HashRouter } from 'react-router-dom';
import routes from './routes';


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          {routes}
        </HashRouter>
      </div>
    );
  }
}

export default App;