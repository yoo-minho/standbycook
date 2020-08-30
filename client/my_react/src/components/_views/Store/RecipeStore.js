import React, { useState } from 'react'

export const RecipeContext = React.createContext();

function RecipeStore(props) {

    const [DrawVisible, setDrawVisible] = useState(false);
    const [PageInAdd, setPageInAdd] = useState(0);
    const [TotalInAdd, setTotalInAdd] = useState(0);

    return (
        <RecipeContext.Provider value={{
            DrawVisible, setDrawVisible,
            PageInAdd, setPageInAdd,
            TotalInAdd, setTotalInAdd
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

export default RecipeStore;
