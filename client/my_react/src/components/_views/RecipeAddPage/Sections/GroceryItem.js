import React, { useContext, useEffect } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Form, Select, Row, Col, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Comm from '../../Comm/Comm'

function GroceryItem(props) {

    const {
        GroceryList,
        DetailPageVisible,
        AddPageVisible,
        RecipeDetailData,
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

    let tempFields = [];
    if(DetailPageVisible){
        tempFields = [
            {"name": ["serving"],"value": RecipeDetailData.serving}
        ]
    } else {
        tempFields = [
            {"name": ["serving"],"value": "2"}
        ]
    }

    let grocerysLength = RecipeDetailData.grocerys.length;
    const addField = (arr, cb) => {
        if(DetailPageVisible && AddPageVisible && arr.length == 0){
            for(var i = 0 ; i < grocerysLength ; i++){
                cb();
            }
        }
        console.log(arr);
        console.log(arr.length);
    }

    useEffect(() => {
        document.querySelectorAll('.add-btn')[0].click();
    }, [])

    setTimeout(function(){
        console.log('setTimeout')
        const tempNodeList = document.querySelectorAll('.grocery-list .recipe-grocery');
        if(tempNodeList[grocerysLength]){
            tempNodeList[grocerysLength].querySelectorAll('.remove-btn')[0].click();
        }
        RecipeDetailData.grocerys.forEach(function(v,i){
            if(tempNodeList[i]){
                tempNodeList[i].querySelectorAll('.ant-select-selection-placeholder')[0].textContent = v.name;
                tempNodeList[i].querySelectorAll('.grocery-amount input')[0].value = v.amount;
                tempNodeList[i].querySelectorAll('.grocery-unit')[0].textContent = v.unit;
            }
        })
    },500)

    return (
        <Form name="form-grocery" form={props.form} fields={tempFields}>
            <Row>
                <Col span={6} className="lh32"><Text strong>식재료기준</Text></Col>
                <Col span={14} className="lh32">
                    <Form.Item name="serving" className="mgb10">
                        <InputNumber className="recipe-serving-input mgr10" min={1} max={10} step={1} />
                    </Form.Item>
                    <span className="sub-text">인분</span>
                </Col>
            </Row>
            <Form.List name="grocery-list" >
                {(fields, { add, remove }) => {
                    addField(fields, add);
                    return (
                        <>
                            <Row>
                                <Col span={20} className="lh32"><Text strong>식재료</Text></Col>
                                <Col span={4} >
                                    <Button type="dashed" className="wd100 add-btn" onClick={() => { add(); }}><PlusOutlined /></Button>
                                </Col>
                            </Row>
                            {fields.length > 0 &&
                                <div className="mgb10 grocery-list">
                                    <Row className="mgb10">
                                        <Col span={8} >재료명</Col>
                                        <Col span={6} >수량</Col>
                                        <Col span={6} >단위</Col>
                                        <Col span={4} ></Col>
                                    </Row>
                                    {fields.map((field, index) =>
                                        <Row className="mgb10 recipe-grocery" key={index} index={index}>
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
                                                <InputNumber className="grocery-amount" min={0} max={10000} step={1} />
                                            </Col>
                                            <Col span={6} className="pdr10 lh32"><Text className="grocery-unit"></Text></Col>
                                            <Col span={4} >
                                                <Button type="dashed" className="wd100 remove-btn"
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
        </Form>
    )
}

export default GroceryItem
