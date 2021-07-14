import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './configureClient';
import PrivateRoute from './utils/auth';
import Login from './screens/Login';
import CountriesData from './screens/Countries';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/currency-exchange" component={CountriesData} />
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </ApolloProvider>
  );
};

export default App;
