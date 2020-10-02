import React, { useContext } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { withRouter } from 'react-router-dom'
import TabItem from './Sections/TabItem'
import { Layout, Typography, Row } from 'antd';
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import RecipeTimerPage from '../RecipeTimerPage/RecipeTimerPage'
import MyPage from '../MyPage/MyPage'
import './NavBar.css'

function NavBar() {

  const {
    setMyPageVisible,
    setTimerPageVisible,
    TimerList,
  } = useContext(RecipeContext);

  const showMyPage = () => setMyPageVisible(true)
  const showTimerPage = () => setTimerPageVisible(true)
  const { Header, Footer } = Layout;
  const { Text } = Typography;

    return (
    <>
      <Layout className="site-layout">
        <Header className="header">
          <div className="logo"><Text strong>장볼레시피</Text></div>
          <div className="menu">
            <div className={TimerList.length > 0 ? "menu-icon timer on" : "menu-icon timer"} onClick={showTimerPage}>
                <FieldTimeOutlined/>
            </div>
            <div className="menu-icon" onClick={showMyPage}><UserOutlined /></div>
          </div>
        </Header>
        <Footer className="footer" style={{ textAlign: 'center' }}>
          <Row gutter={[16, 16]}>
            <TabItem gubun="recipe" selectYn="Y" />
            <TabItem gubun="cart" />
            <TabItem gubun="cook" />
            <TabItem gubun="add" />
          </Row>
        </Footer >
      </Layout>
      <RecipeTimerPage/>
      <MyPage/>
    </>
  )

}

export default withRouter(NavBar)