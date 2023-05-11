import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Row } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

const LeetcodeProblemCardHints = (props : any) => {

    const [hint, setHint] = useState();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (props.hints) {
            setHint(props.hints[0]);
        }
    }, []);

    if (hint === undefined) {
        return (
            <div>
                <Button>View Answer</Button>
            </div>
        )
    }

    const changeIndex = (increment : number) => {
        setIndex(currentIndex => {
            setHint(props.hints[currentIndex + increment]);
            return currentIndex + increment;
        });
    }

    return (
        <Card 
            bodyStyle={{height: "85%"}} 
            style={{...props.style, margin: "2%", height: "350px"}} 
            title={`Hint ${index + 1}/${props.hints.length}`} 
            extra={<Button onClick={() => props.setSide("front")}><CloseOutlined /></Button>}>

            <div style={{display : "flex", flexDirection : "column", justifyContent: "space-between", height: "100%"}}>
                <Form.Item style={{overflow: 'auto'}}>
                    <TextArea className="cardHint" style={{padding: "0px", minHeight:"180px"}} bordered={false} readOnly={true} value={hint} />
                </Form.Item>

                <ButtonGroup style={{display: "flex", justifyContent: "center"}}>
                    <Button disabled={index === 0} onClick={() => changeIndex(-1)}><LeftOutlined /></Button>
                    <Button onClick={() => props.setSide("answer")}>Answer</Button>
                    <Button disabled={index === props.hints.length - 1} onClick={() => changeIndex(1)}><RightOutlined /></Button>
                </ButtonGroup>
            </div>
        </Card>
    )

}

export default LeetcodeProblemCardHints;