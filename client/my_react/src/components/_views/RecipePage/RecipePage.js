import React from 'react'
import NavBar from '../NavBar/NavBar'
import RecipeListPage from '../RecipeListPage/RecipeListPage'
import CartListPage from '../CartListPage/CartListPage'
import CookListPage from '../CookListPage/CookListPage'
import RecipeDetailPage from '../RecipeDetailPage/RecipeDetailPage'
import RecipeStore from '../Store/RecipeStore'
import { Layout } from 'antd';
import './RecipePage.css'

function RecipePage() {
    return (
        <RecipeStore>
            <Layout className="contents-area">
                <RecipeListPage/>
                <CartListPage/>
                <CookListPage/>
                <RecipeDetailPage/>
            </Layout>
            <NavBar/>
        </RecipeStore>
    )
}

export default RecipePage
