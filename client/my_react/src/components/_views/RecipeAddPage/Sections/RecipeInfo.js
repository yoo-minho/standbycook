import React, { useContext } from 'react'
import { Typography, Form, Input, Col, Row, InputNumber } from 'antd';
import { RecipeContext } from '../../Store/RecipeStore.js'

function RecipeInfo() {

    const { Text } = Typography;
    const { TextArea } = Input;

    const {
        DetailPageVisible,
        RecipeDetailData,
    } = useContext(RecipeContext);

   let tempFields = [];
   if(DetailPageVisible){
       tempFields = [
           {"name": ["title"],"value": RecipeDetailData.title},
           {"name": ["description"],"value": RecipeDetailData.description},
           {"name": ["min"],"value": RecipeDetailData.min},
       ]
   } else {
       tempFields = [
           {"name": ["title"],"value": ""},
           {"name": ["description"],"value": ""},
           {"name": ["min"],"value": "10"},
       ]
   }

    return (
        <Form name="form-recipe-info" className="form-recipe-info" fields={tempFields}>
            <Row>
                <Col span={6} className="lh32" ><Text strong>레시피제목</Text></Col>
                <Col span={18} >
                    <Form.Item name="title" className="mgb10">
                        <Input className="recipe-title-input" placeholder="20자까지 작성가능합니다." />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6} className="lh32" ><Text strong>레시피설명</Text></Col>
                <Col span={18} >
                    <Form.Item name="description" className="mgb10">
                        <TextArea className="recipe-description-input" rows={2} placeholder="100자까지 작성가능합니다." />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6} className="lh32" ><Text strong>레시피시간</Text></Col>
                <Col span={18} >
                    <Form.Item name="min" className="mgb10">
                        <InputNumber className="recipe-min-input mgr10" min={5} max={180} step={1} />
                    </Form.Item>
                    <span className="sub-text">분</span>
                </Col>
            </Row>
        </Form>
    )
}

export default RecipeInfo
