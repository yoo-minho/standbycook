const RecipeEditHelper = (() => {

  return {
    init,
    getInputElByName,
  };

  function init(targetEl) {
    getInputElByName(targetEl, "all_chk").checked = false;
    getInputElByName(targetEl, "agrmt_chk").checked = false;
    getInputElByName(targetEl, "private_chk").checked = false;
  }

  function getInputElByName(targetEl, name) {
    return targetEl.querySelectorAll("[name=" + name + "]")[0];
  }

})();

export default RecipeEditHelper;
