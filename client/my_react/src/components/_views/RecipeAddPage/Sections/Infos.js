import React, { useState, useEffect, useRef } from 'react'
import { Typography, Form, Input, Col, Row, InputNumber } from 'antd';
import { RecipeContext } from '../../Store/RecipeStore.js'

function Infos() {

    const { Text } = Typography;
    const { TextArea } = Input;
    
    const titleInput = useRef("");
    const minInput = useRef(0);
    const [Min, setMin] = useState(10)

    useEffect(() => {
        console.log('useEffect')
        setTimeout(function(){
            titleInput.current.focus();
        },1000)
        
        
    }, [])

    return (
        <>
            <Row>
                <Col span={6} className="lh32" >
                    <Text strong>레시피제목</Text>
                </Col>
                <Col span={18} >
                    <Form.Item name="title" className="mgb10">
                        <Input ref={titleInput} placeholder="20자까지 작성가능합니다." />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6} className="lh32" >
                    <Text strong>레시피설명</Text>
                </Col>
                <Col span={18} >
                    <Form.Item name="description" className="mgb10">
                        <TextArea rows={2} placeholder="100자까지 작성가능합니다." />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6} className="lh32" >
                    <Text strong>레시피시간</Text>
                </Col>
                <Col span={18} >
                    <Form.Item name="min" className="recipe-min-input mgb10">
                        <InputNumber className="mgr10" min={5} max={180} step={1}/>
                    </Form.Item>
                    <span className="sub-text">분</span>
                </Col>
            </Row>
        </ >
    )
}

export default Infos
