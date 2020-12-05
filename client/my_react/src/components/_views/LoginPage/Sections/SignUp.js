import React, { useContext, useRef, useEffect, useCallback } from "react";
import { message } from "antd";
import { LoginContext } from "../../Store/LoginStore.js";
import "./SignUp.css";
import axios from "axios";
import SignHelper from "./SignHelper";

function SignUp() {
  console.log("SignUp.js");

  const inputKeyArray = ["ID", "PASSWORD", "PASSWORD2", "NICK"];
  const { SignUpVisible, setSignUpVisible, setSignId } = useContext(
    LoginContext
  );
  const signForm = useRef();
  const idInput = useRef();
  const passwordInput = useRef();
  const password2Input = useRef();
  const nickInput = useRef();

  const refJson = {
    ID: idInput,
    PASSWORD: passwordInput,
    PASSWORD2: password2Input,
    NICK: nickInput,
  };

  useEffect(() => {
    inputKeyArray.forEach((key) => changeInput(key, ""));
    SignHelper.initSignUp(signForm.current);
    idInput.current.focus();
  }, [SignUpVisible]);

  const clickSignUp = useCallback((event) => {
    event.preventDefault();

    const idOverlapGuideEl = SignHelper.getGuideEl(idInput.current, 2);
    const samePwdGuideEl = SignHelper.getGuideEl(password2Input.current, 1);
    const nickOverlapGuideEl = SignHelper.getGuideEl(nickInput.current, 2);

    if (SignHelper.isEmptyInput(signForm.current, inputKeyArray))
      return message.warning("빈값을 채워주세요!");
    if (!idOverlapGuideEl.classList.contains("good"))
      return message.warning("아이디 중복확인이 필요합니다!");
    if (!samePwdGuideEl.classList.contains("good"))
      return message.warning("동일한 비밀번호를 입력해주세요!");
    if (!nickOverlapGuideEl.classList.contains("good"))
      return message.warning("닉네임 중복확인이 필요합니다!");
    if (SignHelper.isRegInput(signForm.current, inputKeyArray))
      return message.warning("조건(글자수, 영문숫자조합 등)을 확인해주세요!");
    if (SignHelper.isDisagree(signForm.current))
      return message.warning("회원가입을 위해서 이용약관에 동의가 필요합니다!");

    const signUpValue = {
      id: event.target.f_id.value,
      name: event.target.f_name.value,
      password: event.target.password.value,
    };
    signUp(signUpValue);
  }, []);

  const showCheckDescription = useCallback(() => {
    message.warning("약관은 준비중입니다!");
  });

  const signUp = (signUpData) => {
    axios.post("/api/recipe/signUp", signUpData).then((response) => {
      if (response.data.success) {
        setSignId(response.data.qres.rows[0].id);
        setSignUpVisible(false);
        message.success("회원가입이 완료되었습니다!");
      } else {
        message.error("회원가입이 정상처리 되지 않았습니다!");
      }
    });
  };

  const checkEl = (key) =>
    SignHelper.getInputElByName(signForm.current, key + "_chk");

  const clickAllCheck = (event) => {
    checkEl("agrmt").checked = event.target.checked;
    checkEl("private").checked = event.target.checked;
  };

  const clickOneCheck = () => {
    const isAgrmtCheck = checkEl("agrmt").checked;
    const isPrivateCheck = checkEl("private").checked;
    checkEl("all").checked = isAgrmtCheck && isPrivateCheck;
  };

  const confirmOverlap = useCallback((event, key) => {
    event.preventDefault();

    const confirmEl = (key === "ID" ? idInput : nickInput).current;
    const apiKey = key === "ID" ? "isExistsId" : "isExistsNick";
    const inputValue = confirmEl.value.trim();
    const txtCase1El = SignHelper.getGuideEl(confirmEl, 1);
    const txtCase2El = SignHelper.getGuideEl(confirmEl, 2);

    if (inputValue === "") {
      confirmEl.focus();
      return message.warning("빈값을 채워주세요!");
    }

    if (txtCase1El.classList.contains("bad")) {
      confirmEl.focus();
      return message.warning("조건(글자수, 영문숫자조합 등)을 확인해주세요!");
    }

    axios
      .post("/api/recipe/" + apiKey, { value: inputValue })
      .then((response) => {
        const isExists = response.data.isExists;

        if (isExists) message.error("중복된 아이디가 존재합니다!");
        else message.success("중복된 아이디가 존재하지 않습니다!");

        SignHelper.updateGuideCase(txtCase2El, !isExists ? "GOOD" : "BAD");
        key === "ID" && passwordInput.current.focus();
      });
  },[]);

  const checkPassword = () =>
    ["PASSWORD", "PASSWORD2"].forEach((key) => changeInput(key));

  const changeInput = useCallback((changeKey, changeValue) => {
    const inputEl = refJson[changeKey].current;
    if (!inputEl) return;

    const txtGuideEl = inputEl.parentNode.nextElementSibling;
    if (changeValue != undefined) {
      inputEl.value = changeValue;
      changeValue == "" && txtGuideEl.classList.remove("on");
    } else {
      txtGuideEl.classList.add("on");
    }
    const inputValue = inputEl.value.trim();
    const txtCase1El = SignHelper.getGuideEl(inputEl, 1);
    const txtCase2El = SignHelper.getGuideEl(inputEl, 2);
    const isSamePassword =
      passwordInput.current.value === password2Input.current.value;

    if (inputValue.length == 0) {
      SignHelper.updateGuideCase(txtCase1El, "");
    } else {
      for (var key in SignHelper.regJson) {
        key === changeKey &&
          SignHelper.updateGuideCase(
            txtCase1El,
            SignHelper.regJson[key].test(inputValue) ? "GOOD" : "BAD"
          );
      }
    }

    if ("ID" === changeKey || "NICK" === changeKey) {
      SignHelper.updateGuideCase(txtCase2El);
    } else if ("PASSWORD2" == changeKey) {
      SignHelper.updateGuideCase(txtCase1El, isSamePassword ? "GOOD" : "BAD");
    } else {
      //pass
    }
  },[]);;

  return (
    <div
      className="signup-section"
      style={{ display: SignUpVisible ? "block" : "none" }}
    >
      <header id="header" className="header" style={{ top: "0px" }}>
        <h1 className="logo">
          <span className="tit">회원가입</span>
        </h1>
        <div
          className="link_back"
          role="button"
          onClick={() => setSignUpVisible(false)}
        >
          <span className="screen_out"></span>
        </div>
      </header>
      <div id="appStyle" className="user_form section_join">
        <form
          id="signup-form"
          name="frmAgree"
          ref={signForm}
          onSubmit={clickSignUp}
        >
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
                  maxLength="30"
                  placeholder="예 : dellose"
                  ref={idInput}
                  onChange={() => changeInput("ID")}
                />
                <button
                  className="btn default"
                  onClick={(e) => confirmOverlap(e, "ID")}
                >
                  중복확인
                </button>
              </div>
              <p className="txt_guide">
                <span className="txt txt_case1">
                  6자 이상의 소문자영문, 숫자를 조합
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
                  maxLength="30"
                  placeholder="비밀번호를 입력해주세요"
                  ref={passwordInput}
                  onChange={checkPassword}
                />
              </div>
              <p className="txt_guide">
                <span className="txt txt_case1">
                  8자 이상의 대소문자영문, 숫자, 특수기호를 조합
                </span>
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
                  maxLength="30"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  ref={password2Input}
                  onChange={checkPassword}
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
                  maxLength="10"
                  placeholder="닉네임을 입력해주세요"
                  ref={nickInput}
                  onChange={() => changeInput("NICK")}
                />
                <button
                  className="btn default"
                  onClick={(e) => confirmOverlap(e, "NICK")}
                >
                  중복확인
                </button>
              </div>
              <p className="txt_guide">
                <span className="txt txt_case1">
                  3자 이상의 한글, 영문, 숫자를 조합
                </span>
                <span className="txt txt_case2">닉네임 중복확인</span>
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
                  name="all_chk"
                  onClick={clickAllCheck}
                  style={{ display: "none" }}
                />
                <span className="ico"></span>전체 동의합니다.
              </label>
              <div className="checkbox_child">
                <div className="checkbox_link">
                  <label className="label_block">
                    <input
                      type="checkbox"
                      name="agrmt_chk"
                      onClick={clickOneCheck}
                    />
                    <span className="ico"></span>이용약관 동의{" "}
                    <span className="extra">(필수)</span>
                  </label>
                  <a className="link" onClick={showCheckDescription}>
                    <span className="screen_out">약관보기</span>
                  </a>
                </div>
                <div className="checkbox_link">
                  <label className="label_block">
                    <input
                      type="checkbox"
                      name="private_chk"
                      onClick={clickOneCheck}
                    />
                    <span className="ico"></span>개인정보처리방침 동의{" "}
                    <span className="extra">(필수)</span>
                  </label>
                  <a className="link" onClick={showCheckDescription}>
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
