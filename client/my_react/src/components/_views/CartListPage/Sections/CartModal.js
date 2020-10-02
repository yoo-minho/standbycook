import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore.js'
import { Row, Col, Modal, InputNumber, Form, message } from 'antd';
import axios from 'axios'

function CartModal() {

    const {
        CartUpdateModalVisible, setCartUpdateModalVisible,
        CartDeleteModalVisible, setCartDeleteModalVisible,
        CartModalData, setCartModalData,
        setCartRecipeList,
        setCartGroceryList,
        setCardListLoading,
    } = useContext(RecipeContext);

    function updateRecipeInCart(userId) {
        let data = {
            user_id: userId,
            recipe_srno: CartModalData.recipe_srno,
            total_amount: document.querySelectorAll(".cart-modal-number input")[0].value
        }
        axios.post('/api/recipe/updateRecipeInCart', data)
            .then(response => {
                getCartList('dellose');
                setCartUpdateModalVisible(false);
                message.success('장볼레시피 수량이 수정되었습니다.');
            })
    }

    function deleteRecipeInCart(userId) {
        axios.post('/api/recipe/deleteRecipeInCart', {
            user_id: userId,
            recipe_srno: CartModalData.recipe_srno
        }).then(response => {
            getCartList('dellose');
            setCartDeleteModalVisible(false);
            message.success('장볼레시피가 삭제되었습니다.');
        })
    }

    function getCartList(userId) {
        axios.post('/api/recipe/getCartList', { user_id: userId })
            .then(response => {
                setCartRecipeList(response.data.qresTotal.first.rows);
                setCartGroceryList(response.data.qresTotal.second.rows);
                setCardListLoading(false);
            })
    }

    const onModalInputChange = (num) => {
        setCartModalData({
            recipe_srno: CartModalData.recipe_srno,
            title: CartModalData.title,
            total_amount: num
        })
    }

    const handleUpdateOk = (e) => updateRecipeInCart('dellose');

    const handleUpdateCancel = () => {
        setCartUpdateModalVisible(false)
        modalForm.resetFields();
    }

    const handleDeleteOk = (e) => deleteRecipeInCart('dellose');

    const handleDeleteCancel = (e) => setCartDeleteModalVisible(false);

    const [modalForm] = Form.useForm();

    return (
        <>
            <Modal
                title="장볼레시피 수정하기 (인분)"
                visible={CartUpdateModalVisible}
                okText="수정하기"
                cancelText="취소하기"
                onOk={handleUpdateOk}
                onCancel={handleUpdateCancel}
            >
                <Form form={modalForm}>
                    <Form.Item name="modal-num" className="mgb10">
                        <Row recipe-srno={CartModalData.recipe_srno}>
                            <Col span="12" className="lh32">{CartModalData.title}</Col>
                            <Col span="6">
                                <InputNumber className="cart-modal-number wd100"
                                    min={1} max={10} step={1}
                                    value={CartModalData.total_amount}
                                    onChange={onModalInputChange} />
                            </Col>
                            <Col span="6" className="lh32">&nbsp;&nbsp;인분</Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="장볼레시피 삭제하기"
                visible={CartDeleteModalVisible}
                okText="삭제하기"
                cancelText="취소하기"
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}
            >삭제해도 되겠습니까?</Modal>
        </>
    )
}

export default CartModal
