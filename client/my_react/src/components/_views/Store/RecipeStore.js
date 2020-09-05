import React, { useState } from 'react'

export const RecipeContext = React.createContext();

function RecipeStore(props) {

    const [DrawVisible, setDrawVisible] = useState(false);

    const [CurrentPageInRecipeStep, setCurrentPageInRecipeStep] = useState(0);
    const [TotalPageInRecipeStep, setTotalPageInRecipeStep] = useState(0);

    return (
        <RecipeContext.Provider value={{
            DrawVisible, setDrawVisible,
            CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
            TotalPageInRecipeStep, setTotalPageInRecipeStep
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

export default RecipeStore;
