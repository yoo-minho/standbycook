import React, { useContext, useRef, useEffect } from "react";
import { message } from "antd";
import { LoginContext } from "../../Store/LoginStore.js";
import "./SignUp.css";
import axios from "axios";

function SignUp() {
  console.log("SignUp.js");

  const { SignUpVisible, setSignUpVisible } = useContext(LoginContext);

  const signForm = useRef();
  const idInput = useRef();
  const passwordInput = useRef();
  const password2Input = useRef();
  const nickInput = useRef();

  const inputKeyArray = ["ID", "PASSWORD", "PASSWORD2", "NICK"];

  useEffect(() => {
    initSignUp();
  }, [SignUpVisible]);

  const initSignUp = () => {
    initInput(inputKeyArray)
    getInputElByName("agree_allcheck").checked = false;
    getInputElByName("agrmt_chk").checked = false;
    getInputElByName("private_chk").checked = false;
  };

  const getInputElByName = (name) => signForm.current.querySelectorAll('[name='+name+']')[0];
  const getCellElByClassName = (className) => signForm.current.querySelectorAll('.join_cell.field_'+className)[0];
  const getCellInputElByClassName = (className) => signForm.current.querySelectorAll('.join_cell.field_'+className+' input')[0];
  const isMustCellElByClassName = (className) => (getCellElByClassName(className).querySelectorAll('.screen_out').length > 0);
  const isLimitByCellTxtGuide = (className) => (getCellElByClassName(className).querySelectorAll('.txt.bad').length > 0);
  const isEmptyInput = (keyArray) =>
    keyArray.filter(
      (key) =>
        isMustCellElByClassName(key) &&
        getCellInputElByClassName(key).value.trim() === ""
    ).length > 0;
  const isLimitInput = (keyArray) =>
    keyArray.filter(
      (key) =>
        isMustCellElByClassName(key) &&
        isLimitByCellTxtGuide(key)
    ).length > 0;
  const isDisagree = () => (!getInputElByName("agrmt_chk").checked || !getInputElByName("private_chk").checked);

  const onBack = () => setSignUpVisible(false);

  const clickSignUp = (event) => {
    event.preventDefault();

    if(isEmptyInput(inputKeyArray)) return message.warning("빈값을 채워주세요!");
    if(isLimitInput(inputKeyArray)) return message.warning("조건을 만족해주세요!");
    if(isDisagree()) return message.warning("회원가입을 위해서 이용약관에 동의가 필요합니다!");

    signUp({
      id: event.target.f_id.value,
      name: event.target.f_name.value,
      password: event.target.password.value,
    });
  };

  const signUp = (signUpData) => {
    axios.post("/api/recipe/signUp", signUpData).then((response) => {
      if (response.data.success) {
        setSignUpVisible(false);
        message.success("회원가입이 완료되었습니다!");
      } else {
        message.error("회원가입이 정상처리 되지 않았습니다!");
      }
    });
  };

  const clickAllCheck = (event) => {
    getInputElByName("agrmt_chk").checked = event.target.checked;
    getInputElByName("private_chk").checked = event.target.checked;
  };

  const confirmId = (event) => {
    event.preventDefault();
    const txtGuideEl = idInput.current.parentNode.nextElementSibling;
    const txtCase2El = txtGuideEl.querySelectorAll(".txt_case2")[0];

    const inputIdValue = idInput.value;

    axios
      .post("/api/recipe/isExistsId", { id: inputIdValue })
      .then((response) => {
        if (response.data.isExistsId) {
          message.error("중복된 아이디가 존재합니다!");
          updateGuideCase(txtCase2El, "BAD");
        } else {
          message.success("중복된 아이디가 존재하지 않습니다!");
          updateGuideCase(txtCase2El, "GOOD");
        }
      });
  };

  const initInput = (keyArray) => keyArray.forEach((key) => changeInput(key, ""))

  const changeInput = (changeKey, changeValue) => {

    let inputEl = ("ID" === changeKey
      ? idInput
      : "PASSWORD" === changeKey
      ? passwordInput
      : "PASSWORD2" === changeKey
      ? password2Input
      : "NICK" === changeKey
      ? nickInput
      : ""
    ).current;

    if (!inputEl) return;

    const txtGuideEl = inputEl.parentNode.nextElementSibling;

    if (changeValue != undefined) {
      inputEl.value = changeValue;
      (changeValue == "") && txtGuideEl.classList.remove("on");
    } else {
      txtGuideEl.classList.add("on");
    }

    const inputValue = inputEl.value.trim();
    const txtCase1El = txtGuideEl.querySelectorAll(".txt_case1")[0];
    const txtCase2El = txtGuideEl.querySelectorAll(".txt_case2")[0];

    if ("ID" === changeKey) {
      updateGuideCaseByTextLimit(txtCase1El, 6);
      updateGuideCase(txtCase2El);
    } else if ("PASSWORD" == changeKey) {
      updateGuideCaseByTextLimit(txtCase1El, 10);
    } else if ("PASSWORD2" == changeKey) {
      updateGuideCaseByPasswordCompare();
    } else if ("NICK" == changeKey) {
      updateGuideCaseByTextLimit(txtCase1El, 3);
    } else {
      //pass
    }

    function updateGuideCaseByPasswordCompare() {
      if (passwordInput.current.value === password2Input.current.value) {
        updateGuideCase(txtCase1El, "GOOD");
      } else {
        updateGuideCase(txtCase1El, "BAD");
      }
    }

    function updateGuideCaseByTextLimit(targerEl, limitCount) {
      if (inputValue.length == 0) {
        updateGuideCase(targerEl);
      } else if (inputValue.length > limitCount) {
        updateGuideCase(targerEl, "GOOD");
      } else {
        updateGuideCase(targerEl, "BAD");
      }
    }
  };

  const updateGuideCase = (targerEl, mode) => {
    if (targerEl == null) return;
    if ("GOOD" === mode) {
      targerEl.classList.add("good");
      targerEl.classList.remove("bad");
    } else if ("BAD" === mode) {
      targerEl.classList.remove("good");
      targerEl.classList.add("bad");
    } else {
      targerEl.classList.remove("good");
      targerEl.classList.remove("bad");
    }
  }

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
        <form id="signup-form" name="frmAgree" ref={signForm} onSubmit={clickSignUp}>
          <div className="user_reg">
            <div className="join_cell field_ID">
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
                  placeholder="예 : dellose"
                  label="아이디"
                  ref={idInput}
                  onChange={() => changeInput("ID")}
                />
                <button className="btn default" onClick={confirmId}>
                  중복확인
                </button>
              </div>
              <p className="txt_guide">
                <span className="txt txt_case1">
                  6자 이상의 영문 혹은 영문과 숫자를 조합
                </span>
                <span className="txt txt_case2">아이디 중복확인</span>
              </p>
            </div>
            <div className="join_cell field_PASSWORD">
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
                  ref={passwordInput}
                  onChange={() => changeInput("PASSWORD")}
                />
              </div>
              <p className="txt_guide">
                <span className="txt txt_case1">10자 이상 입력</span>
              </p>
            </div>
            <div className="join_cell field_PASSWORD2">
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
                  ref={password2Input}
                  onChange={() => changeInput("PASSWORD2")}
                />
              </div>
              <p className="txt_guide">
                <span className="txt txt_case1 bad">
                  동일한 비밀번호를 입력해주세요
                </span>
              </p>
            </div>
            <div className="join_cell field_NICK">
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
                  ref={nickInput}
                  onChange={() => changeInput("NICK")}
                />
              </div>
              <p className="txt_guide">
                <span className="txt txt_case1">
                  3자 이상 입력
                </span>
              </p>
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
