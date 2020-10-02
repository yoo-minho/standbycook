import React, {useContext, useEffect} from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Row, Col, Card} from 'antd';
import axios from 'axios'
import { HeartOutlined, FieldTimeOutlined } from '@ant-design/icons';
import './RecipeListPage.css'
import Comm  from '../Comm/Comm'

function RecipeListPage() {

    const {
        RecipeList, setRecipeList,
        RecipeListLoading, setRecipeListLoading,
        setDetailPageVisible, 
        setRecipeDetailRecipeSrno,
        setRecipeDetailLoading,
        setGroceryList,
        RecipeListVisible
    } = useContext(RecipeContext);

    useEffect(() => {
        getRecipeList();
        getGroceryList();
    }, [])

    function getRecipeList(){
        axios.post('/api/recipe/getRecipeList')
        .then(response => {
            setRecipeList(response.data.qres1.rows);
            setTimeout(function(){
                setRecipeListLoading(false);
            },1000)
        })
    }

    function getGroceryList(){
        axios.post('/api/recipe/getGroceryList')
        .then(response => {
            setGroceryList(response.data.qres1.rows);
        })
    }

    const showDetailPage = (recipeSrno) => {
        setRecipeDetailLoading(true);
        setDetailPageVisible(true);
        setRecipeDetailRecipeSrno(recipeSrno);
    }

    let recipeList = (<>{",,,,,,,".split(',').map( (v,i) => <Col span={12} key={i}><div className="left-bottom"><Card style={{width: '100%'}} loading={RecipeListLoading}></Card></div></Col>)}</>)
    if(!RecipeListLoading) recipeList = RecipeList && RecipeList.map( recipe => 
        <Col span={12} key={recipe.recipe_srno} >
            <div className="left-bottom" onClick={() => { showDetailPage(recipe.recipe_srno)}}>
                <div className="recipe-list-image">
                    <img 
                        className="recipe-image" 
                        src={Comm.coalesce(recipe.url,"upload_files/recipe_images/1600592225726_다운로드.png")} 
                        alt={recipe.title} />
                </div>
                <div className="recipe-title" >{recipe.title}</div>
                <div className="recipe-title-icon">
                    <div><HeartOutlined />&nbsp;<span>345</span></div>&nbsp;&nbsp;
                    <div><FieldTimeOutlined />&nbsp;<span>{recipe.min}분</span></div>
                    <div className="recipe-title-view"><span>987</span>&nbsp;<span>cooks</span></div>
                </div>
            </div>
        </Col>
    )

    return (
        <Row className="right-top" style={{display:(RecipeListVisible?'inherit':'none')}}>
            {recipeList}
        </Row>
    )
}

export default RecipeListPage
