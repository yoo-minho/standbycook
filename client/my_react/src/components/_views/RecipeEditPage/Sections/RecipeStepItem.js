import React, { useContext, useRef } from "react";
import { RecipeContext } from "../../Store/RecipeStore";
import { Form, Input } from "antd";
import RecipeStepItemTool from "./RecipeStepItemTool";
import RecipeStepItemDrop from "./RecipeStepItemDrop";

function RecipeStepItem(props) {
  console.log("vvvvv", "RecipeStepItem");

  const field = props.field;
  const index = props.index;
  const recipeStepItemRef = useRef();

  const { TextArea } = Input;

  const { CurrentPageInRecipeStep } = useContext(RecipeContext);

  return (
    <div
      className="mgb10"
      step={index + 1}
      ref={recipeStepItemRef}
      style={{
        display: CurrentPageInRecipeStep === index + 1 ? "block" : "none",
      }}
    >
      <RecipeStepItemTool srno={field.srno} />
      <div>
        <div
          className="dropzone"
          style={{ display: field.url ? "block" : "none" }}
        >
          <img src={field.url} className="recipe-image" alt="photo" />
          <div hidden className="step_url" index={index}>
            <Input />
          </div>
          <div
            className="title-image"
            style={{ display: field.title_url_yn === "Y" ? "block" : "none" }}
          >
            대표
          </div>
          <div className="step_title_yn" index={index}>
            <Input value="N" />
          </div>
        </div>
        <RecipeStepItemDrop
          index={index}
          url={field.url}
          xref={recipeStepItemRef}
        />
        <div className="step_title mgb10" index={index}>
          <Input className="wd100 mgb10" placeholder="한줄설명" />
        </div>
        <div className="mgb10 step_description" index={index}>
          <TextArea className="wd100" placeholder="상세설명" rows={4} />
        </div>
      </div>
    </div>
  );
}

export default RecipeStepItem;
