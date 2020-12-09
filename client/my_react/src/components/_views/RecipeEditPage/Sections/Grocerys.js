import React, { useContext } from "react";
import { RecipeContext } from "../../Store/RecipeStore";
import { Typography, Button, Form, Divider, Row, Col, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GroceryItem from "./GroceryItem";

function Grocerys() {
  console.log("vvvvv", "Grocerys");

  const { GroceryInputList, setGroceryInputList } = useContext(RecipeContext);

  const { Text } = Typography;
  const addField = () =>
    setGroceryInputList([...GroceryInputList, ...[{ srno: Date.now() }]]);

  return (
    <>
      <Row>
        <Col span={6} className="lh32">
          <Text strong>식재료기준</Text>
        </Col>
        <Col span={18} className="lh32">
          <InputNumber className="mgr10" min={1} max={10} step={1} />
          <span className="sub-text">인분</span>
        </Col>
      </Row>
      <Row>
        <Col span={20} className="lh32">
          <Text strong>식재료</Text>
        </Col>
        <Col span={4}>
          <Button type="dashed" className="wd100" onClick={addField}>
            <PlusOutlined />
          </Button>
        </Col>
      </Row>
      {GroceryInputList.length > 0 && (
        <Row className="mgb10">
          <Col span={14}>재료명</Col>
          <Col span={6}>수량</Col>
          <Col span={4}></Col>
        </Row>
      )}
      {GroceryInputList.length > 0 &&
        GroceryInputList.map((field, index) => (
          <GroceryItem key={index} index={index} field={field} />
        ))}
      <Divider />
    </>
  );
}

export default Grocerys;
