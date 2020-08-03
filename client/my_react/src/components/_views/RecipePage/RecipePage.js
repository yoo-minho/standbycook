import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Layout, Input, Button, Space, Upload, Popconfirm, Row, Col, Skeleton, Card} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './RecipePage.css'

const { Search } = Input;
const { Meta } = Card;

function recipePage() {
    return (
        <NavBar content={
            <Layout>
                <Row className="top-bar">
                    <Col span={24}>
                        <Search className="search-bar" placeholder="input search text" onSearch={value => console.log(value)} />
                    </Col>
                </Row>
                <Row style={{ marginRight: 15 }}>
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

export default recipePage
