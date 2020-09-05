import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Button, Form, Input, Pagination, Steps, Row, Col} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible'
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'

function GroceryItem() {

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
    };

    return (
        <Form.List name="names1">
            {(fields, { add, remove }) => {
                return (
                    <>      
                    <Row style={{ marginBottom: '10px'}}>
                        <Col span={18} style={{ lineHeight: '32px'}} >식재료</Col>
                        <Col span={6} ><Button type="dashed" style={{ width: '100%' }} onClick={() => {add();}}>추가<PlusOutlined /></Button></Col>
                    </Row>

                    {fields.length > 0 && 
                        <Row style={{ marginBottom: '10px'}}>
                            <Col span={12} >재료명</Col>
                            <Col span={5} >수량</Col>
                            <Col span={5} >단위</Col>
                            <Col span={2} ></Col>
                        </Row>
                    }

                    {fields.map((field, index) => 
                        <Form.Item {...(formItemLayout)} required={false} key={field.key} style={{ marginBottom: '10px'}}>
                            <Row>
                                <Col span={12} style={{ paddingRight: '10px'}}><Input placeholder="" /></Col>
                                <Col span={5} style={{ paddingRight: '10px'}}><Input placeholder="" /></Col>
                                <Col span={5} style={{ paddingRight: '10px'}}><Input placeholder="" /></Col>
                                <Col span={2} style={{ textAlign: 'center', lineHeight: '32px'}}><MinusCircleOutlined className="dynamic-delete-button" onClick={() => {remove(field.name);}} /></Col>
                            </Row>
                        </Form.Item>
                    )}
                    </>
                );
            }}
        </Form.List>
    )
}

export default GroceryItem
