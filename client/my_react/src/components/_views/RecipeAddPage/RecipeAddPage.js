import React, { useContext } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import RecipeStepItem from './Sections/RecipeStepItem'
import GroceryItem from './Sections/GroceryItem'
import { Typography, Drawer, Button, Form, Input, Col, Row, Divider, message, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios'

function RecipeAddPage() {

    const { Text } = Typography;

    const {
        AddPageVisible, setAddPageVisible,
        RecipeList, setRecipeList
    } = useContext(RecipeContext);

    const { TextArea } = Input;

    const [form] = Form.useForm();

    function showDrawer(){
        setAddPageVisible(true)
    }

    function closeDrawer(){
        setAddPageVisible(false)
    }

    function onAdd(){

        const myNode = document.querySelectorAll(".recipe-form")[0];

        let recipeData = {
            title : myNode.querySelectorAll(".recipe-title")[0].value,
            description : myNode.querySelectorAll(".recipe-description")[0].value,
            min : myNode.querySelectorAll(".recipe-min input")[0].value,
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

        addRecipe(recipeData);

    }

    function addRecipe(recipeData){
        axios.post('/api/recipe/addRecipe',recipeData)
        .then(response => {
            closeDrawer();
            getRecipeListBySrno(response.data.qresTotal.first.rows[0].recipe_srno);
            message.success('레시피가 추가되었습니다.');
        })
    }

    function getRecipeListBySrno(recipeSrno){
        axios.post('/api/recipe/getRecipeListBySrno',{recipe_srno:recipeSrno})
        .then(response => {
            setRecipeList([...response.data.qres1.rows,...RecipeList]);
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
                visible={AddPageVisible}
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

                        <Row style={{ marginBottom: '10px'}}>
                            <Col span={6} style={{ lineHeight: '32px'}} ><Text strong>레시피시간</Text></Col>
                            <Col span={18} ><InputNumber className="recipe-min" min={5} max={180} step ={1} defaultValue={10} />&nbsp;<span>분</span></Col>
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
