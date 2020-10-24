import React, { useContext, useRef } from 'react'
import Axios from 'axios'
import { RecipeContext } from '../../Store/RecipeStore'
import { Button, Form, Input, Pagination, Row, Col, Modal, message } from 'antd';
import { MinusOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone';

function RecipeStepItem(props) {

    console.log("RecipeStepItem")

    const field = props.field;
    const index = props.index;
    const recipeStepItem = useRef();

    const {
        CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
        TotalPageInRecipeStep, setTotalPageInRecipeStep,
        setRecipeStepConfirmVisible,
        RecipeStepInputList, setRecipeStepInputList,
        RecipeFields, setRecipeFields,
    } = useContext(RecipeContext);

    const showModal = () => {
        if (recipeStepItem.current.querySelectorAll(".title-image")[0].style.display === 'block') {
            message.warning('현재 사진이 대표사진입니다.');
        } else {
            setRecipeStepConfirmVisible(true);
        }
    }

    const removeRecipeStep = (targetSrno) => {
        setTotalPageInRecipeStep(TotalPageInRecipeStep - 1);
        setCurrentPageInRecipeStep(CurrentPageInRecipeStep - 1 < 1 ? 1 : CurrentPageInRecipeStep - 1);
        setRecipeStepInputList(RecipeStepInputList.filter(item => Number(item.srno) !== Number(targetSrno)));
    };

    const setImageUrl = (value) => {
        setRecipeFields([...RecipeFields, ...[{ "name": ["step-url", index], "value": value }]]);
        const isShow = (value == '' ? false : true);
        const myNode = recipeStepItem.current;
        myNode.querySelectorAll(".recipe-image")[0].src = value;
        myNode.querySelectorAll(".only-add-btn")[0].style.display = isShow ? 'none' : 'block';
        myNode.querySelectorAll(".edit-delete-btn")[0].style.display = isShow ? 'flex' : 'none';
        myNode.querySelectorAll(".dropzone")[0].style.display = isShow ? 'block' : 'none';
    }

    const uploadImage = (files) => {
        let formData = new FormData();
        const config = { header: { 'content-type': 'multipart/form-data' } }
        formData.append("file", files[0]);
        Axios.post('/api/recipe/uploadImage', formData, config).then(response => {
            if (response.data.success) {
                setImageUrl(response.data.url);
            } else {
                alert('실패');
            }
        })
    }

    const deleteImage = () => setImageUrl('')

    const moveLeftStep = () => {
        if (CurrentPageInRecipeStep > 1) {
            moveStep(CurrentPageInRecipeStep - 2);
        } else {
            message.warning('첫번째 스텝입니다.');
        }
    }

    const moveRightStep = () => {
        if (CurrentPageInRecipeStep < TotalPageInRecipeStep) {
            moveStep(CurrentPageInRecipeStep);
        } else {
            message.warning('마지막 스텝입니다.');
        }
    }

    const moveStep = (step) => {
        const tmpData = RecipeStepInputList[step];
        RecipeStepInputList[step] = RecipeStepInputList[CurrentPageInRecipeStep - 1]
        RecipeStepInputList[CurrentPageInRecipeStep - 1] = tmpData;
        setCurrentPageInRecipeStep(step + 1);
    }

    return (
        <div
            className="mgb10"
            step={index + 1}
            ref={recipeStepItem}
            style={{ display: (CurrentPageInRecipeStep == (index + 1) ? 'block' : 'none') }} >
            <Row className="mgb10">
                <Col span={16} >
                    <Pagination
                        className="mgb10" size="small" defaultPageSize={1}
                        current={CurrentPageInRecipeStep} total={TotalPageInRecipeStep}
                        onChange={(page) => setCurrentPageInRecipeStep(page)} />
                </Col>
                <Col span={2}><Button type="dashed" className="pd0 wd100" onClick={() => moveLeftStep()}><CaretLeftOutlined /></Button></Col>
                <Col span={2}><Button type="dashed" className="pd0 wd100" onClick={() => moveRightStep()}><CaretRightOutlined /></Button></Col>
                <Col span={4}>
                    <Button type="dashed" className="wd100" onClick={() => removeRecipeStep(field.srno)}><MinusOutlined /></Button>
                </Col>
            </Row>
            <div>
                <div className="dropzone" style={{ display: field.url ? 'block' : 'none' }}>
                    <img src={field.url} className="recipe-image" alt="recipe-image" />
                    <Form.Item hidden name={["step_url", index]}><Input /></Form.Item>
                    <div className="title-image" style={{ display: field.title_url_yn === 'Y' ? 'block' : 'none' }}>대표</div>
                    <Form.Item hidden name={["step_title_yn", index]}><Input value="N"/></Form.Item>
                </div>
                <Dropzone onDrop={uploadImage} multiple={false} maxSize={100000000}>
                    {({ getRootProps, getInputProps }) => (
                        <Row className="mgb10">
                            <Col className="only-add-btn" span={24} style={{ display: field.url ? 'none' : 'block' }}>
                                <Button size={'large'} className="wd100">
                                    <div {...getRootProps()} ><span>등록</span><input {...getInputProps()} /></div>
                                </Button>
                            </Col>
                            <div className="edit-delete-btn wd100" style={{ display: field.url ? 'flex' : 'none' }}>
                                <Col span={8}><Button size={'large'} className="wd100" onClick={showModal}>대표</Button></Col>
                                <Col span={8}>
                                    <Button size={'large'} className="wd100" >
                                        <div {...getRootProps()} ><span>수정</span><input {...getInputProps()} /></div>
                                    </Button>
                                </Col>
                                <Col span={8}><Button size={'large'} className="wd100" onClick={deleteImage}>삭제</Button></Col>
                            </div>
                        </Row>
                    )}
                </Dropzone>
                <Form.Item name={["step_title", index]} className="mgb10">
                    <Input className="wd100 mgb10" placeholder="한줄설명" />
                </Form.Item>
                <Form.Item name={["step_description", index]} className="mgb10">
                    <TextArea className="wd100" placeholder="상세설명" rows={4} />
                </Form.Item>
            </div>
        </div>
    )
}

export default RecipeStepItem
