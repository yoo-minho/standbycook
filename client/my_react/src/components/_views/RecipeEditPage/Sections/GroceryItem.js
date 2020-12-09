import React, { useContext } from "react";
import { RecipeContext } from "../../Store/RecipeStore";
import { Button, Select, Row, Col, InputNumber, Form } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import Comm from "../../Comm/Comm";

function GroceryItem(props) {
  console.log("vvvvv", "GroceryItem");
  const field = props.field;
  const index = props.index;

  const { GroceryList, GroceryInputList, setGroceryInputList } = useContext(
    RecipeContext
  );

  const { Option } = Select;
  const removeField = (targetSrno) =>
    setGroceryInputList(
      GroceryInputList.filter(
        (item) => Number(item.srno) !== Number(targetSrno)
      )
    );

  return (
    <Row className="grocery-item">
      <Col span={14} className="pdr10">
        <div
          className="grocery_amount wd100 mgb10"
          index={index}
          grocery-srno={field.srno}
        >
          <Select
            className="wd100"
            placeholder="재료명"
            optionFilterProp="children"
            showSearch
          >
            {GroceryList.length > 0 &&
              GroceryList.map((item) => (
                <Option
                  key={item.grocery_srno}
                  category={item.grocery_category}
                >
                  {item.grocery_name +
                    " (" +
                    Comm.coalesce(item.unit, "g") +
                    ")"}
                </Option>
              ))}
          </Select>
        </div>
      </Col>
      <Col span={6} className="pdr10">
        <div className="grocery_amount mgb10" index={index}>
          <InputNumber className={"wd100"} min={0} max={10000} step={1} />
        </div>
      </Col>
      <Col span={4}>
        <Button
          type="dashed"
          className="wd100"
          onClick={() => removeField(field.srno)}
        >
          <MinusOutlined />
        </Button>
      </Col>
    </Row>
  );
}

export default GroceryItem;
