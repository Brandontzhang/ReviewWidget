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
    const {answer, updatePriority, priority} = props;

    return (
        <Card title="Answer" bodyStyle={{height: "85%"}}  style={{...props.style, margin: "2%", height: "350px"}} extra={<Button onClick={() => props.setSide("front")}><CloseOutlined /></Button>}>
            <div style={{display : "flex", flexDirection : "column", justifyContent: "space-between", height: "100%"}}>
                <Form.Item style={{height: "100%"}}>
                    <TextArea className="cardAnswer" style={{padding: "0px", minHeight:"180px"}} bordered={false} readOnly={true} value={answer} />
                </Form.Item>

                <ButtonGroup style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => updatePriority(5)}><CloseOutlined style={{color: "red"}} /></Button>
                    <Button onClick={() => updatePriority(priority)}><RedoOutlined style={{color: "blue"}}/></Button>
                    <Button onClick={() => updatePriority(priority-1)}><CheckOutlined style={{color: "green"}} /></Button>
                    <Button onClick={() => updatePriority(0)}><FolderOutlined style={{color: "orange"}} /></Button>
                </ButtonGroup>
            </div>
        </Card>
    )
}

export default LeetcodeProblemCardAnswer