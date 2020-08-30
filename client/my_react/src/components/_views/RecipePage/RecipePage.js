import React, { useState , useContext} from 'react'

import { Layout} from 'antd';

import NavBar from '../NavBar/NavBar'
import RecipeAddPage from '../RecipeAddPage/RecipeAddPage'
import RecipeListPage from '../RecipeListPage/RecipeListPage'

import RecipeStore from '../Store/RecipeStore'

import './RecipePage.css'

function RecipePage() {
    return (
        <NavBar content={
            <RecipeStore>
                <Layout>
                    <RecipeAddPage/>
                    <RecipeListPage/>
                </Layout>
            </RecipeStore>
        }></NavBar>
    )
}

export default RecipePage
