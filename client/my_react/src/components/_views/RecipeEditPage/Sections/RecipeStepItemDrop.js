import React, { useContext } from 'react'
import Axios from 'axios'
import { RecipeContext } from '../../Store/RecipeStore'
import { Button, Row, Col, message } from 'antd';
import Dropzone from 'react-dropzone';

function RecipeStepItemDrop(props) {

    const recipeStepItemRef = props.xref;
    const index = props.index;
    const url = props.url;

    const {
        setRecipeStepConfirmVisible,
        RecipeFields, setRecipeFields,
    } = useContext(RecipeContext);

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

    const showModal = () => {
        if (recipeStepItemRef.current.querySelectorAll(".title-image")[0].style.display === 'block') {
            message.warning('현재 사진이 대표사진입니다.');
        } else {
            setRecipeStepConfirmVisible(true);
        }
    }

    const setImageUrl = (value) => {
        setRecipeFields([...RecipeFields, ...[{ "name": ["step-url", index], "value": value }]]);
        const isShow = (value == '' ? false : true);
        const myNode = recipeStepItemRef.current;
        myNode.querySelectorAll(".recipe-image")[0].src = value;
        myNode.querySelectorAll(".only-add-btn")[0].style.display = isShow ? 'none' : 'block';
        myNode.querySelectorAll(".edit-delete-btn")[0].style.display = isShow ? 'flex' : 'none';
        myNode.querySelectorAll(".dropzone")[0].style.display = isShow ? 'block' : 'none';
    }

    return (
        <Dropzone onDrop={uploadImage} multiple={false} maxSize={100000000}>
            {({ getRootProps, getInputProps }) => (
                <Row className="mgb10">
                    <Col className="only-add-btn" span={24} style={{ display: url ? 'none' : 'block' }}>
                        <Button size={'large'} className="wd100">
                            <div {...getRootProps()} ><span>등록</span><input {...getInputProps()} /></div>
                        </Button>
                    </Col>
                    <div className="edit-delete-btn wd100" style={{ display: url ? 'flex' : 'none' }}>
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
    )
}

export default RecipeStepItemDrop
