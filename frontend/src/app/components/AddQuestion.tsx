import { Form, Input, Card, Button, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import InputList from "./InputList";
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";
import useLeetcodeProblems from "../hooks/useLeetcodeProblems";
import LeetcodeProblem from "../models/LeetcodeProblem";

interface Hint {
    key : number,
    value : string;
}

let AddQuestion = (props : any) => {
    const [form] = Form.useForm();
    
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [date, setDate] = useState(Date.now());
    let [priority, setPriority] = useState(0);
    let [answer, setAnswer] = useState("");
    let [hints, setHints] = useState<Hint[]>([]);

    let priorityOptions : DefaultOptionType[] = [
        {
            key: 1,
            value : 1,
            label : 'Easy',
        },
        {
            key : 2, 
            value : 2,
            label : 'Medium',
        },
        {
            key : 3,
            value : 3,
            label : 'Hard',
        }
    ];


    // TODO : Remove useState for form inputs that only need to be checked on submission and use useRef instead
    let submit = () => {
        setDate(Date.now());

        let newProblem : LeetcodeProblem = {
            title: title,
            description: description,
            priority: priority,
            hints: hints.map(hint => hint.value),
            answer: answer,
            date: new Date(date),
            category : 'category'
        }

        LeetcodeProblemController.addQuestion(newProblem);
    }

    return (
        <Card>
            <Form form={form} layout="vertical">
                <Form.Item label="Title">
                    <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item label="Difficulty">
                    <Select options={priorityOptions} placeholder={'Easy'} onChange={e => setPriority(e)} />
                </Form.Item>
                <Form.Item label="Hints">
                    <InputList items={hints} setItems={setHints} />
                </Form.Item>
                <Form.Item label="Answer">
                    <Input.TextArea 
                        placeholder="answer" 
                        rows={4}
                        value={answer} 
                        onChange={(e) => setAnswer(e.target.value)} 
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={submit}>Submit</Button>
                </Form.Item>
            </Form>
        </Card>

    )
}

export default AddQuestion;