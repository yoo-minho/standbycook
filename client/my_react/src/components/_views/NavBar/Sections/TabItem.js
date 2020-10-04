import React, { useContext } from 'react'
import { Col } from 'antd';
import { RecipeContext } from '../../Store/RecipeStore'
import { FieldTimeOutlined, ProfileOutlined, ShoppingCartOutlined, DatabaseOutlined, ScheduleOutlined, PlusOutlined } from '@ant-design/icons'
import RecipeAddPage from '../../RecipeAddPage/RecipeAddPage'
import './TabItem.css'

function TabItem(props) {

    const {
        setAddPageVisible,
        RecipeListVisible, setRecipeListVisible,
        CartListVisible, setCartListVisible,
        setCookListVisible,
        setGroceryInputList,
        setRecipeStepInputList,
        setCurrentPageInRecipeStep,
        setTotalPageInRecipeStep,
    } = useContext(RecipeContext);

    function showAddPageDrawer(){
        setGroceryInputList([]);
        setRecipeStepInputList([]);
        setCurrentPageInRecipeStep(0);
        setTotalPageInRecipeStep(0);
        setAddPageVisible(true);
    }

    const changeTab = (e) => {
         if(props.gubun === 'add'){
            showAddPageDrawer();
        } else {
            setRecipeListVisible((props.gubun === 'recipe') ? true : false);
            setCartListVisible((props.gubun === 'cart') ? true : false);
            setCookListVisible((props.gubun === 'cook') ? true : false);
            var elements = document.querySelectorAll('.tab-item')
            Array.prototype.forEach.call(elements, function(el){
                el.classList.remove('on');
            });
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
    } else if(props.gubun === 'fridge'){
        tabText = "냉장고";
        tabIcon = <DatabaseOutlined className="tab-icon"/>
    } else if(props.gubun === 'cook'){
        tabText = "요리블로그";
        tabIcon = <ScheduleOutlined className="tab-icon"/>
    } else if(props.gubun === 'add'){
        tabText = (RecipeListVisible ? "레시피추가" : CartListVisible ? "식재료추가" : "글쓰기") ;
        tabIcon = <PlusOutlined className="tab-icon"/>
    } else if (props.gubun === 'timer'){
        tabText = "요리타이머";
        tabIcon = <FieldTimeOutlined className="tab-icon"/>
    }  else {
        //pass
    }

    return (
        <>
            {props.gubun === 'add' && <RecipeAddPage/>}
            <Col className={tabClassName} span={6} onClick={changeTab}>
                <div className="tab-icon-div">{tabIcon}</div>
                <div className="tab-text">{tabText}</div>
            </Col>
        </>
    )
}

export default TabItem
