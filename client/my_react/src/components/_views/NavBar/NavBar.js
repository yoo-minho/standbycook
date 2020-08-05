import React, { useState } from 'react'
import './NavBar.css'
import { Layout, Menu, Drawer, Typography, PageHeader, Avatar, Row, Col, Button, Breadcrumb } from 'antd';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, withRouter } from 'react-router-dom' 

function NavBar(props) {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };

    const { Header, Content, Footer, Sider } = Layout;

    const getContent = props.content;

    return (           
      <>
          <Layout className="site-layout">
            <Header className="header">
              <div className="logo">STANDBYCOOK</div>
              <div className="menu">
                <div className="menu-icon">🍳</div>
                <div className="menu-icon" onClick={showDrawer}>🍔</div>
              </div>
              <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight:'42px'}}>
                <Menu.Item key="1">Recipe</Menu.Item>
                <Menu.Item key="2">Shopping</Menu.Item>
                <Menu.Item key="3">Fridge</Menu.Item>
                <Menu.Item key="4">Cook</Menu.Item>
              </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 0px', marginTop: 90 }}>
             {getContent}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
          <Drawer
            title="Basic Drawer"
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