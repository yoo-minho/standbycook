import React, { useContext, useState } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Drawer, Button, Modal, InputNumber, Statistic, Tag, Input, Row, Col, Form, Result, notification } from 'antd';
import { ClockCircleOutlined, SmileOutlined } from '@ant-design/icons';
import './RecipeTimerPage.css'

function RecipeTimerPage() {

    const [TimerName, setTimerName] = useState("")

    const {
        TimerPageVisible, setTimerPageVisible,
        TimerModalVisible, setTimerModalVisible,
        TimerList, setTimerList
    } = useContext(RecipeContext);

    const onClose = () => {
        setTimerPageVisible(false)
    }

    const showTimerAdd = (e) => {
        setTimerModalVisible(true);
        setTimerName("타이머" + (TimerList.length + 1))
    }

    const handleTimerOk = (e) => {
        setTimerModalVisible(false)
        const tempNode = e.currentTarget.parentNode.parentNode.parentNode;
        const timerData = {
            index: TimerList.length,
            name: tempNode.querySelectorAll(".timer-name")[0].value,
            second: Date.now() + (1000 * tempNode.querySelectorAll(".timer-second input")[0].value)
        }
        setTimerList([...[timerData], ...TimerList])
    }
    const handleTimerCancel = () => {
        setTimerModalVisible(false)
        timerModalForm.resetFields();
    }
    const selectTimer = (sec, event) => {
        const tempNode = event.currentTarget.parentNode.parentNode.parentNode;
        tempNode.querySelectorAll(".timer-second input")[0].value = sec;
    }
    const changeTimerName = (e) => {
        setTimerName(e.target.value)
    }
    const finishCountdown = (i) => {
        const itemToFind = TimerList.find(function (item) { return item.index === i })
        const idx = TimerList.indexOf(itemToFind)
        document.querySelectorAll(".header .timer")[0].classList.remove('on');
        notification.open({
            message: <><SmileOutlined style={{ color: '#52c41a' }} />&nbsp;{TimerList[idx].name}</>,
            description: '타이머 종료~!!!',
            duration:0
        });
        if (idx > -1) TimerList.splice(idx, 1)
        setTimerList(TimerList)     
    }

    const { Countdown } = Statistic;
    const [timerModalForm] = Form.useForm();

    return (
        <>
            <Drawer
                title="레시피 멀티 타이머"
                placement="top"
                width="100%"
                height="100%"
                closable={true}
                onClose={onClose}
                visible={TimerPageVisible}
                bodyStyle={{ padding: '0' }}
            >
                <Row className="right-top-20 timer-list">
                    {TimerList.length == 0 &&
                        <div className="mgl20 wd100">
                            <Result
                                icon={<SmileOutlined style={{ color: '#52c41a' }} />}
                                title="타이머를 설정해주세요!"
                                subTitle="동시에 여러개도 가능합니다!"
                            />
                        </div>
                    }
                    {TimerList.length !== 0 && TimerList.map((timer, index) =>
                        <Col span={12} key={index}>
                            <div className="left-bottom-20">
                                <Tag key={index} className="mgb10 wd100" icon={<ClockCircleOutlined />} color="success">
                                    <span className="timer-item-name" date-second={timer.second}>{timer.name}</span>
                                    <Row>
                                        <Col span="12">
                                            <Countdown className="timer-item-second" value={timer.second} format="mm:ss" onFinish={() => finishCountdown(timer.index)} />
                                        </Col>
                                        <Col span="12">
                                        </Col>
                                    </Row>
                                </Tag>
                            </div>
                        </Col>
                    )}
                </Row>
                <div className="recipe-add-btn">
                    <Button className="wd100" onClick={showTimerAdd}>추가</Button>
                </div>
            </Drawer>
            <Modal
                title="타이머 추가하기 (초단위)"
                visible={TimerModalVisible}
                okText="추가하기"
                cancelText="취소하기"
                onOk={handleTimerOk}
                onCancel={handleTimerCancel}
            >
                <Form form={timerModalForm}>
                    <Form.Item>
                        <Input className="timer-name mgb10" value={TimerName} onChange={changeTimerName} />
                    </Form.Item>
                    <Form.Item>
                        <InputNumber className="timer-second wd100 mgb10" min={1} max={1800} step={1} defaultValue={60} />
                    </Form.Item>
                    <Row className="wd100">
                        <Col span="6"><Button className="wd100" onClick={(e) => selectTimer(10, e)}>10초</Button></Col>
                        <Col span="6"><Button className="wd100" onClick={(e) => selectTimer(30, e)}>30초</Button></Col>
                        <Col span="6"><Button className="wd100" onClick={(e) => selectTimer(60, e)}>1분</Button></Col>
                        <Col span="6"><Button className="wd100" onClick={(e) => selectTimer(120, e)}>2분</Button></Col>
                    </Row>
                    <Row className="wd100">
                        <Col span="6"><Button className="wd100" onClick={(e) => selectTimer(180, e)}>3분</Button></Col>
                        <Col span="6"><Button className="wd100" onClick={(e) => selectTimer(300, e)}>5분</Button></Col>
                        <Col span="6"><Button className="wd100" onClick={(e) => selectTimer(600, e)}>10분</Button></Col>
                        <Col span="6"><Button className="wd100" onClick={(e) => selectTimer(900, e)}>15분</Button></Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default RecipeTimerPage
