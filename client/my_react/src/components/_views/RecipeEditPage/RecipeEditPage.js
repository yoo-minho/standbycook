import React, { useContext, useEffect, useRef } from "react";
import { RecipeContext } from "../Store/RecipeStore.js";
import { Drawer, Button, message } from "antd";
import axios from "axios";
import Comm from "../Comm/Comm";
import RecipeSteps from "./Sections/RecipeSteps";
import Grocerys from "./Sections/Grocerys";
import Infos from "./Sections/Infos";
import "./RecipeEditPage.css";
import RecipeEditHelper from "./Sections/RecipeEditHelper"

function RecipeEditPage() {
  console.log("RecipeEditPage");

  const {
    EditPageVisible,
    setEditPageVisible,
    RecipeList,
    setRecipeList,
    setRecipeListVisible,
    setCartListVisible,
    setCookListVisible,
    setCurrentPageInRecipeStep,
    setTotalPageInRecipeStep,
    DetailPageVisible,
    RecipeDetailRecipeSrno,
    RecipeDetailData,
    setRecipeDetailData,
    RecipeFields,
    RecipeTitleImageYnFields,
    GroceryList,
  } = useContext(RecipeContext);

  const editRecipeForm = useRef();

  console.log(RecipeFields);

  console.log('vvvvv', 'RecipeEditPage');

  useEffect(() => {
    
    editRecipeForm.current &&
    RecipeEditHelper.getInputElByName(
      editRecipeForm.current,
      "infos-title"
    ).focus();
    console.log("vvvvv", "RecipeEditPage useEffect", editRecipeForm.current);
    
    if (DetailPageVisible) {
      //pass
    } else {
      //초기화
    }
  }, [EditPageVisible, editRecipeForm.current]);

  const closeDrawer = () => {
    setEditPageVisible(false);
    setCurrentPageInRecipeStep(1);
    if (RecipeDetailData.steps && RecipeDetailData.steps.length) {
      setTotalPageInRecipeStep(RecipeDetailData.steps.length);
    }
  };

  const onSubmit = (values) => {
    console.log(values);

    const groceryArray = getGroceryArray(values);
    const stepArray = getStepArray(values);

    if (groceryArray.empty && groceryArray.empty.length > 0) {
      //groceryArray.empty[0]
      return message.warning("식재료 수량 빈값이 존재합니다!");
    }

    let recipeData = {
      user_id: "dellose",
      recipe_srno: Number(RecipeDetailData.recipe_srno),
      title: Comm.coalesce(values.title),
      description: Comm.coalesce(values.description),
      min: Comm.coalesce(values.min),
      serving: Comm.coalesce(values.serving),
      grocerys: groceryArray.list,
      steps: stepArray,
    };

    if (DetailPageVisible) {
      updateRecipe(recipeData);
    } else {
      addRecipe(recipeData);
    }
  };

  const updateRecipe = (tempRecipeData) => {
    console.log(tempRecipeData);
    axios.post("/api/recipe/updateRecipe", tempRecipeData).then(() => {
      closeDrawer();
      setRecipeList(
        RecipeList.map((recipe) => {
          if (recipe.recipe_srno == RecipeDetailRecipeSrno) {
            recipe.title = tempRecipeData.title;
          }
          return recipe;
        })
      );
      setRecipeDetailData(tempRecipeData);
      message.success("레시피가 수정되었습니다.");
    });
  };

  const addRecipe = (tempRecipeData) => {
    axios.post("/api/recipe/addRecipe", tempRecipeData).then((response) => {
      closeDrawer();
      tempRecipeData.recipe_srno = response.data.recipe_srno;
      setRecipeList([...[tempRecipeData], ...RecipeList]);
      setRecipeListVisible(true);
      setCartListVisible(false);
      setCookListVisible(false);
      document
        .querySelectorAll(".tab-item")
        .forEach((el) => el.classList.remove("on"));
      document.querySelectorAll(".tab-item.recipe")[0].classList.add("on");
      message.success("레시피가 추가되었습니다.");
    });
  };

  const getGroceryArray = (originValues) => {
    const groceryArray = [];
    const emptyGroceryArray = [];
    if (originValues.grocery_srno) {
      const groceryCount = originValues.grocery_srno.length;
      for (let i = 0; i < groceryCount; i++) {
        const groceryInfo = Comm.coalesce(
          GroceryList.filter((grocery) => {
            if (grocery.grocery_srno == originValues.grocery_srno[i])
              return grocery;
          })[0]
        );
        const grocertAmount = Comm.coalesce(originValues.grocery_amount[i]);
        if ("" !== grocertAmount) {
          groceryArray.push({
            srno: Comm.coalesce(originValues.grocery_srno[i]),
            amount: Comm.coalesce(originValues.grocery_amount[i]),
            name: groceryInfo.grocery_name,
            unit: Comm.coalesce(groceryInfo.unit, "g"),
          });
        } else {
          emptyGroceryArray.push({
            srno: Comm.coalesce(originValues.grocery_srno[i]),
          });
        }
      }
    }
    return {
      list: groceryArray,
      empty: emptyGroceryArray,
    };
  };

  const getStepArray = (originValues) => {
    const tempArr = [];
    if (originValues.step_description) {
      const stepCount = originValues.step_description.length;
      for (let i = 0; i < stepCount; i++) {
        const tempJson = {
          url: Comm.coalesce(originValues.step_url[i]),
          title: Comm.coalesce(originValues.step_title[i]),
          description: Comm.coalesce(originValues.step_description[i]),
          title_url_yn: Comm.coalesce(originValues.step_title_yn[i]),
        };
        if (RecipeDetailData.steps && RecipeDetailData.steps[i]) {
          tempJson.srno = RecipeDetailData.steps[i].srno;
        }
        tempArr.push(tempJson);
      }
    }
    return tempArr;
  };

  return (
    <>
      <Drawer
        title={DetailPageVisible ? "레시피수정" : "레시피추가"}
        placement="right"
        width="100%"
        height="100%"
        closable={true}
        onClose={closeDrawer}
        visible={EditPageVisible}
      >
        <div className="drawer-form">
          <form name="recipe-add" ref={editRecipeForm} onSubmit={onSubmit}>
            <Infos />
            <Grocerys />
            <RecipeSteps />
            <div className="recipe-add-btn">
              <Button htmlType="submit" className="wd100">
                {DetailPageVisible ? "수정" : "추가"}
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </>
  );
}

export default RecipeEditPage;
