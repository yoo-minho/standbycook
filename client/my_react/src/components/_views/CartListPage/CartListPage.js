import React, {useContext, useEffect} from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Row, Col, Card} from 'antd';
import axios from 'axios'
import { HeartOutlined, FieldTimeOutlined } from '@ant-design/icons';
import './CartListPage.css'
import Comm  from '../Comm/Comm'

function CartListPage() {

    const {
        CartListVisible
    } = useContext(RecipeContext);

    return (
        <div style={{display:(CartListVisible?'block':'none')}}>
            장바구닝
        </div>
    )
}

export default CartListPage