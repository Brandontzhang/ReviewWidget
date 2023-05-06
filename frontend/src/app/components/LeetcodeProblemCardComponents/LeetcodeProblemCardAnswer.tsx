import { CheckOutlined, CloseOutlined, FolderOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Card, Form } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import TextArea from "antd/es/input/TextArea";

/**
 * Enhancement ideas : On hovering over the button group, small textbox indicating what will happen to the card (increase prio, refresh, decrease prio, archive)
 * @param props 
 * @returns 
 */
const LeetcodeProblemCardAnswer = (props : any) => {
    const {answer, archive, updatePriority} = props;

    return (
        <Card title="Answer" bodyStyle={{height: "85%"}}  style={{...props.style, margin: "2%", height: "350px"}} extra={<Button onClick={() => props.setSide("front")}><CloseOutlined /></Button>}>
            <div style={{display : "flex", flexDirection : "column", justifyContent: "space-between", height: "100%"}}>
                <Form.Item style={{overflow: 'auto'}}>
                    <TextArea style={{padding: "0px"}} bordered={false} readOnly={true} value={answer} />
                </Form.Item>

                <ButtonGroup style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => updatePriority(+1)}><CloseOutlined style={{color: "red"}} /></Button>
                    <Button onClick={() => updatePriority(0)}><RedoOutlined style={{color: "blue"}}/></Button>
                    <Button onClick={() => updatePriority(-1)}><CheckOutlined style={{color: "green"}} /></Button>
                    <Button onClick={() => archive()}><FolderOutlined style={{color: "orange"}} /></Button>
                </ButtonGroup>
            </div>
        </Card>
    )
}

export default LeetcodeProblemCardAnswer