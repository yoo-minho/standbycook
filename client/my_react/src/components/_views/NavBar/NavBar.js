import React from 'react'
import './NavBar.css'
import { Layout, Menu, Typography, PageHeader, Avatar, Row, Col, Button, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom' 

function NavBar(props) {

    const { Header, Content, Footer, Sider } = Layout;

    if(window.location.pathname === '/login' ||  window.location.pathname === '/register'){
        localStorage.setItem('showSideYn', 'N');
    } else {
        localStorage.setItem('showSideYn', 'Y');
    }

    const getContent = props.content;

    return (           

          <Layout className="site-layout">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background:'#5f0080', height:'fit-content', padding:'0px' }}>
              <div className="logo" />
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
    )
}

export default withRouter(NavBar)