import { Button, Card, Form, Input} from "antd";
import { useState } from "react";
import ComponenentTags from "../ComponentTags";
import ButtonGroup from "antd/es/button/button-group";

const LeetcodeProblemCardFront = (props : any) => {
    const {problem} = props;
    const [tags, setTags] = useState<string[]>(problem.categories);

    return (
        <Card style={{margin: "2%", height: "350px"}} title={problem?.title}>
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
                <Button onClick={() => props.setSide("hints")}>Hints</Button>
                <Button onClick={() => props.setSide("answer")}>Answer</Button>
            </ButtonGroup>
        </Card>
    )
}

export default LeetcodeProblemCardFront;