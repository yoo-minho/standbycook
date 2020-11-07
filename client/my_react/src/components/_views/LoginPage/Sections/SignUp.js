import React, { useContext } from "react";
import { LoginContext } from "../../Store/LoginStore.js";
import "./SignUp.css";

function SignUp() {
  const { SignUpVisible, setSignUpVisible } = useContext(LoginContext);

  const onBack = () => setSignUpVisible(false);
  const formJoinSubmit = () => {};

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
        <form id="signup-form" name="frmAgree">
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
                  name="m_id"
                  size="13"
                  maxLength="16"
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
                  maxLength="16"
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
                  maxLength="16"
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
                  name="name"
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
                <input type="checkbox" name="agree_allcheck" />
                <span className="ico"></span>전체 동의합니다.
              </label>
              <div className="checkbox_child">
                <div className="checkbox_link">
                  <label className="label_block">
                    <input
                      type="checkbox"
                      value="y"
                      name="agrmt_chk"
                      required=""
                      label="이용약관"
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
                      value="y"
                      name="private_chk"
                      required=""
                      label="개인정보처리방침"
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
              <button
                type="button"
                className="btn active"
                onClick={formJoinSubmit}
              >
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
