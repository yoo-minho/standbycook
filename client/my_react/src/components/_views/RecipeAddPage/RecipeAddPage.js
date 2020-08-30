import React, { useContext, useState } from 'react'
import { RecipeContext } from '../Store/RecipeStore.js'
import { Drawer, Button, Form, Input, Pagination } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible'
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'

function RecipeAddPage() {

    const {
        DrawVisible, setDrawVisible,
        PageInAdd, setPageInAdd,
        TotalInAdd, setTotalInAdd
    } = useContext(RecipeContext);

    function showDrawer(){
        setDrawVisible(true)
    }

    function onClose(){
        setDrawVisible(false)
    }

    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
    };

    const onDrop = (files) => {

    };

    const onSubmit = () => {

    };

    return (
        <>
            <Button 
                onClick={showDrawer} 
                className="add-button" 
                shape="circle" 
                icon={<PlusOutlined 
                        style={{ color:'#FFFFFF', fontSize:'18px' }}/>} />
            <Drawer
                title="Add Recipe"
                placement="bottom"
                width = "100%"
                height = "100%"
                closable={true}
                onClose={onClose}
                visible={DrawVisible}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="레시피타이틀" style={{ marginBottom: '10px' }}>
                        <Input placeholder="레시피타이틀" />
                    </Form.Item>

                    <Form.List name="names">
                        {(fields, { add, remove }) => {
                            return (
                                <div>
                                <Form.Item style={{ marginBottom: '10px'}} >
                                    <Button type="dashed" style={{ width: '100%' }} 
                                        onClick={() => {
                                            add();
                                            setTotalInAdd(TotalInAdd+1);
                                            setPageInAdd(TotalInAdd+1);
                                        }}>
                                        <PlusOutlined /> 레시피카드 추가
                                    </Button>
                                </Form.Item>

                                {(PageInAdd != 0 &&
                                <Pagination style={{ marginBottom:'10px', textAlign:'center'}} size="small" current={PageInAdd} defaultPageSize={1} total={TotalInAdd} onChange={function(page){
                                    setPageInAdd(page)
                                }}/>)}

                                {fields.map((field, index) => (PageInAdd == (index+1) && 
                                    <Form.Item {...(formItemLayout)} label={'레시피카드 ' + (index+1)} required={false} key={field.key}>
                                        <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        style={{ top: '-25px', position:'absolute', right:'0px' }}
                                        onClick={() => {
                                            remove(field.name);
                                            setTotalInAdd(TotalInAdd-1);
                                            setPageInAdd(TotalInAdd-1);
                                        }} 
                                        />
                                        <Form.Item {...field}>
                                            <div style={{ display:'flex', justifyContent:'space-between'}}>
                                                <Dropzone
                                                onDrop={onDrop}
                                                multiple={false}
                                                maxSize={100000000}>
                                                {({getRootProps, getInputProps}) => (
                                                    <div style={{ width: '100%', height: '240px', marginBottom:'10px',  
                                                        border:'1px solid lightgray', display:'flex',
                                                        alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                                        <input {...getInputProps()}/>
                                                        <Icon type="plus" style={{fontSize:'3rem'}}/>
                                                    </div>
                                                )}
                                                </Dropzone>
                                            </div>
                                            <Input placeholder="한줄설명" style={{ width: '100%', marginBottom:'10px' }} />
                                            <TextArea placeholder="상세설명" style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Form.Item>
                                ))}


 
                                </div>
                            );
                        }}
                    </Form.List>
                </Form>
            </Drawer>
        </>
    )
}

export default RecipeAddPage
