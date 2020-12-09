import React, { useContext, useRef } from "react";
import { RecipeContext } from "../../Store/RecipeStore";
import { Typography, Button, Row, Col, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import RecipeStepItem from "./RecipeStepItem";

function RecipeSteps() {
  console.log("vvvvv", "RecipeSteps");

  const {
    CurrentPageInRecipeStep,
    setCurrentPageInRecipeStep,
    TotalPageInRecipeStep,
    setTotalPageInRecipeStep,
    RecipeStepConfirmVisible,
    setRecipeStepConfirmVisible,
    RecipeStepInputList,
    setRecipeStepInputList,
    setRecipeTitleImageYnFields,
  } = useContext(RecipeContext);

  const { Text } = Typography;
  const recipeSteps = useRef();

  const handleTitleImageModal = (isOk) => {
    setRecipeStepConfirmVisible(false);
    isOk && setTitleImageFields();
  };

  const setTitleImageFields = () => {
    const tempArr = [];
    recipeSteps.current.childNodes.forEach(function (el, i) {
      const isCurrentIndex = el.getAttribute("step") == CurrentPageInRecipeStep;
      el.querySelectorAll(".title-image")[0].style.display = isCurrentIndex
        ? "block"
        : "none";
      tempArr.push({
        name: ["step-title-yn", i],
        value: isCurrentIndex ? "Y" : "N",
      });
    });
    setRecipeTitleImageYnFields(tempArr);
  };

  const addRecipeStep = () => {
    setTotalPageInRecipeStep(TotalPageInRecipeStep + 1);
    setCurrentPageInRecipeStep(TotalPageInRecipeStep + 1);
    setRecipeStepInputList([...RecipeStepInputList, ...[{ srno: Date.now() }]]);
  };

  return (
    <>
      <Row className="mgb10">
        <Col span={20} className="lh32">
          <Text strong>레시피스텝</Text>
        </Col>
        <Col span={4}>
          <Button type="dashed" className="wd100" onClick={addRecipeStep}>
            <PlusOutlined />
          </Button>
        </Col>
      </Row>
      <div ref={recipeSteps}>
        {RecipeStepInputList.length > 0 &&
          RecipeStepInputList.map((field, index) => (
            <RecipeStepItem key={index} index={index} field={field} />
          ))}
      </div>
      <Modal
        title="대표사진 설정"
        visible={RecipeStepConfirmVisible}
        onOk={() => handleTitleImageModal(true)}
        onCancel={() => handleTitleImageModal(false)}
      >
        <p>선택한 사진을 대표사진으로 설정할까요?</p>
      </Modal>
    </>
  );
}

export default RecipeSteps;
