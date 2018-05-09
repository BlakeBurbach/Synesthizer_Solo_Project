import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import InterfacePage from './components/InterfacePage/InterfacePage';
import ListPage from './components/ListPage/ListPage';
import './styles/main.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})


const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
    <Header title="Synesthizer" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/interface"
          component={InterfacePage}
        />
        <Route
          path="/list"
          component={ListPage}
        />
        {/* OTHERWISE no path */}
        <Route
          render={() => <h1>404</h1>}
        />
      </Switch>
    </Router>
    </MuiThemeProvider>
  </div>
);

export default App;
