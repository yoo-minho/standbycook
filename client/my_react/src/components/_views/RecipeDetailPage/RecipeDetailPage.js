import React, {useContext, useEffect, useState} from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Drawer, Typography, Row, Col, Divider, Popover, Pagination, Card, Button, InputNumber, message} from 'antd';
import axios from 'axios'
import { ArrowLeftOutlined, HeartOutlined, FieldTimeOutlined, InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import Comm  from '../Comm/Comm'
import './RecipeDetailPage.css'

function RecipeDetailPage() {

    const { Text } = Typography;

    const {
        DetailPageVisible, setDetailPageVisible,
        CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
        TotalPageInRecipeStep, setTotalPageInRecipeStep,
        RecipeDetailRecipeSrno, setRecipeDetailRecipeSrno,
        RecipeDetailData, setRecipeDetailData,
        RecipeDetailLoading, setRecipeDetailLoading,
        setAddPageVisible,
    } = useContext(RecipeContext);

    const onBack = () => { 
        setDetailPageVisible(false)
        setRecipeDetailRecipeSrno("");
    }

    const onEdit = () => {
        setCurrentPageInRecipeStep(0);
        setTotalPageInRecipeStep(0);
        setAddPageVisible(true);
    }

    const addCart = () => {
        const myNode = document.querySelectorAll(".recipe-detail-page")[0];
        axios.post('/api/recipe/addRecipeInCart',{
            user_id : 'dellose',
            recipe_srno : myNode.querySelectorAll("[recipe-srno]")[0].getAttribute('recipe-srno'),
            recipe_amount : myNode.querySelectorAll(".serving-count input")[0].value
        }).then(response => {
            message.success('장볼리스트에 추가되었습니다.');
        })
    }

    useEffect(() => {
        getRecipeDetailBySrno();
    }, [RecipeDetailRecipeSrno])

    function getRecipeDetailBySrno(){
        if("" !== Comm.coalesce(RecipeDetailRecipeSrno)){
            axios.post('/api/recipe/getRecipeDetailBySrno',{recipe_srno:RecipeDetailRecipeSrno})
            .then(response => {
                setRecipeDetailData(response.data.qres1.rows[0]);
                if(response.data.qres1.rows[0].steps && response.data.qres1.rows[0].steps.length > 0){
                    setCurrentPageInRecipeStep(1);
                    setTotalPageInRecipeStep(response.data.qres1.rows[0].steps.length);
                } else {
                    //pass
                }
                setRecipeDetailLoading(false);
            })
        } else {
            //pass
        }
    }

    let recipeStep = RecipeDetailData.steps && RecipeDetailData.steps.map((step, index) => 
        <div id={"recipe-step-item"+(index+1)} className="recipe-step" key={index} style={{ marginBottom: '10px', display: (CurrentPageInRecipeStep == (index+1)?'block':'none') }} >
            <Row style={{ marginBottom: '10px'}}>
                <Col span={24} >
                    <Pagination 
                        style={{ marginBottom:'10px'}} size="small" defaultPageSize={1}
                        current={CurrentPageInRecipeStep} 
                        total={TotalPageInRecipeStep} 
                        onChange={function(page){
                            setCurrentPageInRecipeStep(page)
                    }}/>
                </Col>
            </Row>
            <div>
                <div className = "dropzone recipe-detail"><img className="recipe-image" alt={step.title} src={step.url}></img></div>
                <Row style={{ marginBottom: '10px'}}><Text className="step-title" strong>{step.title}</Text></Row>
                <Row style={{ marginBottom: '10px'}}><Text className="step-description">{step.description}</Text></Row>
            </div>
        </div>
    )

    let recipeGrocerys = RecipeDetailData.grocerys && RecipeDetailData.grocerys.map((grocery, index) => 
        <Col span={12} id={"recipe-grocery-item"+(index+1)} className="recipe-grocery" key={index} style={{ marginBottom: '10px' }}>
            <Text className="grocery-name" strong>{grocery.name}</Text>&nbsp;-&nbsp;
            <Text className="grocery-amount">{grocery.amount}{grocery.unit}</Text>
        </Col>            
    )

    const contentPopover = (
        <div>
            <Row style={{ }}><Text strong>레시피설명</Text></Row>
            <Row style={{ marginBottom: '10px'}}><Text>{RecipeDetailData.description}</Text></Row>
            <Row style={{ marginBottom: '-10px', lineHeight: '32px'}}><Text strong>레시피등록아이디</Text></Row>
            <Row style={{ marginBottom: '10px', lineHeight: '32px'}}><Text>{RecipeDetailData.register_id}</Text></Row>
            <Row style={{ marginBottom: '-10px', lineHeight: '32px'}}><Text strong>레시피등록일시</Text></Row>
            <Row style={{ marginBottom: '10px', lineHeight: '32px'}}><Text>{RecipeDetailData.register_datetime}</Text></Row>
        </div>
      );
    
    const recipeTitleArea = (
        <div recipe-srno={RecipeDetailRecipeSrno}>
            <Row>
                <Col span={16} >
                    <Text strong>
                        <div className="recipe-detail-title">
                            <ArrowLeftOutlined onClick={onBack}/>
                            <span className="mgl10">{RecipeDetailData.title}</span>
                        </div>
                    </Text> 
                </Col>
                <Col span={8}>
                    <div className="recipe-info">                
                        <div className="recipe-info-item"><EditOutlined onClick={onEdit}/></div>
                        <div className="recipe-info-item"><FieldTimeOutlined />&nbsp;<span>{RecipeDetailData.min}분</span></div>
                        <div className="recipe-info-item"><Popover placement="bottomRight" title="더보기" content={contentPopover} trigger="click">
                            <InfoCircleOutlined />
                        </Popover></div>
                    </div>
                    
                </Col>
            </Row>
        </div>
    )
    
    let recipeDetail = (<Row style={{ marginBottom: '10px'}}>
        <Col span={24} ><Card style={{width: '100%'}} loading={RecipeDetailLoading}></Card></Col><Divider />
        <Col span={24} ><Card style={{width: '100%'}} loading={RecipeDetailLoading}></Card></Col><Divider />
        <Col span={24} ><Card style={{width: '100%'}} loading={RecipeDetailLoading}></Card></Col>
    </Row>)
    if(!RecipeDetailLoading) recipeDetail = <div style={{ marginBottom: '73px'}}>
        <Row style={{ marginBottom: '10px', lineHeight: '32px'}}>
            <Col span={24}><Text strong>식재료</Text></Col>
        </Row>
        <Row style={{ marginBottom: '10px'}}>
            {recipeGrocerys}
        </Row>
        <Divider />
        <Row style={{ marginBottom: '10px', lineHeight: '32px'}}>
            <Col span={24}><Text strong>레시피스텝</Text></Col>
        </Row>
        {recipeStep}
        <div className="button-area">
        <Row>
            <Col span={12}><HeartOutlined style={{fontSize:'20px', marginRight:'12px'}}/>
                <InputNumber className="serving-count" min={1} max={10} step ={1} defaultValue={2} />&nbsp;&nbsp;
                <span>인분</span>
            </Col>
            <Col span={12}><Button style={{ width: '100%'}} onClick={addCart}>레시피 담기</Button></Col>
        </Row>
        </div>
    </div>

    return (
            <Drawer
                className="recipe-detail-page"
                title={<>{recipeTitleArea}</>}
                placement="right"
                width = "100%"
                height = "100%"
                closable={false}
                visible={DetailPageVisible}
                style={{zIndex:'999'}}
            >
                {recipeDetail}
            </Drawer>
    )
}

export default RecipeDetailPage
