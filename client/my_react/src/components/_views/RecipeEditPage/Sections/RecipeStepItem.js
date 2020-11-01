import React, { useContext, useRef } from "react";
import { RecipeContext } from "../../Store/RecipeStore";
import { Form, Input } from "antd";
import RecipeStepItemTool from "./RecipeStepItemTool";
import RecipeStepItemDrop from "./RecipeStepItemDrop";

function RecipeStepItem(props) {
  console.log("RecipeStepItem");

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
          <Form.Item hidden name={["step_url", index]}>
            <Input />
          </Form.Item>
          <div
            className="title-image"
            style={{ display: field.title_url_yn === "Y" ? "block" : "none" }}
          >
            대표
          </div>
          <Form.Item hidden name={["step_title_yn", index]}>
            <Input value="N" />
          </Form.Item>
        </div>
        <RecipeStepItemDrop
          index={index}
          url={field.url}
          xref={recipeStepItemRef}
        />
        <Form.Item name={["step_title", index]} className="mgb10">
          <Input className="wd100 mgb10" placeholder="한줄설명" />
        </Form.Item>
        <Form.Item name={["step_description", index]} className="mgb10">
          <TextArea className="wd100" placeholder="상세설명" rows={4} />
        </Form.Item>
      </div>
    </div>
  );
}

export default RecipeStepItem;
