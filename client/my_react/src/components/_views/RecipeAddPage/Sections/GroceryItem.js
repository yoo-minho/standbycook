import React, { useContext, useRef, useState } from 'react'
import { RecipeContext } from '../../Store/RecipeStore'
import { Typography, Button, Select, Row, Col, InputNumber, Form } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import Comm from '../../Comm/Comm'

function GroceryItem(props) {

    const field = props.field;
    const index = props.index;
    const [Unit, setUnit] = useState("");

    const {
        GroceryList,
        GroceryInputList, setGroceryInputList,
    } = useContext(RecipeContext);

    const { Text } = Typography;
    const { Option } = Select;
    const onSelect = (option) => setUnit(option.unit)
    const removeField = (targetSrno) => setGroceryInputList(GroceryInputList.filter(item => Number(item.srno) !== Number(targetSrno)))

    return (
        <Row className="grocery-item">
            <Col span={8} className="pdr10">
                <Form.Item name={["grocery-name",index]} className="wd100 mgb10" grocery-srno={field.srno}>
                    <Select           
                        placeholder="재료명"
                        optionFilterProp="children"
                        showSearch
                        onSelect={(_, option) => onSelect(option)}
                    >
                        {GroceryList.length > 0 && GroceryList.map((item) =>
                            <Option
                                key={item.grocery_srno}
                                category={item.grocery_category}
                                unit={Comm.coalesce(item.unit, 'g')}>{item.grocery_name}
                            </Option>
                        )}
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6} className="pdr10">
                <Form.Item name={["grocery-amount",index]} className="mgb10">
                    <InputNumber className={"wd100"} min={0} max={10000} step={1}/>
                </Form.Item>
            </Col>
            <Col span={6} className="pdr10 lh32"><Text>{Unit}</Text></Col>
            <Col span={4} >
                <Button type="dashed" className="wd100" onClick={() => removeField(field.srno)}><MinusOutlined /></Button>
            </Col>
        </Row>
    )
}

export default GroceryItem