import React, { useContext, useRef, useState } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Select, Row, Col, InputNumber, Form } from 'antd';
import {  MinusOutlined } from '@ant-design/icons';
import Comm from '../../Comm/Comm'

function GroceryItem(props) {

    const field = props.field;
    const index = props.index;
    const [Unit, setUnit] = useState("");
    const [Amount, setAmount] = useState(1);

    const {
        GroceryList,
        GroceryInputList, setGroceryInputList,
    } = useContext(RecipeContext);

    const { Text } = Typography;
    const { Option } = Select;

    const onSelect = (option) => {
        setUnit(option.unit);
    }

    const onChange = (e) =>{
        console.log('onChange');
        console.log(e);
        console.log(e.target);
    }

    let tempArr = [];
    GroceryList.forEach(function (item) {
        tempArr.push(
            <Option
                key={item.grocery_srno}
                category={item.grocery_category}
                unit={Comm.coalesce(item.unit, 'g')}>{item.grocery_name}
            </Option>)
    });

    const removeField = (targetSrno) => setGroceryInputList(GroceryInputList.filter(item => Number(item.srno) !== Number(targetSrno)))

    return (
        <Row className="mgb10 recipe-grocery">
            <Col span={8} className="pdr10">
                <div className="grocery-name wd100" grocery-srno={field.srno}>
                    <Select
                        className="wd100"                      
                        placeholder="재료명"
                        optionFilterProp="children"
                        showSearch
                        onSelect={(_, option) => onSelect(option)}
                    >
                        {tempArr}
                    </Select>
                </div>
            </Col>
            <Col span={6} className="pdr10">
                <Form.Item name={["amount",index]} className="mgb10">
                    <InputNumber className={"grocery-amount"} min={0} max={10000} step={1}/>
                </Form.Item>
            </Col>
            <Col span={6} className="pdr10 lh32"><Text className="grocery-unit">{Unit}</Text></Col>
            <Col span={4} >
                <Button type="dashed" className="wd100 remove-btn"
                    onClick={(e) => { removeField(field.srno); }}><MinusOutlined />
                </Button>
            </Col>
        </Row>
    )
}

export default GroceryItem