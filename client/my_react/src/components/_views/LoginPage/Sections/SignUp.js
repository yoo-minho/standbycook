import React, { useContext, useRef } from "react";
import { message} from 'antd';
import { LoginContext } from "../../Store/LoginStore.js";
import "./SignUp.css";
import axios from 'axios';

function SignUp() {

  const { SignUpVisible, setSignUpVisible } = useContext(LoginContext);

  const agrmtChkInput = useRef();
  const privateChkInput = useRef();

  const onBack = () => setSignUpVisible(false);

  const clickSignUp = (event) => {

    event.preventDefault();

    const f_id = event.target.f_id.value;
    const f_pwd = event.target.password.value;
    const f_pwd2 = event.target.password2.value;
    const f_name = event.target.f_name.value;

    if(f_id === "" || f_pwd === "" || f_pwd2 === "" || f_name === ""){
      message.warning('빈 값이 존재합니다. 내용을 입력해주세요!');
      if(f_id === "") { event.target.f_id.focus(); } 
      else if(f_pwd === "") { event.target.password.focus(); }
      else if(f_pwd2 === "") { event.target.password2.focus(); }
      else if(f_name === "") { event.target.f_name.focus(); } 
      return;
    }

    if(f_pwd !== f_pwd2){
      message.warning('비밀번호가 다릅니다!');
      event.target.password2.focus();
      return;
    }

    if(!agrmtChkInput.current.checked || !privateChkInput.current.checked){
      message.warning('회원가입을 위해서 이용약관에 동의가 필요합니다!');
      return;
    }
    
    signUp({
      id: f_id,
      name: f_name,
      password: f_pwd,
    });

  };

  const signUp = (signUpData) => {
    axios.post("/api/recipe/signUp",signUpData).then((response) => {
      if(response.data.success){
        setSignUpVisible(false);
        message.success('회원가입이 완료되었습니다!');
      } else {
        message.error('회원가입이 정상처리 되지 않았습니다!');
      }
    });
  };

  const clickAllCheck = (event) => {
    const b_allCheck = event.target.checked;
    agrmtChkInput.current.checked = b_allCheck;
    privateChkInput.current.checked = b_allCheck;
  };

  return (
    <div
      className="signup-section"
      style={{ display: SignUpVisible ? "block" : "none" }}
    >
      <header id="header" className="header" style={{ top: "0px" }}>
        <h1 className="logo">
          <span className="tit">회원가입</span>
        </h1>
        <div className="link_back" role="button" onClick={onBack}>
          <span className="screen_out"></span>
        </div>
      </header>
      <div id="appStyle" className="user_form section_join">
        <form id="signup-form" name="frmAgree" onSubmit={clickSignUp}>
          <div className="user_reg">
            <div className="join_cell field_id">
              <div className="tit">
                아이디
                <span className="ico">
                  *<span className="screen_out">필수항목</span>
                </span>
              </div>
              <div className="desc">
                <input
                  type="text"
                  name="f_id"
                  size="13"
                  maxLength="50"
                  required=""
                  placeholder="예 : marketkurly12"
                  label="아이디"
                />
                <button className="btn default">중복확인</button>
                <input type="hidden" name="id_chk" />
              </div>
              <p className="txt_guide" style={{ display: "none" }}>
                <span className="txt txt_case1">
                  6자 이상의 영문 혹은 영문과 숫자를 조합
                </span>
                <span className="txt txt_case2">아이디 중복확인</span>
              </p>
            </div>
            <div className="join_cell field_pw">
              <div className="tit">
                비밀번호
                <span className="ico">
                  *<span className="screen_out">필수항목</span>
                </span>
              </div>
              <div className="desc">
                <input
                  type="password"
                  name="password"
                  size="13"
                  maxLength="30"
                  placeholder="비밀번호를 입력해주세요"
                  label="비밀번호"
                  autoComplete="on"
                />
                <p className="txt_guide" style={{ display: "none" }}>
                  <span className="txt txt_case1">10자 이상 입력</span>
                  <span className="txt txt_case2">
                    영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
                  </span>
                  <span className="txt txt_case3">
                    동일한 숫자 3개 이상 연속 사용 불가
                  </span>
                </p>
              </div>
            </div>
            <div className="join_cell field_repw">
              <div className="tit">
                비밀번호 확인
                <span className="ico">
                  *<span className="screen_out">필수항목</span>
                </span>
              </div>
              <div className="desc">
                <input
                  type="password"
                  name="password2"
                  size="13"
                  maxLength="30"
                  required=""
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  label="비밀번호 확인"
                  className="bad"
                  autoComplete="on"
                />
                <p className="txt_guide" style={{ display: "none" }}>
                  <span className="txt txt_case1 bad">
                    동일한 비밀번호를 입력해주세요
                  </span>
                </p>
              </div>
            </div>
            <div className="join_cell">
              <div className="tit">
                닉네임
                <span className="ico">
                  *<span className="screen_out">필수항목</span>
                </span>
              </div>
              <div className="desc">
                <input
                  type="text"
                  name="f_name"
                  size="13"
                  maxLength="10"
                  required=""
                  placeholder="닉네임을 입력해주세요"
                  label="닉네임"
                />
              </div>
            </div>
          </div>
          <div className="user_reg reg_agree">
            <div className="join_cell checkbox_parent">
              <div className="tit">
                이용약관동의
                <span className="ico">
                  *<span className="screen_out">필수항목</span>
                </span>
              </div>
              <label className="label_block all_check">
                <input
                  type="checkbox"
                  name="agree_allcheck"
                  onClick={clickAllCheck}
                />
                <span className="ico"></span>전체 동의합니다.
              </label>
              <div className="checkbox_child">
                <div className="checkbox_link">
                  <label className="label_block">
                    <input
                      type="checkbox"
                      name="agrmt_chk"
                      ref={agrmtChkInput}
                    />
                    <span className="ico"></span>이용약관 동의{" "}
                    <span className="extra">(필수)</span>
                  </label>
                  <a href="#agreement" className="link">
                    <span className="screen_out">약관보기</span>
                  </a>
                </div>
                <div className="checkbox_link">
                  <label className="label_block">
                    <input
                      type="checkbox"
                      name="private_chk"
                      ref={privateChkInput}
                    />
                    <span className="ico"></span>개인정보처리방침 동의{" "}
                    <span className="extra">(필수)</span>
                  </label>
                  <a href="#essential" className="link">
                    <span className="screen_out">약관보기</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="join_submit">
              <button className="btn active">
                <span className="txt_type">가입하기</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
