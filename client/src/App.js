import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import ProtectedRoute from './utils/protectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={() => <Redirect to="/login" />} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
