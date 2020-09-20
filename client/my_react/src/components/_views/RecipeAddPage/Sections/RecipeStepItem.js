import React, { useContext, useRef } from 'react'
import Axios from 'axios'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Form, Input, Pagination, Row, Col, Modal, message} from 'antd';
import './RecipeStepItem.css'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'

function RecipeStepItem() {

    const {
        CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
        TotalPageInRecipeStep, setTotalPageInRecipeStep,
        RecipeStepConfirmVisible, setRecipeStepConfirmVisible,
    } = useContext(RecipeContext);

    const { Text } = Typography;

    const showModal = () => {
        const myNode = document.querySelectorAll("#recipe-step-item"+CurrentPageInRecipeStep)[0];
        if('block' === myNode.querySelectorAll(".title-image")[0].style.display){
            message.warning('현재 사진이 대표사진입니다.');
        } else {
            setRecipeStepConfirmVisible(true);
        }
    }

    const handleOk = () => {
        setRecipeStepConfirmVisible(false);
        const myNode = document.querySelectorAll("#recipe-step-item"+CurrentPageInRecipeStep)[0];
        Array.prototype.forEach.call(document.querySelectorAll(".title-image"), function(el, i){
            el.style.display = 'none';
        });
        myNode.querySelectorAll(".title-image")[0].style.display = 'block';
    };

    const handleCancel = () => setRecipeStepConfirmVisible(false);

    const addRecipeStep = () => {
        setTotalPageInRecipeStep(TotalPageInRecipeStep+1);
        setCurrentPageInRecipeStep(TotalPageInRecipeStep+1);
    };

    const removeRecipeStep = () => {
        setTotalPageInRecipeStep(TotalPageInRecipeStep-1);
        setCurrentPageInRecipeStep(TotalPageInRecipeStep-1);
    };

    const onDrop = (files, event) => {
        let formData = new FormData();
        const config = {
            header : {'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0]);

        Axios.post('/api/recipe/uploadImage', formData, config)
        .then(response => {
                if(response.data.success){
                    const myNode = document.querySelectorAll("#recipe-step-item"+CurrentPageInRecipeStep)[0];
                    const dropNode = myNode.querySelectorAll(".dropzone")[0];
                    const imgEl = document.createElement("img");
                    imgEl.src = response.data.url;
                    imgEl.className = "recipe-image";
                    imgEl.alt = "recipe-image";
                    dropNode.insertBefore(imgEl, dropNode.firstChild);
                    dropNode.style.display = 'block';
                    myNode.querySelectorAll(".only-add-btn")[0].style.display = 'none';
                    myNode.querySelectorAll(".edit-delete-btn")[0].style.display = 'flex';

                    let visibleCnt = Array.prototype.filter.call(document.querySelectorAll(".title-image"), function(el, i){
                        return (el.style.display == 'block');
                    }).length ;

                    if(visibleCnt > 0){
                        showModal();
                    } else {
                        myNode.querySelectorAll(".title-image")[0].style.display = 'block';     
                    }
                } else {
                    alert('실패');
                }
        })
    }

    const onDelete = () => {
        const myNode = document.querySelectorAll("#recipe-step-item"+CurrentPageInRecipeStep)[0];
        const dropNode = myNode.querySelectorAll(".dropzone")[0];
        dropNode.style.display = 'none';
        myNode.querySelectorAll(".only-add-btn")[0].style.display = 'block';
        myNode.querySelectorAll(".edit-delete-btn")[0].style.display = 'none';
        while (dropNode.firstChild) {
            dropNode.removeChild(dropNode.firstChild);
        }
    }

    return (
        <>
            <Form.List name="names">
                {(fields, { add, remove }) => {
                    return (
                        <>
                        <Row style={{ marginBottom: '10px'}}>
                            <Col span={20} style={{ lineHeight: '32px'}} ><Text strong>레시피스텝</Text></Col>
                            <Col span={4} ><Button type="dashed" style={{ width: '100%' }} onClick={() => { addRecipeStep(); add();}}><PlusOutlined /></Button></Col>
                        </Row>
                        {fields.map((field, index) =>
                            <div id={"recipe-step-item"+(index+1)} className="recipe-step" key={index} style={{ marginBottom: '10px', display: (CurrentPageInRecipeStep == (index+1)?'block':'none') }} >
                                <Row style={{ marginBottom: '10px'}}>
                                    <Col span={20} >
                                        <Pagination 
                                            style={{ marginBottom:'10px'}} size="small" defaultPageSize={1}
                                            current={CurrentPageInRecipeStep} 
                                            total={TotalPageInRecipeStep} 
                                            onChange={function(page){
                                                setCurrentPageInRecipeStep(page)
                                        }}/>
                                    </Col>
                                    <Col span={4}>
                                        <Button type="dashed" style={{ width: '100%' }} onClick={() => {remove(field.name); removeRecipeStep();}}><MinusOutlined/></Button>
                                    </Col>
                                </Row>
                                <div>
                                    <div className = "dropzone">
                                        <div className = "title-image">대표</div>
                                    </div>
                                    <Dropzone    
                                        onDrop={onDrop}
                                        multiple={false}
                                        maxSize={100000000}>
                                        {({getRootProps, getInputProps}) => (
                                            <Row style={{ marginBottom: '10px'}}>
                                                <Col className="only-add-btn" span={24}>
                                                    <Button size={'large'} style={{width:'100%'}}>
                                                        <div {...getRootProps()} ><span>등록</span><input {...getInputProps()}/></div>
                                                    </Button>
                                                </Col>
                                                <div className="edit-delete-btn" style={{display:'none', width: '100%'}}>
                                                    <Col span={8}><Button size={'large'} style={{width:'100%'}} onClick={showModal}>대표</Button></Col>
                                                    <Col span={8}>
                                                        <Button size={'large'} style={{width:'100%'}}>
                                                            <div {...getRootProps()} ><span>수정</span><input {...getInputProps()}/></div>
                                                        </Button>
                                                    </Col>
                                                    <Col span={8}><Button size={'large'} style={{width:'100%'}} onClick={onDelete}>삭제</Button></Col>
                                                </div>
                                            </Row>
                                        )}
                                    </Dropzone>
                                    <Input className="step-title" placeholder="한줄설명" style={{ width: '100%', marginBottom:'10px' }} />
                                    <TextArea className="step-description" placeholder="상세설명" rows={4} style={{ width: '100%' }} />
                                </div>
                            </div>
                        )}
                        </>
                    );
                }}
                
            </Form.List>
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
