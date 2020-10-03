import React, { useContext } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import RecipeStepItem from './Sections/RecipeStepItem'
import GroceryItem from './Sections/GroceryItem'
import RecipeInfo from './Sections/RecipeInfo'
import { Drawer, Button, Form, Divider, message, Input } from 'antd';
import axios from 'axios'
import './RecipeAddPage.css'

function RecipeAddPage() {

    const {
        AddPageVisible, setAddPageVisible,
        RecipeList, setRecipeList,
        setRecipeListVisible,
        setCartListVisible,
        setCookListVisible,
        setCurrentPageInRecipeStep,
        setTotalPageInRecipeStep,
        DetailPageVisible,
        RecipeDetailData,
    } = useContext(RecipeContext);

    const [ groceryForm ] = Form.useForm();

    const closeDrawer = () => {
        setAddPageVisible(false);
        setCurrentPageInRecipeStep(1)
        setTotalPageInRecipeStep(RecipeDetailData.steps.length);
        groceryForm.resetFields();
    }

    function onAdd() {

        const myNode = document.querySelectorAll(".recipe-form")[0];

        let recipeData = {
            user_id: 'dellose',
            title: myNode.querySelectorAll(".recipe-title-input")[0].value,
            description: myNode.querySelectorAll(".recipe-description-input")[0].value,
            min: myNode.querySelectorAll(".recipe-min-input input")[0].value,
            serving: myNode.querySelectorAll(".recipe-serving-input input")[0].value,
            grocerys: [],
            steps: []
        }

        Array.prototype.forEach.call(myNode.querySelectorAll(".recipe-grocery"), function (el, i) {
            recipeData.grocerys.push({
                srno: Number(el.querySelectorAll(".grocery-name")[0].getAttribute('grocery-srno')),
                amount: Number(el.querySelectorAll(".grocery-amount input")[0].value)
            });
        });

        Array.prototype.forEach.call(myNode.querySelectorAll(".recipe-step"), function (el, i) {
            recipeData.steps.push({
                url: (el.querySelectorAll(".dropzone img")[0] ? el.querySelectorAll(".dropzone img")[0].src : ''),
                title: el.querySelectorAll(".step-title")[0].value,
                description: el.querySelectorAll(".step-description")[0].value,
                title_url_yn: ('block' === el.querySelectorAll(".title-image")[0].style.display ? 'Y' : 'N')
            });
        });

        addRecipe(recipeData);
    }

    function addRecipe(recipeData) {
        axios.post('/api/recipe/addRecipe', recipeData)
            .then(response => {
                closeDrawer();
                getRecipeListBySrno(Number(response.data.qresTotal.first.rows[0].recipe_srno));
                message.success('레시피가 추가되었습니다.');
            })
    }

    function getRecipeListBySrno(recipeSrno) {
        axios.post('/api/recipe/getRecipeListBySrno', { recipe_srno: recipeSrno })
            .then(response => {
                setRecipeList([...response.data.qres1.rows, ...RecipeList]);
                setRecipeListVisible(true);
                setCartListVisible(false);
                setCookListVisible(false);
                var elements = document.querySelectorAll('.tab-item')
                Array.prototype.forEach.call(elements, function (el) {
                    el.classList.remove('on');
                });
                document.querySelectorAll('.tab-item.recipe')[0].classList.add('on');
            })
    }

    return (
        <>
            <Drawer
                title={DetailPageVisible?"레시피수정":"레시피추가"}
                placement="bottom"
                width="100%"
                height="100%"
                closable={true}
                onClose={closeDrawer}
                visible={AddPageVisible}
            >
                <div className="drawer-form">
                    <RecipeInfo />
                    <Divider />
                    <GroceryItem form={groceryForm}/>
                    <Divider />
                    <RecipeStepItem />
                    <div className="recipe-add-btn">
                        <Button className="wd100" onClick={onAdd}>{DetailPageVisible?"수정":"추가"}</Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default RecipeAddPage
