import React, { useState } from 'react'
import { withRouter } from 'react-router-dom' 
import TabItem from './Sections/TabItem'
import { Layout, Drawer, Typography, Row } from 'antd';
import './NavBar.css'

function NavBar() {

    const [visible, setVisible] = useState(false);
    const showDrawer = () => setVisible(true)
    const onClose = () => setVisible(false)
    const { Header, Footer } = Layout;
    const { Text } = Typography;

    return (           
      <>
          <Layout className="site-layout">
            <Header className="header">
              <div className="logo"><Text strong>장볼레시피</Text></div>
              <div className="menu">
                <div className="menu-icon">🍳</div>
                <div className="menu-icon" onClick={showDrawer}>🍔</div>
              </div>
            </Header>
            <Footer className="footer" style={{textAlign:'center'}}>
              <Row gutter={[16, 16]}>
                <TabItem gubun="recipe" selectYn="Y"/>
                <TabItem gubun="cart"/>
                <TabItem gubun="cook"/>
                <TabItem gubun="add"/>
              </Row>
            </Footer >
          </Layout>
          <Drawer
            title="My Page"
            placement="right"
            width = "100%"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </>
    )

}

export default withRouter(NavBar)