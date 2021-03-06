import React, { useState } from 'react'

export const RecipeContext = React.createContext();

function RecipeStore(props) {

    //visible
    const [RecipeListVisible, setRecipeListVisible] = useState(true);
    const [CartListVisible, setCartListVisible] = useState(false);
    const [CookListVisible, setCookListVisible] = useState(false);
    const [EditPageVisible, setEditPageVisible] = useState(false);
    const [DetailPageVisible, setDetailPageVisible] = useState(false);
    const [RecipeStepConfirmVisible, setRecipeStepConfirmVisible] = useState(false);
    const [CartUpdateModalVisible, setCartUpdateModalVisible] = useState(false);
    const [CartDeleteModalVisible, setCartDeleteModalVisible] = useState(false);
    const [MyPageVisible, setMyPageVisible] = useState(false);
    const [TimerPageVisible, setTimerPageVisible] = useState(false);
    const [TimerModalVisible, setTimerModalVisible] = useState(false);

    //loading
    const [RecipeDetailLoading, setRecipeDetailLoading] = useState(true);
    const [RecipeListLoading, setRecipeListLoading] = useState(true);
    const [CardListLoading, setCardListLoading] = useState(true);

    //one-data
    const [RecipeDetailRecipeSrno, setRecipeDetailRecipeSrno] = useState("");
    const [CurrentPageInRecipeStep, setCurrentPageInRecipeStep] = useState(0);
    const [TotalPageInRecipeStep, setTotalPageInRecipeStep] = useState(0);

    //datas
    const [RecipeFields, setRecipeFields] = useState([{"name": ["min"],"value": "10"},{"name": ["serving"],"value": "2"}]);  
    const [RecipeTitleImageYnFields, setRecipeTitleImageYnFields] = useState([]);  
    const [RecipeDetailData, setRecipeDetailData] = useState({});    
    const [RecipeStepInputList, setRecipeStepInputList] = useState([]);
    const [GroceryInputList, setGroceryInputList] = useState([]);
    const [RecipeList, setRecipeList] = useState([]);
    const [GroceryList, setGroceryList] = useState([]);
    const [RecipeStep, setRecipeStep] = useState([]);
    const [CartRecipeList, setCartRecipeList] = useState([]);
    const [CartGroceryList, setCartGroceryList] = useState([]);
    const [CartEtcList, setCartEtcList] = useState([]);
    const [CartModalData, setCartModalData] = useState({});
    const [TimerList, setTimerList] = useState([]);
    
    return (
        <RecipeContext.Provider value={{
            RecipeFields, setRecipeFields,
            RecipeTitleImageYnFields, setRecipeTitleImageYnFields,
            RecipeStepInputList, setRecipeStepInputList,
            GroceryInputList, setGroceryInputList,
            TimerList, setTimerList,
            TimerModalVisible, setTimerModalVisible,
            MyPageVisible, setMyPageVisible,
            TimerPageVisible, setTimerPageVisible,
            CartModalData, setCartModalData,
            CartUpdateModalVisible, setCartUpdateModalVisible,
            CartDeleteModalVisible, setCartDeleteModalVisible,
            RecipeListVisible, setRecipeListVisible,
            CartListVisible, setCartListVisible,
            CookListVisible, setCookListVisible,
            EditPageVisible, setEditPageVisible,
            DetailPageVisible, setDetailPageVisible,
            RecipeDetailRecipeSrno, setRecipeDetailRecipeSrno,
            RecipeDetailData, setRecipeDetailData,
            RecipeDetailLoading, setRecipeDetailLoading,
            CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
            TotalPageInRecipeStep, setTotalPageInRecipeStep,
            RecipeStep, setRecipeStep,
            RecipeStepConfirmVisible, setRecipeStepConfirmVisible,
            RecipeList, setRecipeList,
            RecipeListLoading, setRecipeListLoading,
            GroceryList, setGroceryList, 
            CardListLoading, setCardListLoading,
            CartRecipeList, setCartRecipeList,
            CartGroceryList, setCartGroceryList,
            CartEtcList, setCartEtcList,
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

export default RecipeStore;
