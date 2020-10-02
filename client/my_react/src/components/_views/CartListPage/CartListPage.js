import React, { useContext, useEffect } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Collapse, Checkbox, Card, Badge, Row, Col } from 'antd';
import axios from 'axios'
import { EditOutlined, CloseOutlined, ReadOutlined } from '@ant-design/icons';
import './CartListPage.css'
import Comm from '../Comm/Comm'
import CartModal from './Sections/CartModal'

function CartListPage() {

    const {
        CartListVisible,
        CartRecipeList, setCartRecipeList,
        CartGroceryList, setCartGroceryList,
        CardListLoading, setCardListLoading,
        setRecipeDetailLoading,
        setDetailPageVisible,
        setRecipeDetailRecipeSrno,
        setCartUpdateModalVisible,
        setCartDeleteModalVisible,
        setCartModalData
    } = useContext(RecipeContext);

    const { Panel } = Collapse;

    useEffect(() => {
        CartListVisible && getCartList('dellose');
    }, [CartListVisible])

    function getCartList(userId) {
        axios.post('/api/recipe/getCartList', { user_id: userId })
            .then(response => {
                setCartRecipeList(response.data.qresTotal.first.rows);
                setCartGroceryList(response.data.qresTotal.second.rows);
                setCardListLoading(false);
            })
    }

    const onChange = () => {

    };

    const showDetailPage = (recipeSrno) => {
        setRecipeDetailLoading(true);
        setDetailPageVisible(true);
        setRecipeDetailRecipeSrno(recipeSrno);
    }

    const handleShowUpdateModal = (data) => {
        setCartModalData(data);
        setCartUpdateModalVisible(true);
        setCartDeleteModalVisible(false);
    }

    const handleShowDeleteModal = () => {
        setCartUpdateModalVisible(false);
        setCartDeleteModalVisible(true);
    }

    let cartRecipeList = <><Card className="wd100" loading={CardListLoading}></Card></>
    let cartGroceryList = <><Card className="wd100" loading={CardListLoading}></Card></>
    let cartEtcList = <><Card className="wd100" loading={CardListLoading}></Card></>

    if (!CardListLoading) {
        cartRecipeList = CartRecipeList && CartRecipeList.map((cartRecipe, index) =>
            <div className="wd100 lh32" key={index}>
                <Row>
                    <Col span={12}><span>{cartRecipe.title}</span></Col>
                    <Col span={6}>
                        <div className="wd100" style={{ float: 'right' }}>
                            <span>{cartRecipe.total_amount}</span>
                            <span>인분</span>
                        </div>
                    </Col>
                    <Col span={2} style={{ textAlign: 'center' }} onClick={() => { showDetailPage(cartRecipe.recipe_srno) }}><ReadOutlined /></Col>
                    <Col span={2} style={{ textAlign: 'center' }} onClick={() => { handleShowUpdateModal(cartRecipe) }}><EditOutlined /></Col>
                    <Col span={2} style={{ textAlign: 'center' }} onClick={handleShowDeleteModal}><CloseOutlined /></Col>
                </Row>
            </div>
        )
        cartGroceryList = CartGroceryList && CartGroceryList.map((cartGrocery, index) =>
            <div className="wd100 mgb10" key={index}>
                <Row>
                    <Col span={12}>
                        <Checkbox onChange={onChange}>
                            <span>{cartGrocery.grocery_name}</span>
                        </Checkbox>
                    </Col>
                    <Col span={6}>
                        <span>{cartGrocery.sum}</span>
                        <span>{Comm.coalesce(cartGrocery.grocery_unit_name, 'g')}</span>
                        <span>{Comm.coalesce(cartGrocery.grocery_unit_per_gram, '')}</span>
                    </Col>
                    <Col span={6} style={{ textAlign: 'center' }}></Col>
                </Row>
            </div>
        )
    }

    return (
        <div style={{ display: (CartListVisible ? 'block' : 'none') }}>
            <Collapse defaultActiveKey={['2']}>
                <Panel key="1" header={<>
                    <span>장볼레시피</span>
                    <span style={{ float: 'right', lineHeight: '0' }}>
                        <Badge className="site-badge-count-4" count={CartRecipeList.length} />
                    </span></>}
                >
                    {cartRecipeList}
                </Panel>
                <Panel key="2" header={<>
                    <span>장볼레시피의 식재료</span>
                    <span style={{ float: 'right', lineHeight: '0' }}>
                        <Badge className="site-badge-count-4" count={CartGroceryList.length} />
                    </span></>}
                >
                    {cartGroceryList}
                </Panel>
            </Collapse>
            <CartModal/>
        </div>
    )
}

export default CartListPage