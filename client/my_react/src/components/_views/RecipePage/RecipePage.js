import React, { useState , useContext} from 'react'

import { Layout} from 'antd';

import NavBar from '../NavBar/NavBar'
import RecipeListPage from '../RecipeListPage/RecipeListPage'
import RecipeAddPage from '../RecipeAddPage/RecipeAddPage'
import RecipeDetailPage from '../RecipeDetailPage/RecipeDetailPage'

import RecipeStore from '../Store/RecipeStore'

import './RecipePage.css'

function RecipePage() {
    return (
        <NavBar content={
            <RecipeStore>
                <Layout>
                    <RecipeListPage/>
                    <RecipeAddPage/>
                    <RecipeDetailPage/>
                </Layout>
            </RecipeStore>
        }></NavBar>
    )
}

export default RecipePage
