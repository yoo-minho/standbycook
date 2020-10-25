import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore.js'
import { Row, Pagination, Typography } from 'antd';

function Steps() {

    const {
        TotalPageInRecipeStep,
        CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
        RecipeDetailData,
    } = useContext(RecipeContext);

    const { Text } = Typography;

    return (
        <Row className="mgb10 lh32">
            <Text className="mgb10" strong>레시피스텝</Text>
            <div>
                {RecipeDetailData.steps && RecipeDetailData.steps.map((step, index) => 
                    <div key={index} className="recipe-step mgb10"  style={{ display: (CurrentPageInRecipeStep === (index+1)?'block':'none') }} >
                        <div>
                            <div className = "dropzone recipe-detail"><img className="recipe-image" alt={step.title} src={step.url}></img></div>
                            <Row><Text className="step-title" strong>{step.title}</Text></Row>
                            <Row className="lh22"><Text className="step-description">{step.description}</Text></Row>
                        </div>
                    </div>
                )} 
            </div>
            <Pagination 
                className='mga'
                size="small" defaultPageSize={1}
                current={CurrentPageInRecipeStep} 
                total={TotalPageInRecipeStep} 
                onChange={setCurrentPageInRecipeStep}
            />
        </Row>  
    )
}

export default Steps
