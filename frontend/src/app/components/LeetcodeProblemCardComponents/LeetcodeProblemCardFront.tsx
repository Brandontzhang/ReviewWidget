import { Button, Card, Form, Input} from "antd";
import { useState } from "react";
import ComponenentTags from "../FormComponents/ComponentTags";
import ButtonGroup from "antd/es/button/button-group";
import { DeleteOutlined } from "@ant-design/icons";
import LeetcodeProblemController from "../../controllers/LeetcodeProblemController";

const LeetcodeProblemCardFront = (props : any) => {
    const {problem} = props;
    const [tags, setTags] = useState<string[]>(problem.categories);

    let style = {
        ...props.style,
        margin: "2%", 
        height: "350px",
    }

    return (
        <Card style={style} title={<span>{problem?.title} : {problem?.priority}</span>} extra={<Button onClick={() => props.delete(problem)}><DeleteOutlined /></Button>}>
            <div style={{display : "flex", flexDirection: "row"}}>
                <span style={{marginTop: "5px", marginRight : "5px"}}>Labels:</span><ComponenentTags tags={tags} setTags={setTags}></ComponenentTags>
            </div>

            <Form layout="vertical">
                <Form.Item label={"Description:"}>
                    <Input.TextArea placeholder="Description" value={problem.description} readOnly={true} className="cardDescription" style={{height: "96px"}}>
                    </Input.TextArea>
                </Form.Item>
            </Form>

            <ButtonGroup style={{float : "right"}}>
                {problem.hints?.length > 0 && <Button onClick={() => props.setSide("hints")}>Hints</Button>}
                <Button onClick={() => props.setSide("answer")}>Answer</Button>
            </ButtonGroup>
        </Card>
    )
}

export default LeetcodeProblemCardFront;