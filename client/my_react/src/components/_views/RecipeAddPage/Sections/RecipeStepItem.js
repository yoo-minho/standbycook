import React, { useContext, useRef } from 'react'
import Axios from 'axios'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Form, Input, Pagination, Row, Col, Card} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'

function RecipeStepItem() {

    const {
        CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
        TotalPageInRecipeStep, setTotalPageInRecipeStep,
        RecipeStep, setRecipeStep
    } = useContext(RecipeContext);

    const inputRef = useRef(false);
    const textAreaRef = useRef(false);

    const { Text } = Typography;

    let recipeStep = [];

    const addRecipeStep = (cb) => {

        console.log("addRecipeStep====start");
        console.log(inputRef);
        console.log(textAreaRef);
        console.log("addRecipeStep====end");

        //recipeStep[CurrentPageInRecipeStep] = {title:inputRef.current.value,description:textAreaRef.current.value}
        
        setTotalPageInRecipeStep(TotalPageInRecipeStep+1);
        setCurrentPageInRecipeStep(TotalPageInRecipeStep+1);

        cb();

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
                    const myNode = document.querySelectorAll("#recipe-step-item"+CurrentPageInRecipeStep+" .dropzone")[0];
                    myNode.innerHTML = `<img src=${response.data.url} alt="recipeImage" style="width:100%;height:100%;object-fit:cover">`    
                    myNode.style.display = 'block';
                    document.getElementsByClassName("only-add-btn")[0].style.display = 'none';
                    document.getElementsByClassName("edit-delete-btn")[0].style.display = 'flex';
                } else {
                    alert('실패');
                }
        })
    }

    const onDelete = () => {
        const myNode = document.querySelectorAll("#recipe-step-item"+CurrentPageInRecipeStep+" .dropzone")[0];
        myNode.style.display = 'none';
        document.getElementsByClassName("only-add-btn")[0].style.display = 'block';
        document.getElementsByClassName("edit-delete-btn")[0].style.display = 'none';
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    return (
        <Form.List name="names">
            {(fields, { add, remove }) => {
                return (
                    <>
                    <Row style={{ marginBottom: '10px'}}>
                        <Col span={20} style={{ lineHeight: '32px'}} ><Text strong>레시피스텝</Text></Col>
                        <Col span={4} ><Button type="dashed" style={{ width: '100%' }} onClick={() => { addRecipeStep(add); }}><PlusOutlined /></Button></Col>
                    </Row>
                    {fields.map((field, index) =>
                        <div id={"recipe-step-item"+(index+1)} key={index} style={{ marginBottom: '10px', display: (CurrentPageInRecipeStep == (index+1)?'block':'none') }} >
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
                                <div
                                    className = "dropzone" 
                                    style={{ width: '100%', height: '200px', marginBottom:'-1px', border:'1px solid lightgray', 
                                            display:'flex', alignItems:'center', justifyContent:'center', display:'none'}}>
                                </div>
                                <Dropzone    
                                    onDrop={onDrop}
                                    multiple={false}
                                    maxSize={100000000}>
                                    {({getRootProps, getInputProps}) => (
                                        <Row style={{ marginBottom: '10px'}}>
                                            <Col className="only-add-btn" span={24}>
                                                <Button size={'large'} style={{width:'100%'}}>
                                                    <div {...getRootProps()} ><span>사진 등록</span><input {...getInputProps()}/></div>
                                                </Button>
                                            </Col>
                                            <div className="edit-delete-btn" style={{display:'none', width: '100%'}}>
                                                <Col span={12}>
                                                    <Button size={'large'} style={{width:'100%'}}>
                                                        <div {...getRootProps()} ><span>사진 수정</span><input {...getInputProps()}/></div>
                                                    </Button>
                                                </Col>
                                                <Col span={12}><Button size={'large'} style={{width:'100%'}} onClick={onDelete}>사진 삭제</Button></Col>
                                            </div>
                                        </Row>
                                    )}
                                </Dropzone>
                                <Input placeholder="한줄설명" ref={inputRef} style={{ width: '100%', marginBottom:'10px' }} />
                                <TextArea placeholder="상세설명" ref={textAreaRef} rows={4} style={{ width: '100%' }} />
                            </div>
                        </div>
                    )}
                    </>
                );
            }}
        </Form.List>
    )
}

export default RecipeStepItem
