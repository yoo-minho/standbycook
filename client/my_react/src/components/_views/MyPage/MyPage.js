import React, { useContext } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Skeleton, Drawer, Card, Avatar, List } from 'antd';

function MyPage() {

    const {
        MyPageVisible, setMyPageVisible,
    } = useContext(RecipeContext);

    const onClose = () => setMyPageVisible(false)

    const { Meta } = Card;

    const data = [
        '개인정보 수정',
        '로그아웃',
        '설정',
        '도움말',
      ];

    return (
        <Drawer
            title="My Page"
            placement="right"
            width="70%"
            closable={true}
            onClose={onClose}
            visible={MyPageVisible}
            bodyStyle={{ padding: '0' }}
        >
            <Card style={{ width: '100%'}} >
                <Skeleton loading={false} avatar active>
                    <Meta
                        avatar={
                            <Avatar size={64} src="https://cdn.mediasr.co.kr/news/photo/201902/51097_10784_4113.jpg" />
                        }
                        title="유민호"
                        description="먹는 것을 좋아합니다. 너두?"
                    />
                </Skeleton>
            </Card>
            <List
            size="large"
            dataSource={data}
            renderItem={item => <List.Item>{item}</List.Item>}
            />
        </Drawer>
    )
}

export default MyPage
