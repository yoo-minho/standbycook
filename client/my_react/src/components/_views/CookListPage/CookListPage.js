import React, {useContext} from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import './CookListPage.css'

function CookListPage() {

    const {
        CookListVisible
    } = useContext(RecipeContext);

    return (
        <div style={{display:(CookListVisible?'block':'none')}}>
            요리블로긍
        </div>
    )
}

export default CookListPage