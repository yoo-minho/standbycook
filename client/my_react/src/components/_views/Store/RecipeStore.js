import React, { useState } from 'react'

export const RecipeContext = React.createContext();

function RecipeStore(props) {

    //visible
    const [RecipeListVisible, setRecipeListVisible] = useState(true);
    const [CartListVisible, setCartListVisible] = useState(false);
    const [CookListVisible, setCookListVisible] = useState(false);
    const [AddPageVisible, setAddPageVisible] = useState(false);
    const [DetailPageVisible, setDetailPageVisible] = useState(false);
    const [RecipeStepConfirmVisible, setRecipeStepConfirmVisible] = useState(false);
    const [CartModalVisible, setCartModalVisible] = useState(false);

    //loading
    const [RecipeDetailLoading, setRecipeDetailLoading] = useState(true);
    const [RecipeListLoading, setRecipeListLoading] = useState(true);
    const [CardListLoading, setCardListLoading] = useState(true);

    //one-data
    const [RecipeDetailRecipeSrno, setRecipeDetailRecipeSrno] = useState("");
    const [CurrentPageInRecipeStep, setCurrentPageInRecipeStep] = useState(0);
    const [TotalPageInRecipeStep, setTotalPageInRecipeStep] = useState(0);

    //datas
    const [RecipeDetailData, setRecipeDetailData] = useState({});    
    const [RecipeList, setRecipeList] = useState([]);
    const [GroceryList, setGroceryList] = useState([]);
    const [RecipeStep, setRecipeStep] = useState([]);
    const [CartRecipeList, setCartRecipeList] = useState([]);
    const [CartGroceryList, setCartGroceryList] = useState([]);
    const [CartEtcList, setCartEtcList] = useState([]);
    const [CartModalData, setCartModalData] = useState({});
    
    return (
        <RecipeContext.Provider value={{
            CartModalData, setCartModalData,
            CartModalVisible, setCartModalVisible,
            RecipeListVisible, setRecipeListVisible,
            CartListVisible, setCartListVisible,
            CookListVisible, setCookListVisible,
            AddPageVisible, setAddPageVisible,
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
