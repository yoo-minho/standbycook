import React, {useContext, useEffect} from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Row, Col, Card} from 'antd';
import axios from 'axios'
import { HeartOutlined, FieldTimeOutlined } from '@ant-design/icons';
import './CookListPage.css'
import Comm  from '../Comm/Comm'

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