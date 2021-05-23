import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { signInWithGoogle } from '../../firebase';
import { storeToken, storeUserData } from '../../utils/authService';
import RoutePaths from '../../utils/RoutePaths';
import GoogleImg from '../../assets/images/google-logo.svg';

import './login.scss';
import logLoginEvent from '../../utils/logEvents';

class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  login = async () => {
    const { user, credential } = await signInWithGoogle();
    const { history } = this.props;
    logLoginEvent(user.uid);
    storeUserData(user);
    storeToken(credential);
    history.push(RoutePaths.home);
  };

  render() {
    return (
      <div className="login-main-div">
        <div className="title-div">Get Mega</div>
        <div className="login-card">
          <div className="account-text">Login into your account</div>
          <button type="button" onClick={this.login} className="google-auth-button">
            <div className="button-text">
              <img src={GoogleImg} alt="g" className="google-img" />
              <span>Sign in with Google</span>
            </div>
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
