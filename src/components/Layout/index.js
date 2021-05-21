import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBar';

import './layout.scss';

class Layout extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  }

  render() {
    const { history, children } = this.props;
    return (
      <div className="layout-main">
        <SideBar history={history} />
        {children}
      </div>
    );
  }
}

export default Layout;
