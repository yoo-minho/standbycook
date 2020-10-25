import React, { useContext, useRef } from 'react'
import { RecipeContext } from '../../Store/RecipeStore.js'
import { Row, Col, Divider, Typography } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Comm from '../../Comm/Comm';

function Grocerys() {

    const {
        RecipeDetailData
    } = useContext(RecipeContext);

    const detailListRef = useRef();

    const { Text } = Typography;

    const clickUp = (e) => clickMoreButton(true,e)
    const clickDown = (e) => clickMoreButton(false,e)
    const clickMoreButton = (isUp, e) => {
        const thisNode = e.currentTarget.parentNode;
        if(thisNode && thisNode.children && thisNode.children.length === 2){
            if(isUp){
                thisNode.children[0].classList.add('off-off');
                thisNode.children[1].classList.remove('off-off');
                detailListRef.current.children[0].classList.add('reduce');
            } else {
                thisNode.children[0].classList.remove('off-off');
                thisNode.children[1].classList.add('off-off');
                detailListRef.current.children[0].classList.remove('reduce');
            }
        }
    }

    return (
        <>
            <Row className='mgb10 lh32'>
                <Col span={12}><Text strong>식재료</Text>&nbsp;<Text>{"(" + RecipeDetailData.serving + "인분 기준)"}</Text></Col>
                <Col span={12}>
                    <div style={{ float: 'right'}}>
                        <UpOutlined onClick={clickUp} className="off-off"/>
                        <DownOutlined onClick={clickDown}/>
                    </div>
                </Col>
            </Row>
            
            <div ref={detailListRef}>
                <Row className="mgb10 reduce grocery-detail-list">              
                    {RecipeDetailData.grocerys && RecipeDetailData.grocerys.map((grocery, index) => 
                        <Col key={index} span={12} className="recipe-grocery mgb10" >
                            <Text className="grocery-name" strong>{grocery.name}</Text>&nbsp;-&nbsp;
                            <Text className="grocery-amount">{grocery.amount}{Comm.coalesce(grocery.unit,'g')}</Text>
                        </Col>            
                    )}
                </Row>
            </div>
            <Divider />
        </>
    )
}

export default Grocerys
