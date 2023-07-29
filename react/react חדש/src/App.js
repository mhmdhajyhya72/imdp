import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import * as routes from "./constants/routes";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import AccountPage from "./components/Account";
import LandingPage from "./components/Landing";
import withAuthentication from "./components/withAuthentication";
import CardPage from './components/CardPage';
import About_Us from './components/About_Us';
import Favorites from './components/Favorites';

const App = () => (
  <BrowserRouter>
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route exact path={routes.LANDING} component={SignInPage} />
      <Route exact path={routes.ABOUT_AS} component={About_Us} />
      <Route exact path={routes.FAVORITES} component={Favorites} />
      <Route exact path={routes.HOME} component={LandingPage} />
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={routes.CARD} component={CardPage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
  </BrowserRouter>
);

export default withAuthentication(App);
