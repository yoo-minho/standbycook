import React, { useContext, useRef } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Form, Select, Row, Col, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GroceryItem from './GroceryItem'
import Comm from '../../Comm/Comm'

function Grocerys() {

    const {
        GroceryList,
        GroceryInputList, setGroceryInputList,
    } = useContext(RecipeContext);

    const { Text } = Typography;
    const { Option } = Select;

    let tempArr = [];
    GroceryList.forEach(function (item) {
        tempArr.push(
            <Option
                key={item.grocery_srno}
                category={item.grocery_category}
                unit={Comm.coalesce(item.unit, 'g')}>{item.grocery_name}
            </Option>)
    });

    const addField = () => setGroceryInputList([...GroceryInputList, ...[{ "srno": Date.now() }]])

    return (
        <>
            <Row>
                <Col span={6} className="lh32"><Text strong>식재료기준</Text></Col>
                <Col span={14} className="lh32">
                    <Form.Item name="serving" className="mgb10">
                        <InputNumber className="recipe-serving-input mgr10" min={1} max={10} step={1}/>
                    </Form.Item>
                    <span className="sub-text">인분</span>
                </Col>
            </Row>
            <Row>
                <Col span={20} className="lh32"><Text strong>식재료</Text></Col>
                <Col span={4} >
                    <Button type="dashed" className="wd100 add-btn" onClick={() => { addField(); }}><PlusOutlined /></Button>
                </Col>
            </Row>
            {GroceryInputList.length > 0 &&
                <Row className="mgb10">
                    <Col span={8} >재료명</Col>
                    <Col span={6} >수량</Col>
                    <Col span={6} >단위</Col>
                    <Col span={4} ></Col>
                </Row>
            }
            {GroceryInputList.length > 0 && GroceryInputList.map((field, index) =>
                <GroceryItem key={index} index={index} field={field}/>
            )}
        </>
    )
}

export default Grocerys