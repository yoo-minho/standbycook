import React, { useContext, useEffect, useRef, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { LoginContext } from "../../Store/LoginStore.js";
import SignHelper from "./SignHelper";
import "./SignIn.css";

function SignIn(props) {
  console.log("SignIn.js");

  const { SignId, SignUpVisible, setSignUpVisible } = useContext(LoginContext);
  const idInput = useRef();
  const passwordInput = useRef();

  useEffect(() => {
    idInput.current.value = SignId;
    if("" === idInput.current.value.trim()){
      idInput.current.focus();
    } else {
      passwordInput.current.focus();
    }
  }, [SignUpVisible])

  const clickSignIn = useCallback((event) => {
    event.preventDefault();

    const f_id = idInput.current.value.trim();
    const f_pwd = passwordInput.current.value.trim();

    if (f_id.length == 0) {
      idInput.current.focus();
      return message.warning("아이디가 빈값입니다!");
    }

    if (f_pwd.length == 0) {
      passwordInput.current.focus();
      return message.warning("패스워드가 빈값입니다!");
    }

    if (!SignHelper.regJson.ID.test(f_id)) {
      idInput.current.focus();
      return message.warning("아이디는 6자 이상의 소문자영문, 숫자!");
    }

    if (!SignHelper.regJson.PASSWORD.test(f_pwd)) {
      passwordInput.current.focus();
      return message.warning("패스워드는 8자 이상의 대소문자영문, 숫자, 특수기호!");
    }

    const signInValues = { id: f_id, password: f_pwd };
    signIn(signInValues);
  },[]);

  const signIn = (signUpData) => {
    axios.post("/api/recipe/signIn", signUpData).then((response) => {
      if (response.data.loginSuccess) {
        props.history.push("/");
        message.success(response.data.loginMessage);
      } else {
        message.error(response.data.loginMessage);
      }
    });
  };

  return (
    <div className="signin-section">
      <form id="signin-form" name="frmAgree" onSubmit={clickSignIn}>
        <div className="inp_initialization">
          <input
            type="text"
            name="f_id"
            maxLength="30"
            placeholder="아이디를 입력해주세요"
            ref={idInput}
          />
          <button type="button" className="btn_initialization">
            텍스트 삭제
          </button>
        </div>
        <div className="inp_initialization">
          <input
            type="password"
            name="f_password"
            maxLength="30"
            placeholder="비밀번호를 입력해주세요"
            ref={passwordInput}
          />
          <button type="button" className="btn_initialization">
            텍스트 삭제
          </button>
        </div>
        <div className="checkbox_save">
          <label>
            <input type="checkbox" name="save_id" /> 자동로그인
          </label>
        </div>
        <button type="submit" className="btn_type1">
          <span className="txt_type">로그인</span>
        </button>
        <div
          className="btn_type2 btn_member"
          onClick={() => setSignUpVisible(true)}
        >
          <span className="txt_type">회원가입</span>
        </div>
      </form>
    </div>
  );
}

export default withRouter(SignIn);
