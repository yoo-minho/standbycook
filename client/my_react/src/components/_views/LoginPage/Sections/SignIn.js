import React, { useContext } from "react";
import { message} from 'antd';
import { LoginContext } from "../../Store/LoginStore.js";
import "./SignIn.css";
import axios from 'axios';

function SignIn() {
  const { SignUpVisible, setSignUpVisible } = useContext(LoginContext);

  const showSignUpPage = () => setSignUpVisible(true);

  const clickSignIn = (event) => {
    event.preventDefault();

    const f_id = event.target.f_id.value;
    const f_pwd = event.target.password.value;

    if (f_id === "" || f_pwd === "") {
      message.warning("빈 값이 존재합니다. 내용을 입력해주세요!");
      if (f_id === "") {
        event.target.f_id.focus();
      } else if (f_pwd === "") {
        event.target.password.focus();
      } 
      return;
    }

    signIn({
      id: f_id,
      password: f_pwd,
    });
  };

  const signIn = (signUpData) => {
    axios.post("/api/recipe/signIn", signUpData).then((response) => {
      if (response.data.success) {
        message.success("회원가입이 완료되었습니다!");
      } else {
        message.error("회원가입이 정상처리 되지 않았습니다!");
      }
    });
  };

  return (
    <div className="signin-section">
      <form id="signin-form" name="frmAgree" onSubmit={clickSignIn}>
        <div className="inp_initialization">
          <input type="text" name="f_id" placeholder="아이디를 입력해주세요" />
          <button type="button" className="btn_initialization">
            텍스트 삭제
          </button>
        </div>
        <div className="inp_initialization">
          <input
            type="password"
            name="password"
            required="required"
            msgr="비밀번호를 입력해주세요"
            placeholder="비밀번호를 입력해주세요"
            autoComplete="on"
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
        <div className="btn_type2 btn_member" onClick={showSignUpPage}>
          <span className="txt_type">회원가입</span>
        </div>
        <div className="login_search">
          <a href="/m2/mem/find_id.php" className="link">
            아이디 찾기
          </a>
          <span className="bar"></span>
          <a href="/m2/mem/find_pwd.php" className="link">
            비밀번호 찾기
          </a>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
