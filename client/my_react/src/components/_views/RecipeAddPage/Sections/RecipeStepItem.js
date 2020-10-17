import React, { useContext } from 'react'
import Axios from 'axios'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Form, Input, Pagination, Row, Col, Modal, message } from 'antd';
import { PlusOutlined, MinusOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone';

function RecipeStepItem() {

    const {
        CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
        TotalPageInRecipeStep, setTotalPageInRecipeStep,
        RecipeStepConfirmVisible, setRecipeStepConfirmVisible,
        RecipeStepInputList, setRecipeStepInputList
    } = useContext(RecipeContext);

    const { Text } = Typography;

    const showModal = () => {
        const myNode = getItemNode();
        if ('block' === myNode.querySelectorAll(".title-image")[0].style.display) {
            message.warning('현재 사진이 대표사진입니다.');
        } else {
            setRecipeStepConfirmVisible(true);
        }
    }

    const handleOk = () => {
        setRecipeStepConfirmVisible(false);
        const myNode = getItemNode();
        Array.prototype.forEach.call(document.querySelectorAll(".title-image"), function (el, i) {
            el.style.display = 'none';
        });
        myNode.querySelectorAll(".title-image")[0].style.display = 'block';
    };

    const handleCancel = () => setRecipeStepConfirmVisible(false);

    const addRecipeStep = () => {
        setTotalPageInRecipeStep(TotalPageInRecipeStep + 1);
        setCurrentPageInRecipeStep(TotalPageInRecipeStep + 1);
        setRecipeStepInputList([...RecipeStepInputList, ...[{ "srno": Date.now() }]])
    };

    const removeRecipeStep = (targetSrno) => {
        setTotalPageInRecipeStep(TotalPageInRecipeStep - 1);
        setCurrentPageInRecipeStep(CurrentPageInRecipeStep-1 < 1 ? 1 : CurrentPageInRecipeStep-1);
        setRecipeStepInputList(RecipeStepInputList.filter(item => Number(item.srno) !== Number(targetSrno)));
    };

    const changeTitle = (targetSrno, value) => {
        setRecipeStepInputList(RecipeStepInputList.map(item => {
            if (item.srno === targetSrno) {
                item.title = value;
            }
            return item;
        }));
    }

    const changeDescription = (targetSrno, value) => {
        setRecipeStepInputList(RecipeStepInputList.map(item => {
            if (Number(item.srno) === Number(targetSrno)) item.description = value;
            return item;
        }));
    }

    const changeUrl = (targetSrno, value) => {
        setRecipeStepInputList(RecipeStepInputList.map(item => {
            if (Number(item.srno) === Number(targetSrno)) item.url = value;
            return item;
        }));
    }
    
    const onDrop = (files, srno, title_url_yn) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0]);

        Axios.post('/api/recipe/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {

                    changeUrl(srno,response.data.url);
                    
                    const myNode = getItemNode();
                    myNode.querySelectorAll(".recipe-image")[0].src = response.data.url;
                    myNode.querySelectorAll(".only-add-btn")[0].style.display = 'none';
                    myNode.querySelectorAll(".edit-delete-btn")[0].style.display = 'flex';
                    myNode.querySelectorAll(".dropzone")[0].style.display = 'block';

                    let visibleCnt = Array.prototype.filter.call(document.querySelectorAll(".title-image"), function (el) {
                        return (el.style.display == 'block');
                    }).length;

                    myNode.querySelectorAll(".title-image")[0].style.display = ((visibleCnt == 0 || title_url_yn == 'Y' ) ? 'block' : 'none');
                } else {
                    alert('실패');
                }
            })
    }

    const onDelete = (srno) => {
        const myNode = getItemNode();
        myNode.querySelectorAll(".only-add-btn")[0].style.display = 'block';
        myNode.querySelectorAll(".edit-delete-btn")[0].style.display = 'none';
        const dropNode = myNode.querySelectorAll(".dropzone")[0];
        dropNode.style.display = 'none';
        while (dropNode.firstChild) {
            dropNode.removeChild(dropNode.firstChild);
        }
        changeUrl(srno,'');
    }

    const getItemNode = () => {
        return document.querySelectorAll("#recipe-step-input" + CurrentPageInRecipeStep)[0]
    }

    const moveLeftStep = () => {
        if(CurrentPageInRecipeStep > 1){
            const tmpData = RecipeStepInputList[CurrentPageInRecipeStep-2];
            RecipeStepInputList[CurrentPageInRecipeStep-2] = RecipeStepInputList[CurrentPageInRecipeStep-1]
            RecipeStepInputList[CurrentPageInRecipeStep-1] = tmpData;
            setCurrentPageInRecipeStep(CurrentPageInRecipeStep-1);
        } else {
            message.warning('첫번째 스텝입니다.');
        }
    }

    const moveRightStep = () => {
        if(CurrentPageInRecipeStep < TotalPageInRecipeStep){
            const tmpData = RecipeStepInputList[CurrentPageInRecipeStep];
            RecipeStepInputList[CurrentPageInRecipeStep] = RecipeStepInputList[CurrentPageInRecipeStep-1]
            RecipeStepInputList[CurrentPageInRecipeStep-1] = tmpData;
            setCurrentPageInRecipeStep(CurrentPageInRecipeStep+1);
        } else {
            message.warning('마지막 스텝입니다.');
        }
    }

    return (
        <>
            <>
                <Row className="mgb10">
                    <Col span={20} className="lh32" ><Text strong>레시피스텝</Text></Col>
                    <Col span={4} ><Button type="dashed" className="wd100" onClick={() => { addRecipeStep(); }}><PlusOutlined /></Button></Col>
                </Row>
                {RecipeStepInputList.length > 0 && RecipeStepInputList.map((field, index) =>
                    <div
                        id={"recipe-step-input" + (index + 1)}
                        className="recipe-step mgb10"
                        key={index}
                        srno={field.srno}
                        style={{ display: (CurrentPageInRecipeStep == (index + 1) ? 'block' : 'none') }} >
                        <Row className="mgb10">
                            <Col span={16} >
                                <Pagination
                                    className="mgb10" size="small" defaultPageSize={1}
                                    current={CurrentPageInRecipeStep}
                                    total={TotalPageInRecipeStep}
                                    onChange={(page) => setCurrentPageInRecipeStep(page)} />
                            </Col>
                            <Col span={2}><Button style={{padding:'0'}} type="dashed" className="wd100" onClick={() => { moveLeftStep(); }}><CaretLeftOutlined /></Button></Col>
                            <Col span={2}><Button  style={{padding:'0'}} type="dashed" className="wd100" onClick={() => { moveRightStep(); }}><CaretRightOutlined /></Button></Col>
                            <Col span={4}>
                                <Button type="dashed" className="wd100" onClick={() => { removeRecipeStep(field.srno); }}><MinusOutlined /></Button>
                            </Col>
                        </Row>
                        <div>
                            <div className="dropzone" style={{ display: field.url ? 'block' : 'none' }}>
                                <img src={field.url} className="recipe-image" alt="recipe-image" />
                                <div className="title-image" style={{ display: field.title_url_yn === 'Y' ? 'block' : 'none' }}>대표</div>
                            </div>
                            <Dropzone
                                onDrop={(files) => onDrop(files, field.srno, field.title_url_yn)}
                                multiple={false}
                                maxSize={100000000}>
                                {({ getRootProps, getInputProps }) => (
                                    <Row className="mgb10">
                                        <Col className="only-add-btn" span={24} style={{ display: field.url ? 'none' : 'block' }}>
                                            <Button size={'large'} className="wd100">
                                                <div {...getRootProps()} ><span>등록</span>
                                                    <input {...getInputProps()} /></div>
                                            </Button>
                                        </Col>
                                        <div className="edit-delete-btn wd100" style={{ display: field.url ? 'flex' : 'none' }}>
                                            <Col span={8}><Button size={'large'} className="wd100"
                                                onClick={showModal}>대표</Button></Col>
                                            <Col span={8}>
                                                <Button size={'large'} className="wd100" >
                                                    <div {...getRootProps()} ><span>수정</span>
                                                        <input {...getInputProps()} /></div>
                                                </Button>
                                            </Col>
                                            <Col span={8}><Button size={'large'} className="wd100"
                                                onClick={() => onDelete(field.srno)}>삭제</Button></Col>
                                        </div>
                                    </Row>
                                )}
                            </Dropzone>
                            <Input className="step-title wd100 mgb10" placeholder="한줄설명" value={field.title} onChange={(e) => changeTitle(field.srno, e.currentTarget.value)}/>
                            <TextArea className="step-description wd100" placeholder="상세설명" rows={4} value={field.description} onChange={(e) => changeDescription(field.srno, e.currentTarget.value)}/>
                        </div>
                    </div>
                )}
            </>
            <Modal
                title="대표사진 설정"
                visible={RecipeStepConfirmVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>선택한 사진을 대표사진으로 설정할까요?</p>
            </Modal>
        </>
    )
}

export default RecipeStepItem
