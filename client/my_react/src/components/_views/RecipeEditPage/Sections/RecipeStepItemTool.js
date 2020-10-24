import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Button, Pagination, Row, Col, message } from 'antd';
import { MinusOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

function RecipeStepItemTool(props) {

    const srno = props.srno;

    const {
        CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
        TotalPageInRecipeStep, setTotalPageInRecipeStep,
        RecipeStepInputList, setRecipeStepInputList,
    } = useContext(RecipeContext);

    const removeRecipeStep = (targetSrno) => {
        setTotalPageInRecipeStep(TotalPageInRecipeStep - 1);
        setCurrentPageInRecipeStep(CurrentPageInRecipeStep - 1 < 1 ? 1 : CurrentPageInRecipeStep - 1);
        setRecipeStepInputList(RecipeStepInputList.filter(item => Number(item.srno) !== Number(targetSrno)));
    };

    const moveLeftStep = () => {
        if (CurrentPageInRecipeStep > 1) {
            moveStep(CurrentPageInRecipeStep - 2);
        } else {
            message.warning('첫번째 스텝입니다.');
        }
    }

    const moveRightStep = () => {
        if (CurrentPageInRecipeStep < TotalPageInRecipeStep) {
            moveStep(CurrentPageInRecipeStep);
        } else {
            message.warning('마지막 스텝입니다.');
        }
    }

    const moveStep = (step) => {
        const tmpData = RecipeStepInputList[step];
        RecipeStepInputList[step] = RecipeStepInputList[CurrentPageInRecipeStep - 1]
        RecipeStepInputList[CurrentPageInRecipeStep - 1] = tmpData;
        setCurrentPageInRecipeStep(step + 1);
    }
    
    return (
        <Row className="mgb10">
            <Col span={16} >
                <Pagination
                    className="mgb10" size="small" defaultPageSize={1}
                    current={CurrentPageInRecipeStep} total={TotalPageInRecipeStep}
                    onChange={setCurrentPageInRecipeStep} />
            </Col>
            <Col span={2}><Button type="dashed" className="pd0 wd100" onClick={moveLeftStep}><CaretLeftOutlined /></Button></Col>
            <Col span={2}><Button type="dashed" className="pd0 wd100" onClick={moveRightStep}><CaretRightOutlined /></Button></Col>
            <Col span={4}>
                <Button type="dashed" className="wd100" onClick={() => removeRecipeStep(srno)}><MinusOutlined /></Button>
            </Col>
        </Row>
    )
}

export default RecipeStepItemTool
