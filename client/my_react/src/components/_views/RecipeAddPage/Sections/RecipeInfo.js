import React from 'react'
import { Typography, Form, Input, Col, Row, InputNumber } from 'antd';

function RecipeInfo() {

    const { Text } = Typography;
    const { TextArea } = Input;

    return (
        <>
            <Form.Item name="title" className="mgb10">
                <Row>
                    <Col span={6} className="lh32" ><Text strong>레시피제목</Text></Col>
                    <Col span={18} ><Input className="recipe-title-input" placeholder="20자까지 작성가능합니다." /></Col>
                </Row>
            </Form.Item>

            <Form.Item name="description" className="mgb10">
                <Row >
                    <Col span={6} className="lh32" ><Text strong>레시피설명</Text></Col>
                    <Col span={18} ><TextArea className="recipe-description-input" rows={2} placeholder="100자까지 작성가능합니다." /></Col>
                </Row>
            </Form.Item>

            <Form.Item name="time" className="mgb10">
                <Row>
                    <Col span={6} className="lh32" ><Text strong>레시피시간</Text></Col>
                    <Col span={18} >
                        <InputNumber className="recipe-min-input mgr10" min={5} max={180} step={1} defaultValue={10} />
                        <span>분</span>
                    </Col>
                </Row>
            </Form.Item>
        </>
    )
}

export default RecipeInfo
