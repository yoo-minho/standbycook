import React, { useState } from 'react'

export const RecipeContext = React.createContext();

function RecipeStore(props) {

    const [AddPageVisible, setAddPageVisible] = useState(false);
    const [DetailPageVisible, setDetailPageVisible] = useState(false);
    const [RecipeDetailRecipeSrno, setRecipeDetailRecipeSrno] = useState("");
    const [RecipeDetailData, setRecipeDetailData] = useState({});
    const [RecipeDetailLoading, setRecipeDetailLoading] = useState(true);

    const [CurrentPageInRecipeStep, setCurrentPageInRecipeStep] = useState(0);
    const [TotalPageInRecipeStep, setTotalPageInRecipeStep] = useState(0);
    const [RecipeStepConfirmVisible, setRecipeStepConfirmVisible] = useState(false);
    const [RecipeList, setRecipeList] = useState([]);
    const [RecipeListLoading, setRecipeListLoading] = useState(true);

    const [GroceryList, setGroceryList] = useState([]);

    const [RecipeStep, setRecipeStep] = useState([]);
    

    return (
        <RecipeContext.Provider value={{
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
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

export default RecipeStore;
