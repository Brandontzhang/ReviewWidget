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
    const {answer} = props;

    return (
        <Card title="Answer" bodyStyle={{height: "85%"}}  style={{margin: "2%", height: "350px"}} extra={<Button onClick={() => props.setSide("front")}><CloseOutlined /></Button>}>
            <div style={{display : "flex", flexDirection : "column", justifyContent: "space-between", height: "100%"}}>
                <Form.Item style={{overflow: 'auto'}}>
                    <TextArea style={{padding: "0px"}} bordered={false} readOnly={true} value={answer} />
                </Form.Item>

                <ButtonGroup style={{display: "flex", justifyContent: "center"}}>
                    <Button><CloseOutlined style={{color: "red"}} /></Button>
                    <Button><RedoOutlined style={{color: "blue"}}/></Button>
                    <Button><CheckOutlined style={{color: "green"}} /></Button>
                    <Button><FolderOutlined style={{color: "orange"}} /></Button>
                </ButtonGroup>
            </div>
        </Card>
    )
}

export default LeetcodeProblemCardAnswer