import React from 'react'
import './NavBar.css'
import { Layout, Menu, Typography, PageHeader, Avatar, Row, Col, Button, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom' 
import {
  VideoCameraOutlined,
  YoutubeFilled,
  ReadOutlined,
  UserOutlined,
  createFromIconfontCN
} from '@ant-design/icons';


const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1883371_ll8x609dn1l.js'
  ],
});

function NavBar(props) {

    if(window.location.pathname === '/login' ||  window.location.pathname === '/register'){
        localStorage.setItem('showSideYn', 'N');
    } else {
        localStorage.setItem('showSideYn', 'Y');
    }

    const getContent = props.content;

    const pathName = window.location.pathname.replace("/","");

    const headerTitle = pathName === "" ? "Home" : pathName;

    const menuClick = (e) => {
        localStorage.setItem('menuKey', e.key);
        forwordUrl(e);
    }

    const signClick = (e) => {
        localStorage.setItem('showSideYn', 'N');
        forwordUrl(e);
    }

    const forwordUrl = (e) => {
        if(e.item){
          console.log(e.item.props.openKeys)
          localStorage.setItem('defaultOpenKeys', e.item.props.openKeys);
        } else {
          //done
        }
        let returnUrl = e.item ? e.item.props.link : e.currentTarget ? e.currentTarget.getAttribute("link") :"/";
        props.history.push(returnUrl);
    }

    const onClick2 = () => {
      console.log(111);
    }

    return (           

          <Layout className="site-layout">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background:'#5f0080', height:'fit-content', padding:'0px' }}>
              <div className="logo" />
              <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight:'42px' }}>
                <Menu.Item key="1">Recipe Note</Menu.Item>
                <Menu.Item key="2">Shopping List</Menu.Item>
                <Menu.Item key="3">Fridge Note</Menu.Item>
                <Menu.Item key="4">Cook Log</Menu.Item>
              </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 0px', marginTop: 87 }}>
             {getContent}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>

          </Layout>
    )
}

export default withRouter(NavBar)