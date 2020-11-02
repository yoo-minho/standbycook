import React from "react";
import "../LoginPage/LoginPage.css";
import "../Comm/Comm.css";
import SignUp from './Sections/SignUp'
import SignIn from './Sections/SignIn'
import LoginStore from '../Store/LoginStore'

const LoginPage = () => {

  return (
    <div className="login-back">
      <div className="login-layout">
        <LoginStore>
            <SignIn />
            <SignUp />
        </LoginStore>       
      </div>
    </div>
  );
};

export default LoginPage;
