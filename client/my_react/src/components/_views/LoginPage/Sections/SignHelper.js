const SignHelper = (() => {

  const regJson = {
    ID: /^[a-z0-9@.+]{6,30}$/,
    PASSWORD: /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,30}$/,
    NICK: /^[ㄱ-ㅎ가-힣A-Za-z0-9+]{3,30}$/,
  };

  return {
    regJson,
    getInputElByName,
    getGuideEl,
    isEmptyInput,
    isRegInput,
    isDisagree,
    initSignUp,
    updateGuideCase,
  };

  function initSignUp(targetEl) {
    getInputElByName(targetEl, "all_chk").checked = false;
    getInputElByName(targetEl, "agrmt_chk").checked = false;
    getInputElByName(targetEl, "private_chk").checked = false;
  }

  function getGuideEl(targetInputEl, index){
    const txtGuideEl = targetInputEl.parentNode.nextElementSibling;
    return txtGuideEl.querySelectorAll(".txt_case"+index)[0];
  }

  function getInputElByName(targetEl, name) {
    return targetEl.querySelectorAll("[name=" + name + "]")[0];
  }

  function getCellElByClassName(targetEl, className) {
    return targetEl.querySelectorAll(".join_cell.field_" + className)[0];
  }

  function getCellInputElByClassName(targetEl, className) {
    return targetEl.querySelectorAll(
      ".join_cell.field_" + className + " input"
    )[0];
  }

  function isMustCellElByClassName(targetEl, className) {
    return (
      getCellElByClassName(targetEl, className).querySelectorAll(".screen_out")
        .length > 0
    );
  }

  function isRegByCellTxtGuide(targetEl, className) {
    return (
      getCellElByClassName(targetEl, className).querySelectorAll(".txt.bad")
        .length > 0
    );
  }

  function isEmptyInput(targetEl, inputKeyArray) {
    var isResult = false;
    inputKeyArray.forEach((key) => {
      const inputEl = getCellInputElByClassName(targetEl, key);
      if (
        isMustCellElByClassName(targetEl, key) &&
        inputEl.value.trim() === "" &&
        !isResult
      ) {
        isResult = true;
        inputEl.focus();
      }
    });
    return isResult;
  }

  function isRegInput(targetEl, inputKeyArray) {
    var isResult = false;
    inputKeyArray.forEach((key) => {
      const inputEl = getCellInputElByClassName(targetEl, key);
      if (
        isMustCellElByClassName(targetEl, key) &&
        isRegByCellTxtGuide(targetEl, key) &&
        !isResult
      ) {
        isResult = true;
        inputEl.focus();
      }
    });
    return isResult;
  }

  function isDisagree(targetEl) {
    return (
      !getInputElByName(targetEl, "agrmt_chk").checked ||
      !getInputElByName(targetEl, "private_chk").checked
    );
  }

  function updateGuideCase(targerEl, mode){
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
  };
})();

export default SignHelper;
