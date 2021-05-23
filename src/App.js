import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import 'antd/dist/antd.css';
import AppRoutes, { PrivateRoute } from './AppRoutes';
import { getAccountName } from './utils/authService';

function App() {
  return (
    <div className="App">
      {/* re-renders the routes so that after login it will redirect to home */}
      <Fragment key={getAccountName()}>
        <Switch>
          {AppRoutes.map((route) => (route.isPrivate
            ? (
              <PrivateRoute
                key={route.path}
                {...route}
              />
            )
            : <Route key={route.path} {...route} />))}
        </Switch>
      </Fragment>
    </div>
  );
}

export default App;
