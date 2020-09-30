import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Form, Select, Row, Col, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Comm from '../../Comm/Comm'
import './GroceryItem.css'

function GroceryItem() {

    const {
        GroceryList
    } = useContext(RecipeContext);

    const { Text } = Typography;
    const { Option } = Select;

    function onSelect(index, option) {
        const myNode = document.querySelectorAll(".recipe-grocery[index='" + index + "']")[0];
        myNode.querySelectorAll(".grocery-unit")[0].textContent = option.unit;
        myNode.querySelectorAll(".grocery-name")[0].setAttribute('grocery-srno', option.key);
    }

    let tempArr = [];
    GroceryList.forEach(function (item, i) {
        tempArr.push(
            <Option
                key={item.grocery_srno}
                category={item.grocery_category}
                unit={Comm.coalesce(item.unit, '그램')}>{item.grocery_name}
            </Option>)
    });

    return (
        <>
            {
                <Form.List name="names1">
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                <Form.Item name="serving" className="mgb10">
                                    <Row>
                                        <Col span={6} className="lh32"><Text strong>식재료</Text></Col>
                                        <Col span={14} className="lh32">
                                            <InputNumber className="recipe-serving-input mgr10" min={1} max={10} step={1} defaultValue={2} />
                                            <span>인분 기준</span>
                                        </Col>
                                        <Col span={4} >
                                            <Button type="dashed" className="wd100" onClick={() => { add(); }}><PlusOutlined />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                {fields.length > 0 &&
                                    <div className="mgb10">
                                        <Row className="mgb10">
                                            <Col span={8} >재료명</Col>
                                            <Col span={6} >수량</Col>
                                            <Col span={6} >단위</Col>
                                            <Col span={4} ></Col>
                                        </Row>
                                        {fields.map((field, index) =>
                                            <Row className="recipe-grocery mgb10" key={index} index={index}>
                                                <Col span={8} className="pdr10">
                                                    <Select
                                                        className="grocery-name wd100"
                                                        showSearch
                                                        placeholder="재료명"
                                                        optionFilterProp="children"
                                                        onSelect={(key, option) => onSelect(index, option)}
                                                    >
                                                        {tempArr}
                                                    </Select>
                                                </Col>
                                                <Col span={6} className="pdr10">
                                                    <InputNumber className="grocery-amount" min={0} max={10000} step={10} defaultValue={0} />
                                                </Col>
                                                <Col span={6} className="pdr10 lh32"><Text className="grocery-unit"></Text></Col>
                                                <Col span={4} >
                                                    <Button type="dashed" className="wd100" 
                                                        onClick={() => { remove(field.name); }}><MinusOutlined />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )}
                                    </div>
                                }
                            </>
                        );
                    }}
                </Form.List>
            }
        </>
    )
}

export default GroceryItem
