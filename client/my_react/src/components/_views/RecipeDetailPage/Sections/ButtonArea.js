import React, { useContext, useRef } from 'react'
import { RecipeContext } from '../../Store/RecipeStore.js'
import { Row, Col,  Button, InputNumber, message} from 'antd';
import axios from 'axios'
import { HeartOutlined } from '@ant-design/icons';

function ButtonArea() {

    const {
        RecipeDetailRecipeSrno, 
    } = useContext(RecipeContext);

    const servingCountRef = useRef()

    const addRecipeInCart = () => {
        axios.post('/api/recipe/addRecipeInCart',{
            user_id : 'dellose',
            recipe_srno : RecipeDetailRecipeSrno,
            recipe_amount : ''
        }).then(() => {
            message.success('장볼리스트에 추가되었습니다.');
        })
    }

    return (
        <div className="button-area">
            <Row>
                <Col span={12}><HeartOutlined style={{ fontSize:'20px', marginRight:'12px'}}/>
                    <InputNumber ref={servingCountRef} className="serving-count" min={1} max={10} step ={1} defaultValue={2} />&nbsp;&nbsp;
                    <span>인분</span>
                </Col>
                <Col span={12}><Button className="wd100" onClick={addRecipeInCart}>레시피 담기</Button></Col>
            </Row>
        </div>
    )
}

export default ButtonArea
