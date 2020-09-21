import React, { useState } from 'react'
import './NavBar.css'
import { Layout, Menu, Drawer, Typography, PageHeader, Avatar, Row, Col, Button, Breadcrumb } from 'antd';
import { MenuOutlined, SearchOutlined, ProfileOutlined, ShoppingCartOutlined, DatabaseOutlined, ScheduleOutlined } from '@ant-design/icons'
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
    
    const { Title, Text } = Typography;
    const getContent = props.content;

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
            <Content className="site-layout" style={{ padding: '0 0px', marginTop: 56, marginBottom: 56 }}>
             {getContent}
            </Content>
            <Footer className="footer" style={{textAlign:'center'}}>
              <Row gutter={[16, 16]}>
                <Col span={6}><ProfileOutlined style={{ fontSize: '20px', color: '#FFBC42'}} /><div>Recipe</div></Col>
                <Col span={6}><ShoppingCartOutlined style={{ fontSize: '20px'}}/><div>Shopping</div></Col>
                <Col span={6}><DatabaseOutlined style={{ fontSize: '20px'}}/><div>Fridge</div></Col>
                <Col span={6}><ScheduleOutlined style={{ fontSize: '20px'}}/><div>Cook</div></Col>
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