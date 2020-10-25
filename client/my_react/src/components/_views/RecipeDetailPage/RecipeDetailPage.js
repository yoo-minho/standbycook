import React, { useContext } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Drawer, Row, Col, Divider, Card} from 'antd';
import Grocerys from './Sections/Grocerys'
import Steps from './Sections/Steps'
import TitleArea from './Sections/TitleArea'
import ButtonArea from './Sections/ButtonArea'

import './RecipeDetailPage.css'

function RecipeDetailPage() {

    console.log("RecipeDetailPage")

    const {
        DetailPageVisible, 
        RecipeDetailLoading, 
    } = useContext(RecipeContext);

    const loadingView = (<Row className="mgb10">
        <Col span={24} ><Card className="wd100" loading={RecipeDetailLoading}></Card></Col><Divider />
        <Col span={24} ><Card className="wd100" loading={RecipeDetailLoading}></Card></Col><Divider />
        <Col span={24} ><Card className="wd100" loading={RecipeDetailLoading}></Card></Col>
    </Row>)

    return (
            <Drawer
                className="recipe-detail-page"
                title={<TitleArea />}
                placement="right"
                width = "100%"
                height = "100%"
                closable={false}
                visible={DetailPageVisible}
                style={{zIndex:'999'}}
            >
                {RecipeDetailLoading ? loadingView : <div className='mgb73'>
                    <Grocerys />
                    <Steps />
                    <ButtonArea />
                </div>}
            </Drawer>
    )
}

export default RecipeDetailPage
