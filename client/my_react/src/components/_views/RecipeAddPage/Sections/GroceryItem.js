import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Form, Input, Pagination, Steps, Row, Col, Card, Divider} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

function GroceryItem() {

    const { Text, Link } = Typography;

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
                            <div style={{ marginBottom: '10px'}}>
                                <Row style={{ marginBottom: '10px'}}>
                                    <Col span={8} >재료명</Col>
                                    <Col span={6} >수량</Col>
                                    <Col span={6} >단위</Col>
                                    <Col span={4} ></Col>
                                </Row>
                                {fields.map((field, index) => 
                                    <div key={index} style={{ marginBottom: '10px'}}>
                                        <Row className="recipe-grocery">
                                            <Col span={8} style={{ paddingRight: '10px'}}><Input className="grocery-name" placeholder="" /></Col>
                                            <Col span={6} style={{ paddingRight: '10px'}}><Input className="grocery-amount" placeholder="" /></Col>
                                            <Col span={6} style={{ paddingRight: '10px'}}><Input className="grocery-unit" placeholder="" /></Col>
                                            <Col span={4} ><Button type="dashed" style={{ width: '100%' }} onClick={() => {remove(field.name);}}><MinusOutlined /></Button></Col>
                                        </Row>
                                    </div>  
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
