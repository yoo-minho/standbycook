import React from 'react'
import { Row, Col, Card} from 'antd';

const { Meta } = Card;

function RecipeListPage() {
    return (
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
        </Row>
    )
}

export default RecipeListPage
