import React, { useState} from 'react'
import NavBar from '../NavBar/NavBar'
import { Layout, Input, Button, Drawer, Tooltip, Space, Upload, Popconfirm, Row, Col, Skeleton, Card} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './RecipePage.css'

const { Search } = Input;
const { Meta } = Card;

function RecipePage() {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    
    const onClose = () => {
    setVisible(false);
    };


    return (
        <NavBar content={
            <Layout>
                <Button onClick={showDrawer} className="add-button" shape="circle" icon={<PlusOutlined style={{ color:'#FFFFFF', fontSize:'18px' }}/>} />
                <Drawer
                    title="Add Recipe"
                    placement="bottom"
                    width = "100%"
                    height = "100%"
                    closable={true}
                    onClose={onClose}
                    visible={visible}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
                <Row style={{ marginTop:15, marginRight: 15 }}>
                    <Col span={12}>
                        <Card
                            hoverable
                            style={{ marginLeft: 15, marginBottom : 15 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                                hoverable
                                style={{ marginLeft: 15, marginBottom : 15}}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            hoverable
                            style={{ marginLeft: 15, marginBottom : 15 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                                hoverable
                                style={{ marginLeft: 15, marginBottom : 15}}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            hoverable
                            style={{ marginLeft: 15, marginBottom : 15 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                                hoverable
                                style={{ marginLeft: 15, marginBottom : 15}}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                </Row>                
            </Layout>
        }></NavBar>
    )
}

export default RecipePage
