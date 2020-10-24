import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore.js'
import { Row, Typography, message, Button } from 'antd';
import axios from 'axios'

function ContentPopover() {

    const {
        RecipeDetailRecipeSrno, setRecipeDetailRecipeSrno,
        RecipeDetailData, setRecipeDetailData,
        setDetailPageVisible,
        setRecipeListVisible,
        setCartListVisible,
        setCookListVisible,
        RecipeList, setRecipeList,
    } = useContext(RecipeContext);

    const { Text } = Typography;

    const onBack = () => { 
        setDetailPageVisible(false);
        setRecipeDetailData({});
        setRecipeDetailRecipeSrno("");
    }

    const removeRecipe = () => {
        axios.post('/api/recipe/removeRecipe',{recipe_srno:RecipeDetailRecipeSrno})
            .then(() => {
                setRecipeList(RecipeList.filter(recipe => recipe.recipe_srno != RecipeDetailRecipeSrno));
                setRecipeListVisible(true);
                setCartListVisible(false);
                setCookListVisible(false);
                document.querySelectorAll('.tab-item').forEach((el) => {el.classList.remove('on')})
                document.querySelectorAll('.tab-item.recipe')[0].classList.add('on');
                document.querySelectorAll('.ant-popover')[0].classList.add('ant-popover-hidden');
                onBack();
                message.success('레시피가 삭제되었습니다.');
            })
    }

    return (
        <div>
            <Row style={{ }}><Text strong>레시피설명</Text></Row>
            <Row className='mgb10'><Text>{RecipeDetailData.description}</Text></Row>
            <Row className='mgb10a lh32'><Text strong>레시피등록아이디</Text></Row>
            <Row className='mgb10 lh32'><Text>{RecipeDetailData.register_id}</Text></Row>
            <Row className='mgb10a lh32' ><Text strong>레시피등록일시</Text></Row>
            <Row className='mgb10 lh32' ><Text>{RecipeDetailData.register_datetime}</Text></Row>
            {RecipeDetailData.register_id === 'dellose' &&
                <Row className='mgb10 lh32'>
                    <Button className='wd100' onClick={removeRecipe}>레시피삭제</Button>
                </Row>
            }
        </div>
    )
}

export default ContentPopover
