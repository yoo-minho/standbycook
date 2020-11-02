import React, { useContext } from "react";
import { LoginContext } from "../../Store/LoginStore.js";
import "./SignUp.css";

function SignUp() {
  const { SignUpVisible, setSignUpVisible } = useContext(LoginContext);

  const onBack = () => setSignUpVisible(false);

  return (
    <div
      className="signup-section"
      style={{ display: SignUpVisible ? "block" : "none" }}
    >
      <header id="header" class="header" style={{ top: "0px" }}>
        <h1 class="logo">
          <span class="tit">회원가입</span>
        </h1>
        <a class="link_back" role="button" onClick={onBack}>
          <span class="screen_out"></span>
        </a>
      </header>
      <div id="appStyle" class="user_form section_join">
        <form id="form" name="frmAgree">
          <div class="user_reg">
            <div class="join_cell field_id">
              <div class="tit">
                아이디
                <span class="ico">
                  *<span class="screen_out">필수항목</span>
                </span>
              </div>
              <div class="desc">
                <input
                  type="text"
                  name="m_id"
                  size="13"
                  maxlength="16"
                  required=""
                  placeholder="예 : marketkurly12"
                  label="아이디"
                />
                <button class="btn default">중복확인</button>
                <input type="hidden" name="id_chk" />
              </div>
              <p class="txt_guide" style={{ display: "none" }}>
                <span class="txt txt_case1">
                  6자 이상의 영문 혹은 영문과 숫자를 조합
                </span>
                <span class="txt txt_case2">아이디 중복확인</span>
              </p>
            </div>
            <div class="join_cell field_pw">
              <div class="tit">
                비밀번호
                <span class="ico">
                  *<span class="screen_out">필수항목</span>
                </span>
              </div>
              <div class="desc">
                <input
                  type="password"
                  name="password"
                  size="13"
                  maxlength="16"
                  placeholder="비밀번호를 입력해주세요"
                  label="비밀번호"
                />
                <p class="txt_guide" style={{ display: "none" }}>
                  <span class="txt txt_case1">10자 이상 입력</span>
                  <span class="txt txt_case2">
                    영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
                  </span>
                  <span class="txt txt_case3">
                    동일한 숫자 3개 이상 연속 사용 불가
                  </span>
                </p>
              </div>
            </div>
            <div class="join_cell field_repw">
              <div class="tit">
                비밀번호 확인
                <span class="ico">
                  *<span class="screen_out">필수항목</span>
                </span>
              </div>
              <div class="desc">
                <input
                  type="password"
                  name="password2"
                  size="13"
                  maxlength="16"
                  required=""
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  label="비밀번호 확인"
                  class="bad"
                />
                <p class="txt_guide" style={{ display: "none" }}>
                  <span class="txt txt_case1 bad">
                    동일한 비밀번호를 입력해주세요
                  </span>
                </p>
              </div>
            </div>
            <div class="join_cell">
              <div class="tit">
                닉네임
                <span class="ico">
                  *<span class="screen_out">필수항목</span>
                </span>
              </div>
              <div class="desc">
                <input
                  type="text"
                  name="name"
                  size="13"
                  maxlength="10"
                  required=""
                  placeholder="닉네임을 입력해주세요"
                  label="닉네임"
                />
              </div>
            </div>
          </div>
          <div class="user_reg reg_agree">
            <div class="join_cell checkbox_parent">
              <div class="tit">
                이용약관동의
                <span class="ico">
                  *<span class="screen_out">필수항목</span>
                </span>
              </div>
              <label class="label_block all_check">
                <input type="checkbox" name="agree_allcheck" />
                <span class="ico"></span>전체 동의합니다.
              </label>
              <p class="txt_agree">
                선택 항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를
                이용할 수 있습니다.
              </p>
              <div class="checkbox_child">
                <div class="checkbox_link">
                  <label class="label_block">
                    <input
                      type="checkbox"
                      value="y"
                      name="agrmt_chk"
                      required=""
                      label="이용약관"
                    />
                    <span class="ico"></span>이용약관 동의{" "}
                    <span class="extra">(필수)</span>
                  </label>
                  <a href="#agreement" class="link">
                    <span class="screen_out">약관보기</span>
                  </a>
                </div>
                <div class="checkbox_link">
                  <label class="label_block">
                    <input
                      type="checkbox"
                      value="y"
                      name="private_chk"
                      required=""
                      label="개인정보처리방침"
                    />
                    <span class="ico"></span>개인정보처리방침 동의{" "}
                    <span class="extra">(필수)</span>
                  </label>
                  <a href="#essential" class="link">
                    <span class="screen_out">약관보기</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="join_submit">
              <button
                type="button"
                class="btn active"
                onclick="formJoinSubmit();"
              >
                <span class="txt_type">가입하기</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
