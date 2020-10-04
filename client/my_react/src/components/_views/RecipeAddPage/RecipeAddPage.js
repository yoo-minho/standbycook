import React, { useContext } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import RecipeStepItem from './Sections/RecipeStepItem'
import GroceryItem from './Sections/GroceryItem'
import RecipeInfo from './Sections/RecipeInfo'
import { Drawer, Button, Divider, message } from 'antd';
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
        RecipeDetailRecipeSrno,
        RecipeDetailData, setRecipeDetailData
    } = useContext(RecipeContext);

    const closeDrawer = () => {
        setAddPageVisible(false);
        setCurrentPageInRecipeStep(1)
        if(RecipeDetailData.steps && RecipeDetailData.steps.length){
            setTotalPageInRecipeStep(RecipeDetailData.steps.length);
        }
    }

    function getRecipeData(){
        
        const infoNode = document.querySelectorAll(".form-recipe-info")[0];
        const groceryNode = document.querySelectorAll(".form-grocery")[0];
        const stepNode = document.querySelectorAll(".form-recipe-step")[0];

        let recipeData = {
            user_id: 'dellose',
            recipe_srno: Number(RecipeDetailData.recipe_srno),
            title: infoNode.querySelectorAll(".recipe-title-input")[0].value,
            description: infoNode.querySelectorAll(".recipe-description-input")[0].value,
            min: infoNode.querySelectorAll(".recipe-min-input input")[0].value,
            serving: groceryNode.querySelectorAll(".recipe-serving-input input")[0].value,
            grocerys: [],
            steps: []
        }

        Array.prototype.forEach.call(groceryNode.querySelectorAll(".recipe-grocery"), function (el) {
            recipeData.grocerys.push({
                srno: Number(el.querySelectorAll(".grocery-name")[0].getAttribute('grocery-srno')),
                amount: Number(el.querySelectorAll(".grocery-amount input")[0].value),
                name : el.querySelectorAll(".ant-select-selection-item")[0].textContent,
                unit : el.querySelectorAll(".grocery-unit")[0].textContent
            });
        });

        Array.prototype.forEach.call(stepNode.querySelectorAll(".recipe-step"), function (el) {
            recipeData.steps.push({
                srno : Number(el.getAttribute('srno')),
                url: (el.querySelectorAll(".dropzone img")[0] ? el.querySelectorAll(".dropzone img")[0].src : ''),
                title: el.querySelectorAll(".step-title")[0].value,
                description: el.querySelectorAll(".step-description")[0].value,
                title_url_yn: ('block' === el.querySelectorAll(".title-image")[0].style.display ? 'Y' : 'N')
            });
        });

        console.log(recipeData)

        return recipeData
    }

    function updateRecipe() {
        const tempRecipeData = getRecipeData();
        axios.post('/api/recipe/updateRecipe', tempRecipeData)
            .then(response => {
                closeDrawer();
                setRecipeList(RecipeList.map((recipe) => {
                    if(recipe.recipe_srno == RecipeDetailRecipeSrno){
                        recipe.title = tempRecipeData.title;
                        //recipe.url = tempRecipeData.steps.filter();
                    }
                    return recipe;
                }));
                setRecipeDetailData(tempRecipeData);
                message.success('레시피가 수정되었습니다.');
            })
    }

    function addRecipe() {
        const tempRecipeData = getRecipeData();
        axios.post('/api/recipe/addRecipe', tempRecipeData)
            .then(response => {
                closeDrawer();
                tempRecipeData.recipe_srno = response.data.recipe_srno
                setRecipeList([...[tempRecipeData], ...RecipeList]);
                setRecipeListVisible(true);
                setCartListVisible(false);
                setCookListVisible(false);
                var elements = document.querySelectorAll('.tab-item')
                Array.prototype.forEach.call(elements, function (el) {
                    el.classList.remove('on');
                });
                document.querySelectorAll('.tab-item.recipe')[0].classList.add('on');
                message.success('레시피가 추가되었습니다.');
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
                    <GroceryItem />
                    <Divider />
                    <RecipeStepItem />
                    <div className="recipe-add-btn">
                        <Button className="wd100" onClick={DetailPageVisible ? updateRecipe : addRecipe}>{DetailPageVisible?"수정":"추가"}</Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default RecipeAddPage
