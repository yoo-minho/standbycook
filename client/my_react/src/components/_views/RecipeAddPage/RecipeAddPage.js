import React, { useContext } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import RecipeStepItem from './Sections/RecipeStepItem'
import GroceryItem from './Sections/GroceryItem'
import { Typography, Drawer, Button, Form, Input, Col, Row, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function RecipeAddPage() {

    const { Text, Link } = Typography;

    const {
        DrawVisible, setDrawVisible
    } = useContext(RecipeContext);

    const { TextArea } = Input;

    const [form] = Form.useForm();

    function showDrawer(){
        setDrawVisible(true)
    }

    function onClose(){
        setDrawVisible(false)
    }

    return (
        <>
            <Button 
                onClick={showDrawer} 
                className="add-button" 
                shape="circle" 
                icon={<PlusOutlined 
                        style={{ color:'#FFFFFF', fontSize:'18px' }}/>} />

            <Drawer
                title="레시피추가"
                placement="bottom"
                width = "100%"
                height = "100%"
                closable={true}
                onClose={onClose}
                visible={DrawVisible}
            >
                <Form form={form} layout="vertical">

                    <Row style={{ marginBottom: '10px'}}>
                        <Col span={6} style={{ lineHeight: '32px'}} ><Text strong>레시피제목</Text></Col>
                        <Col span={18} ><Input placeholder="20자까지 작성가능합니다." /></Col>
                    </Row>

                    <Row style={{ marginBottom: '10px'}}>
                        <Col span={6} style={{ lineHeight: '32px'}} ><Text strong>레시피설명</Text></Col>
                        <Col span={18} ><TextArea rows={2} placeholder="100자까지 작성가능합니다." /></Col>
                    </Row>

                    <Divider />

                    <GroceryItem/>

                    <Divider />

                    <RecipeStepItem/>

                </Form>

                <div style={{ width: '100%', position :'fixed', bottom : '0', left : '0', right : '0', borderTop : '1px solid #f1f2f4', padding :'20px'}}>
                    <Button style={{ width: '100%'}}>추가</Button>
                </div>
            </Drawer>
        </>
    )
}

export default RecipeAddPage
