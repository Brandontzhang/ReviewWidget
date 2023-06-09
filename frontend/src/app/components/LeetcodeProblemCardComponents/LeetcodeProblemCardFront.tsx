import { Button, Card, Form, Input} from "antd";
import { useEffect, useState } from "react";
import ComponenentTags from "../FormComponents/ComponentTags";
import ButtonGroup from "antd/es/button/button-group";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LeetcodeProblem from "../../models/LeetcodeProblem";

const LeetcodeProblemCardFront = (props : any) => {
    const problem : LeetcodeProblem = props.problem;
    let nextDate = new Date(problem.nextReviewDate);
    const [tags, setTags] = useState<string[]>(problem.categories);
    const navigate = useNavigate();

    useEffect(() => {
        setTags(problem.categories);
    }, [problem]);

    let problemDue = () : boolean => {
        let currentDate = new Date();
        let reviewDate = new Date(problem.nextReviewDate);

        let timeDif = reviewDate.getTime() - currentDate.getTime();
        let daysDif = Math.ceil(timeDif / (1000 * 3600 * 24));

        return daysDif <= 0;
    } 

    let style = {
        ...props.style,
        height: "350px",
    }

    const date = (
        <span style={{"color" : problemDue() ? "#FF0000" : "#000"}}>{nextDate.getMonth() + 1}/{nextDate.getDate()}/{nextDate.getFullYear()}</span>
    )

    return (
        <Card style={style} title={<span>{problem?.title}</span>} extra={date}>
            <div style={{display : "flex", flexDirection: "row"}}>
                <span style={{marginTop: "5px", marginRight : "5px"}}>Labels:</span><ComponenentTags tags={tags} setTags={setTags}></ComponenentTags>
            </div>

            <Form layout="vertical">
                <Form.Item label={"Description:"}>
                    <Input.TextArea placeholder="Description" value={problem.description} readOnly={true} className="cardDescription" style={{height: "96px"}}>
                    </Input.TextArea>
                </Form.Item>
            </Form>

            <ButtonGroup style={{float : 'left'}}>
                <Button onClick={() => props.delete(problem)}><DeleteOutlined /></Button>
                <Button onClick={() => navigate(`/update/${problem.id}`)}><EditOutlined /></Button>
            </ButtonGroup>

            <ButtonGroup style={{float : "right"}}>
                {problem.hints?.length > 0 && <Button onClick={() => props.setSide("hints")}>Hints</Button>}
                <Button onClick={() => props.setSide("answer")}>Answer</Button>
            </ButtonGroup>
        </Card>
    )
}

export default LeetcodeProblemCardFront;