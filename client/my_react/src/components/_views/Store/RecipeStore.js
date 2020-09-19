import React, { useState } from 'react'

export const RecipeContext = React.createContext();

function RecipeStore(props) {

    const [DrawVisible, setDrawVisible] = useState(false);

    const [CurrentPageInRecipeStep, setCurrentPageInRecipeStep] = useState(0);
    const [TotalPageInRecipeStep, setTotalPageInRecipeStep] = useState(0);
    const [RecipeStepConfirmVisible, setRecipeStepConfirmVisible] = useState(false);
    const [RecipeList, setRecipeList] = useState([]);

    const [RecipeStep, setRecipeStep] = useState([]);
    

    return (
        <RecipeContext.Provider value={{
            DrawVisible, setDrawVisible,
            CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
            TotalPageInRecipeStep, setTotalPageInRecipeStep,
            RecipeStep, setRecipeStep,
            RecipeStepConfirmVisible, setRecipeStepConfirmVisible,
            RecipeList, setRecipeList
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

export default RecipeStore;
