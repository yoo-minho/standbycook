import React, { useEffect, useRef, useContext } from "react";
import { Typography, Form, Input, Col, Row, InputNumber, Divider } from "antd";
import { RecipeContext } from "../../Store/RecipeStore.js";

function Infos() {
  console.log("Infos");

  const { Text } = Typography;
  const { TextArea } = Input;

  const titleInput = useRef("");

  const {
    EditPageVisible,
  } = useContext(RecipeContext);

  console.log("vvvvv", "Infos");

  /*
  useEffect(() => {
    console.log("vvvvv", "Infos useeffect 1 ", titleInput.current, (titleInput.current.input === document.activeElement));
    titleInput.current.focus();
    console.log("vvvvv", "Infos useeffect 2 ", titleInput.current, (titleInput.current.input === document.activeElement));
  }, []);
*/
  
  const changeTitle = (e) => {
    console.log("vvvvv", "Infos Typing", e.target.value, (titleInput.current.input === document.activeElement));
  }

  return (
    <>
      <Row>
        <Col span={6} className="lh32">
          <Text strong>레시피제목</Text>
        </Col>
        <Col span={18}>
          <div name="title" className="mgb10">
            <Input
              name="infos-title"
              ref={titleInput}
              placeholder="20자까지 작성가능합니다."
              onChange = {changeTitle}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={6} className="lh32">
          <Text strong>레시피설명</Text>
        </Col>
        <Col span={18}>
          <div name="description" className="mgb10">
            <TextArea rows={2} placeholder="100자까지 작성가능합니다." />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={6} className="lh32">
          <Text strong>레시피시간</Text>
        </Col>
        <Col span={18}>
          <div name="min" className="recipe-min-input mgb10">
            <InputNumber className="mgr10" min={5} max={180} step={1} />
          </div>
          <span className="sub-text">분</span>
        </Col>
      </Row>
      <Divider />
    </>
  );
}

export default Infos;
