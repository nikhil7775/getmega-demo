import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getAccountName, logout } from '../../utils/authService';
import RoutePaths from '../../utils/RoutePaths';

class SideBar extends PureComponent {
    static propTypes = {
      history: PropTypes.object.isRequired,
    }

    logout = () => {
      const { history } = this.props;
      logout();
      history.push(RoutePaths.login);
    }

    render() {
      return (
        <div className="side-bar-main">
          <div className="account-name">{getAccountName()}</div>
          <div className="logout-button" role="presentation" onClick={this.logout}>Logout</div>
        </div>
      );
    }
}

export default SideBar;
