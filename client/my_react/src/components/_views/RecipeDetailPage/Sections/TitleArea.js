import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore.js'
import { Row, Col, Popover, Typography } from 'antd';
import { ArrowLeftOutlined, FieldTimeOutlined, InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import ContentPopover from './ContentPopover'

function TitleArea() {

    const {
        RecipeDetailRecipeSrno, setRecipeDetailRecipeSrno,
        RecipeDetailData, setRecipeDetailData,
        setDetailPageVisible,
        setCurrentPageInRecipeStep,
        setTotalPageInRecipeStep,
        setRecipeFields,
        setGroceryInputList,
        setRecipeStepInputList,
        setAddPageVisible,
    } = useContext(RecipeContext);

    const { Text } = Typography;

    const onBack = () => { 
        setDetailPageVisible(false);
        setRecipeDetailData({});
        setRecipeDetailRecipeSrno("");
    }

    const onEdit = () => {
        setRecipeFields(convertData());
        setGroceryInputList(JSON.parse(JSON.stringify(RecipeDetailData.grocerys)));
        setRecipeStepInputList(JSON.parse(JSON.stringify(RecipeDetailData.steps)));
        setCurrentPageInRecipeStep( RecipeDetailData.steps ? 1 : 0);
        setTotalPageInRecipeStep( RecipeDetailData.steps ? RecipeDetailData.steps.length : 0);
        setAddPageVisible(true);
    }

    const convertData = () => {
        const tempArr = [
            {"name": ["title"],"value": RecipeDetailData.title},
            {"name": ["description"],"value": RecipeDetailData.description},
            {"name": ["min"],"value": RecipeDetailData.min},
            {"name": ["serving"],"value": RecipeDetailData.serving}
        ]
        if(RecipeDetailData.grocerys && RecipeDetailData.grocerys.length > 0){
            RecipeDetailData.grocerys.forEach((grocery, index) => {
                tempArr.push({"name": ["grocery_srno", index],"value": String(grocery.srno)});
                tempArr.push({"name": ["grocery_amount", index],"value": grocery.amount});
            })
        }
        if(RecipeDetailData.steps && RecipeDetailData.steps.length > 0){
            RecipeDetailData.steps.forEach((step, index) => {
                let currentIndex = index;
                tempArr.push({"name": ["step_url", currentIndex],"value": step.url});
                tempArr.push({"name": ["step_title", currentIndex],"value": step.title});
                tempArr.push({"name": ["step_description", currentIndex],"value": step.description});
                tempArr.push({"name": ["step_title_yn", currentIndex],"value": step.title_url_yn});
            })
        }
        return tempArr;
    }

    return (
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
                        <div className="recipe-info-item">
                            <Popover placement="bottomRight" title="더보기" content={ContentPopover} trigger="click">
                            <InfoCircleOutlined />
                        </Popover></div>
                    </div>
                    
                </Col>
            </Row>
        </div>
    )
}

export default TitleArea
