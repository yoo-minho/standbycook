import React, { useContext } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Button, Form, Input, Pagination, Row, Col} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible'
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'

function RecipeStepItem() {

    const {
        CurrentPageInRecipeStep, setCurrentPageInRecipeStep,
        TotalPageInRecipeStep, setTotalPageInRecipeStep
    } = useContext(RecipeContext);

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

    const addRecipeStep = () => {
        setTotalPageInRecipeStep(TotalPageInRecipeStep+1);
        setCurrentPageInRecipeStep(TotalPageInRecipeStep+1);
    };

    const onDrop = (files) => {

    };

    const onSubmit = () => {

    };

    return (
        <Form.List name="names">
            {(fields, { add, remove }) => {
                return (
                    <>
                    <Row style={{ marginBottom: '10px'}}>
                        <Col span={18} style={{ lineHeight: '32px'}} >레시피스텝</Col>
                        <Col span={6} ><Button type="dashed" style={{ width: '100%' }} onClick={() => {add(); addRecipeStep();}}>추가<PlusOutlined /></Button></Col>
                    </Row>

                    {fields.map((field, index) => (CurrentPageInRecipeStep == (index+1) && 
                        <Form.Item {...(formItemLayout)} label={'레시피스텝 ' + (index+1)} required={false} key={field.key} style={{ marginBottom: '10px'}}>
                            <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ top: '-25px', position:'absolute', right:'0px' }}
                            onClick={() => {
                                remove(field.name);
                                setTotalPageInRecipeStep(TotalPageInRecipeStep-1);
                                setCurrentPageInRecipeStep(TotalPageInRecipeStep-1);
                            }} 
                            />
                            <Form.Item {...field} style={{ marginBottom: '10px'}}>
                                <div style={{ display:'flex', justifyContent:'space-between'}}>
                                    <Dropzone
                                    onDrop={onDrop}
                                    multiple={false}
                                    maxSize={100000000}>
                                    {({getRootProps, getInputProps}) => (
                                        <div style={{ width: '100%', height: '200px', marginBottom:'10px',  
                                            border:'1px solid lightgray', display:'flex',
                                            alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                            <input {...getInputProps()}/>
                                            <Icon type="plus" style={{fontSize:'3rem'}}/>
                                        </div>
                                    )}
                                    </Dropzone>
                                </div>
                                <Input placeholder="한줄설명" style={{ width: '100%', marginBottom:'10px' }} />
                                <TextArea placeholder="상세설명" rows={4} style={{ width: '100%' }} />
                            </Form.Item>
                        </Form.Item>
                    ))}

                    {(CurrentPageInRecipeStep != 0 &&
                    <Pagination 
                        style={{ marginBottom:'10px', textAlign:'center'}} size="small" defaultPageSize={1}
                        current={CurrentPageInRecipeStep} 
                        total={TotalPageInRecipeStep} 
                        onChange={function(page){
                            setCurrentPageInRecipeStep(page)
                    }}/>)}
                    </>
                );
            }}
        </Form.List>
    )
}

export default RecipeStepItem
