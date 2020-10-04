import React, { useContext, useEffect } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Form, Select, Row, Col, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Comm from '../../Comm/Comm'

function GroceryItem() {

    const {
        GroceryList,
        DetailPageVisible,
        RecipeDetailData,
        GroceryInputList, setGroceryInputList,
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
                unit={Comm.coalesce(item.unit, 'g')}>{item.grocery_name}
            </Option>)
    });

    const tempFields = [{ "name": ["serving"], "value": (DetailPageVisible ? RecipeDetailData.serving : "2") }];

    const addField = () => setGroceryInputList([...GroceryInputList, ...[{ "srno": Date.now() }]])
    const removeField = (targetSrno) => setGroceryInputList(GroceryInputList.filter(item => Number(item.srno) !== Number(targetSrno)))

    const changeField = (targetSrno, num) => {
        setGroceryInputList(GroceryInputList.map(item => {
            if (Number(item.srno) === Number(targetSrno)) item.amount = num;
            return item;
        }));
    }

    return (
        <Form name="form-grocery" className="form-grocery" fields={tempFields}>
            <Row>
                <Col span={6} className="lh32"><Text strong>식재료기준</Text></Col>
                <Col span={14} className="lh32">
                    <Form.Item name="serving" className="mgb10">
                        <InputNumber className="recipe-serving-input mgr10" min={1} max={10} step={1} />
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
                <Row className="mgb10 recipe-grocery" key={index} index={index}>
                    <Col span={8} className="pdr10">
                        <div className="grocery-name wd100" grocery-srno={field.srno}>
                            <Select
                                className="wd100"
                                showSearch
                                placeholder="재료명"
                                optionFilterProp="children"
                                onSelect={(key, option) => onSelect(index, option)}
                                value={field.name}
                            >
                                {tempArr}
                            </Select>
                        </div>
                    </Col>
                    <Col span={6} className="pdr10">
                        <InputNumber className={"grocery-amount"} min={0} max={10000} step={1} value={field.amount}
                            onChange={(changeValue) => changeField(field.srno, changeValue)} />
                    </Col>
                    <Col span={6} className="pdr10 lh32"><Text className="grocery-unit">{field.unit}</Text></Col>
                    <Col span={4} >
                        <Button type="dashed" className="wd100 remove-btn"
                            onClick={(e) => { removeField(field.srno); }}><MinusOutlined />
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    )
}

export default GroceryItem