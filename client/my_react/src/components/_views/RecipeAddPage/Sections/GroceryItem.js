import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Form, Input, Select, Steps, Row, Col, InputNumber, Divider} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Comm  from '../../Comm/Comm'
import './GroceryItem.css'

function GroceryItem() {

    const {
        GroceryList
    } = useContext(RecipeContext);

    const { Text } = Typography;
    const { Option } = Select;
    
    function onSelect(index, option) {
        console.log(index);
        console.log(option);
        document.querySelectorAll(".recipe-grocery [index='"+index+"'] .grocery-unit")[0].textContent = option.unit;
    }

    let tempArr = [];
    GroceryList.forEach(function(item, i){
        tempArr.push(<Option key={item.grocery_srno} category={item.grocery_category} unit={Comm.coalesce(item.unit,'그램')}>{item.grocery_name}</Option>)
    });

    return (
        <Form.List name="names1">
            {(fields, { add, remove }) => {
                return (
                    <>      
                        <Row style={{ marginBottom: '10px'}}>
                            <Col span={20} style={{ lineHeight: '32px'}} ><Text strong>식재료</Text></Col>
                            <Col span={4} ><Button type="dashed" style={{ width: '100%' }} onClick={() => {add();}}><PlusOutlined /></Button></Col>
                        </Row>
                        {fields.length > 0 &&
                            <div className="recipe-grocery" style={{ marginBottom: '10px'}}>
                                <Row style={{ marginBottom: '10px'}}>
                                    <Col span={8} >재료명</Col>
                                    <Col span={6} >수량</Col>
                                    <Col span={6} >단위</Col>
                                    <Col span={4} ></Col>
                                </Row>
                                {fields.map((field, index) =>                                    
                                    <Row key={index} index={index} style={{ marginBottom: '10px'}}>
                                        <Col span={8} style={{ paddingRight: '10px'}}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="재료명"
                                            optionFilterProp="children"
                                            onSelect={(key, option) => onSelect(index, option, )}
                                        >
                                            {tempArr}
                                        </Select>
                                        </Col>
                                        <Col span={6} style={{ paddingRight: '10px'}}><InputNumber className="grocery-amount" min={0} max={10000} step ={10} defaultValue={0} /></Col>
                                        <Col span={6} style={{ paddingRight: '10px', lineHeight: '32px'}}><Text className="grocery-unit"></Text></Col>
                                        <Col span={4} ><Button type="dashed" style={{ width: '100%' }} onClick={() => {remove(field.name);}}><MinusOutlined /></Button></Col>
                                    </Row>  
                                )}
                            </div>
                        }
                    </>
                );
            }}
        </Form.List>
    )
}

export default GroceryItem
