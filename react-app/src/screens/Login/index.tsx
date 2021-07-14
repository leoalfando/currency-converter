import React from 'react';
import LoginForm from '../../components/LoginForm';
import { destroyToken } from '../../configureClient';
import './styles.scss';

const Login: React.SFC = (props: any) => {
  destroyToken();
  return (
    <div className="loginPage-mainContainer">
      <div className="loginPage-container">
        <h1 className="heading">Welcome to Currency Exchange(SEK)</h1>
        <LoginForm {...props} />
      </div>
    </div>
  );
};

export default Login;
