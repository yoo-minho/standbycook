import React, { useContext } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import RecipeStepItem from './Sections/RecipeStepItem'
import GroceryItem from './Sections/GroceryItem'
import { Typography, Drawer, Button, Form, Input, Col, Row, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios'

function RecipeAddPage() {

    const { Text } = Typography;

    const {
        DrawVisible, setDrawVisible
    } = useContext(RecipeContext);

    const { TextArea } = Input;

    const [form] = Form.useForm();

    function showDrawer(){
        setDrawVisible(true)
    }

    function closeDrawer(){
        setDrawVisible(false)
    }

    function onAdd(){

        const myNode = document.querySelectorAll(".recipe-form")[0];

        let recipeData = {
            title : myNode.querySelectorAll(".recipe-title")[0].value,
            description : myNode.querySelectorAll(".recipe-description")[0].value,
            grocerys : [],
            steps : []
        }

        Array.prototype.forEach.call(myNode.querySelectorAll(".recipe-grocery"), function(el, i){
            recipeData.grocerys.push({
                name : el.querySelectorAll(".grocery-name")[0].value,
                amount : el.querySelectorAll(".grocery-amount")[0].value,
                unit : el.querySelectorAll(".grocery-unit")[0].value
            });
        });

        Array.prototype.forEach.call(myNode.querySelectorAll(".recipe-step"), function(el, i){
            recipeData.steps.push({
                url : (el.querySelectorAll(".dropzone img")[0] ? el.querySelectorAll(".dropzone img")[0].src : ''),
                title : el.querySelectorAll(".step-title")[0].value,
                description : el.querySelectorAll(".step-description")[0].value,
                title_url_yn : ('block' === el.querySelectorAll(".title-image")[0].style.display ? 'Y' : 'N')
            });
        });

        axios.post('/api/recipe/add',recipeData)
        .then(response => {
            console.log(response.data);
            closeDrawer();
            message.success('레시피가 추가되었습니다.');
        })
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
                onClose={closeDrawer}
                visible={DrawVisible}
            >
                <div style={{ marginBottom: '73px'}}>
                    <Form className="recipe-form" form={form} layout="vertical">

                        <Row style={{ marginBottom: '10px'}}>
                            <Col span={6} style={{ lineHeight: '32px'}} ><Text strong>레시피제목</Text></Col>
                            <Col span={18} ><Input className="recipe-title" placeholder="20자까지 작성가능합니다." /></Col>
                        </Row>

                        <Row style={{ marginBottom: '10px'}}>
                            <Col span={6} style={{ lineHeight: '32px'}} ><Text strong>레시피설명</Text></Col>
                            <Col span={18} ><TextArea className="recipe-description" rows={2} placeholder="100자까지 작성가능합니다." /></Col>
                        </Row>

                        <Divider />

                        <GroceryItem/>

                        <Divider />

                        <RecipeStepItem/>

                        <div style={{ width: '100%', position :'absolute', bottom : '0', left : '0', right : '0', borderTop : '1px solid #f1f2f4', padding :'20px', background:'white'}}>
                            <Button style={{ width: '100%'}} onClick={onAdd}>추가</Button>
                        </div>
                    </Form>

                </div>
            </Drawer>
        </>
    )
}

export default RecipeAddPage
