import React, { useContext } from "react";
import { LoginContext } from "../../Store/LoginStore.js";
import "./SignIn.css";

function SignIn() {
  const { SignUpVisible, setSignUpVisible } = useContext(LoginContext);

  const showSignUpPage = () => setSignUpVisible(true);

  return (
    <div
      className="signin-section"
      style={{ display: SignUpVisible ? "none" : "block" }}
    >
      <form id="form" name="frmAgree">
        <div class="inp_initialization">
          <input
            type="text"
            name="m_id"
            value=""
            placeholder="아이디를 입력해주세요"
          />
          <button type="button" class="btn_initialization">
            텍스트 삭제
          </button>
        </div>
        <div class="inp_initialization">
          <input
            type="password"
            name="password"
            required="required"
            msgr="비밀번호를 입력해주세요"
            placeholder="비밀번호를 입력해주세요"
            value=""
          />
          <button type="button" class="btn_initialization">
            텍스트 삭제
          </button>
        </div>
        <div class="checkbox_save">
          <label>
            <input type='checkbox'/>
            <input type="checkbox" name="save_id"/>{" "}
            아이디 저장
          </label>
        </div>
        <button type="submit" class="btn_type1">
          <span class="txt_type">로그인</span>
        </button>
        <div class="btn_type2 btn_member" onClick={showSignUpPage}>
          <span class="txt_type">회원가입</span>
        </div>
        <div class="login_search">
          <a href="/m2/mem/find_id.php" class="link">
            아이디 찾기
          </a>
          <span class="bar"></span>
          <a href="/m2/mem/find_pwd.php" class="link">
            비밀번호 찾기
          </a>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
