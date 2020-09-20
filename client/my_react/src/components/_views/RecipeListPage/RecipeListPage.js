import React, {useContext, useEffect} from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Row, Col, Card} from 'antd';
import axios from 'axios'
import { HeartOutlined, FieldTimeOutlined } from '@ant-design/icons';
import './RecipeListPage.css'

const { Meta } = Card;

function RecipeListPage() {

    const {
        RecipeList, setRecipeList,
        RecipeListLoading, setRecipeListLoading
    } = useContext(RecipeContext);

    useEffect(() => {
        getList();
    }, [])

    function getList(){
        axios.post('/api/recipe/getList')
        .then(response => {
            console.log(response.data.qres1.rows);
            setRecipeList(response.data.qres1.rows);
            setTimeout(function(){
                setRecipeListLoading(false);
            },1000)
        })
    }
    
    function coalesce(val, defaultVal){
        let tmpVal;
        if(val == null || val == undefined || val == ''){
            if(defaultVal == null || defaultVal == undefined || defaultVal == ''){
                tmpVal = '';
            } else {
                tmpVal = defaultVal;
            }
        } else {
            tmpVal = val;
        }
        return tmpVal;
    }

    

    let recipeList = (
        <>
            {",,,,,,,".split(',').map( item =>
                <Col span={12}><div style={{ marginLeft: 10, marginBottom : 15 }}><Card style={{ width: '100%'}} loading={RecipeListLoading}></Card></div></Col>
            )}
        </>
    )
    if(!RecipeListLoading) recipeList = RecipeList && RecipeList.map( recipe => 
        <Col span={12} key={recipe.recipe_srno}>
            <div style={{ marginLeft: 10, marginBottom : 15 }}>
                <div className="recipe-list-image">
                    <img 
                        className="recipe-image" 
                        src={coalesce(recipe.url,"upload_files/recipe_images/1600592225726_다운로드.png")} 
                        alt={recipe.title} />
                </div>
                <div className="recipe-title" >{recipe.title}</div>
                <div className="recipe-title-icon">
                    <div><HeartOutlined />&nbsp;<span>345</span></div>&nbsp;&nbsp;
                    <div><FieldTimeOutlined />&nbsp;<span>{recipe.min}분</span></div>
                    <div className="recipe-title-view"><span>987</span>&nbsp;<span>views</span></div>
                </div>
            </div>
        </Col>
    )

    return (
        <Row style={{ marginTop:10, marginRight: 10 }}>
            {recipeList}
        </Row>
    )
}

export default RecipeListPage
