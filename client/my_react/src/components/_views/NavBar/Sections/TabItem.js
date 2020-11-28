import React, { useContext } from 'react'
import { Col } from 'antd';
import { RecipeContext } from '../../Store/RecipeStore'
import { FieldTimeOutlined, ProfileOutlined, ShoppingCartOutlined, DatabaseOutlined, ScheduleOutlined, PlusOutlined } from '@ant-design/icons'
import RecipeEditPage from '../../RecipeEditPage/RecipeEditPage'
import './TabItem.css'

function TabItem(props) {

    const {
        RecipeListVisible, setRecipeListVisible,
        CartListVisible, setCartListVisible,
        setCookListVisible,
    } = useContext(RecipeContext);

    const changeTab = (e) => {
         if(props.gubun === 'add'){
            
        } else {
            setRecipeListVisible((props.gubun === 'recipe') ? true : false);
            setCartListVisible((props.gubun === 'cart') ? true : false);
            setCookListVisible((props.gubun === 'cook') ? true : false);
            document.querySelectorAll('.tab-item').forEach((el)=>{el.classList.remove('on')});
            e.currentTarget.classList.add('on');
        }
    }

    let tabText = "";
    let tabIcon = <></>;
    let tabClassName = ((props.selectYn === "Y") ? "tab-item on" : "tab-item") + " " + props.gubun;
    if(props.gubun === 'recipe'){
        tabText = "레시피월드";
        tabIcon = <ProfileOutlined className="tab-icon"/>
    } else if(props.gubun === 'cart'){
        tabText = "장볼리스트";
        tabIcon = <ShoppingCartOutlined className="tab-icon"/>
    } else if(props.gubun === 'cook'){
        tabText = "요리세줄일기";
        tabIcon = <ScheduleOutlined className="tab-icon"/>
    } else {
        //pass
    }

    return (
        <>
            <Col className={tabClassName} span={8} onClick={changeTab}>
                <div className="tab-icon-div">{tabIcon}</div>
                <div className="tab-text">{tabText}</div>
            </Col>
        </>
    )
}

export default TabItem
