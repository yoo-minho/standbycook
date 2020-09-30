import React, {useContext, useEffect} from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Collapse, Checkbox, Card, Button,Row,Col } from 'antd';
import axios from 'axios'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './CartListPage.css'
import Comm  from '../Comm/Comm'

function CartListPage() {

    const {
        CartListVisible,
        CartRecipeList, setCartRecipeList,
        CartGroceryList, setCartGroceryList,
        CartEtcList, setCartEtcList,
        CardListLoading, setCardListLoading,
    } = useContext(RecipeContext);

    const { Panel } = Collapse;

    useEffect(() => {
        CartListVisible && getCartList('dellose');
    }, [CartListVisible])

    function getCartList(userId) {
        axios.post('/api/recipe/getCartList', {user_id:userId})
            .then(response => {
                setCartRecipeList(response.data.qresTotal.first.rows);
                setCartGroceryList(response.data.qresTotal.second.rows);
                setCardListLoading(false);
            })
    }

    const onChange = () => {
        
    };

    const plusRecipe = () => {}
    const minesRecipe = () => {}

    let cartRecipeList = <><Card className="wd100" loading={CardListLoading}></Card></>
    let cartGroceryList = <><Card className="wd100" loading={CardListLoading}></Card></>
    let cartEtcList = <><Card className="wd100" loading={CardListLoading}></Card></>

    if(!CardListLoading){
        cartRecipeList = CartRecipeList && CartRecipeList.map( cartRecipe => 
            <div className="wd100 lh32">
                <Row>
                    <Col span={12}><span>{cartRecipe.title}</span></Col>
                    <Col span={6}>
                        <div className="wd100" style={{float:'right'}}>
                            <span style={{marginLeft:'10px'}}>{cartRecipe.total_amount}</span>
                            <span style={{marginLeft:'10px'}}>인분</span>
                        </div>
                    </Col>
                    <Col span={3}>
                        <Button type="dashed" className="wd100" onClick={() => { plusRecipe(); }}><PlusOutlined /></Button>
                    </Col>
                    <Col span={3}>
                    <Button type="dashed" className="wd100" onClick={() => { minesRecipe(); }}><MinusOutlined/></Button>
                    </Col>
                </Row>
            </div>
        )
        cartGroceryList = CartGroceryList && CartGroceryList.map( cartGrocery => 
            <div className="wd100 mgb10">
                <Checkbox onChange={onChange}>
                    <span>{cartGrocery.grocery_name}</span>
                    <span> - </span>
                    <span>{cartGrocery.sum}</span>
                    <span>{Comm.coalesce(cartGrocery.grocery_unit_name,'g')}</span>
                    <span>{Comm.coalesce(cartGrocery.grocery_unit_per_gram,'')}</span>
                </Checkbox>
            </div>
        )
    }         
    
    return (
        <div style={{display:(CartListVisible?'block':'none')}}>
            <Collapse defaultActiveKey={['2']}>
                <Panel header="레시피리스트" key="1">{cartRecipeList}</Panel>
                <Panel header="식재료리스트" key="2">{cartGroceryList}</Panel>
                <Panel header="가감리스트" key="3"><p>123</p></Panel>
            </Collapse>
        </div>
    )
}

export default CartListPage