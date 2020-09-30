import React, { useContext, useEffect } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Collapse, Checkbox, Card, Badge, Row, Col, Modal, InputNumber, message, Form } from 'antd';
import axios from 'axios'
import { EditOutlined, CloseOutlined, ReadOutlined } from '@ant-design/icons';
import './CartListPage.css'
import Comm from '../Comm/Comm'

function CartListPage() {

    const {
        CartListVisible,
        CartRecipeList, setCartRecipeList,
        CartGroceryList, setCartGroceryList,
        CartEtcList, setCartEtcList,
        CardListLoading, setCardListLoading,
        setRecipeDetailLoading,
        setDetailPageVisible,
        setRecipeDetailRecipeSrno,
        CartModalVisible, setCartModalVisible,
        CartModalData, setCartModalData
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

    const [modalForm] = Form.useForm();

    const showDetailPage = (recipeSrno) => {
        setRecipeDetailLoading(true);
        setDetailPageVisible(true);
        setRecipeDetailRecipeSrno(recipeSrno);
    }

    const handleShowModal = (data) => {
        setCartModalData(data);
        setCartModalVisible(true);
    }

    const handleOk = (e) => {
        let data = {
            user_id: 'dellose',
            recipe_srno: CartModalData.recipe_srno,
            total_amount: document.querySelectorAll(".cart-modal-number input")[0].value
        }
        axios.post('/api/recipe/updateRecipeInCart', data)
            .then(response => {
                getCartList('dellose');
                setCartModalVisible(false);
                message.success('장볼레시피 수량이 수정되었습니다.');
            })
    }
    const handleCancel = () => {
        setCartModalVisible(false)
        modalForm.resetFields();
    }

    const onModalInputChange = (num) => {
        console.log(CartModalData)
        setCartModalData({
            recipe_srno:CartModalData.recipe_srno,
            title:CartModalData.title,
            total_amount:num
        })
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
                    <Col span={2} style={{ textAlign: 'center' }} onClick={() => { handleShowModal(cartRecipe) }}><EditOutlined /></Col>
                    <Col span={2} style={{ textAlign: 'center' }}><CloseOutlined /></Col>
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
                    <Col span={2} style={{ textAlign: 'center' }}><ReadOutlined /></Col>
                    <Col span={2} style={{ textAlign: 'center' }}><EditOutlined /></Col>
                    <Col span={2} style={{ textAlign: 'center' }}><CloseOutlined /></Col>
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
                <Panel header="추가/제외 식재료" key="3"><p>123</p></Panel>
            </Collapse>
            <Modal
                title="장볼레시피 수정하기 (인분)"
                visible={CartModalVisible}
                okText="수정하기"
                cancelText="취소하기"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={modalForm}>
                    <Form.Item name="modal-num" className="mgb10">
                        <Row recipe-srno={CartModalData.recipe_srno}>
                            <Col span="12" className="lh32">{CartModalData.title}</Col>
                            <Col span="6">
                                <InputNumber className="cart-modal-number wd100"
                                    min={1} max={10} step={1}
                                    value={CartModalData.total_amount} 
                                    onChange={onModalInputChange}/>
                            </Col>
                            <Col span="6" className="lh32">&nbsp;&nbsp;인분</Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CartListPage