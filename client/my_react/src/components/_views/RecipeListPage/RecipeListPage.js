import React, {useContext} from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Row, Col, Card} from 'antd';
import axios from 'axios'

const { Meta } = Card;

function RecipeListPage() {
    
    const {
        RecipeList, setRecipeList
    } = useContext(RecipeContext);

    getList();

    function getList(){
        axios.post('/api/recipe/getList')
        .then(response => {
            console.log(response.data.rows);
            setRecipeList(response.data.rows);
        })
    }

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
