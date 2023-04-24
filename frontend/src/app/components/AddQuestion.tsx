import { Form, Input, Card, Button, Select, notification } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";
import InputList from "./InputList";
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";
import LeetcodeProblem from "../models/LeetcodeProblem";
import ComponenentTags from "./ComponentTags";
import { clear } from "console";

interface Hint {
    key : number,
    value : string;
}

let AddQuestion = (props : any) => {
    const [form] = Form.useForm();
    
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [date, setDate] = useState(Date.now());
    let [priority, setPriority] = useState(-1);
    let [answer, setAnswer] = useState("");
    let [hints, setHints] = useState<Hint[]>([]);
    let [categories, setCategories] = useState<string[]>([]);

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

    const successNotification = () => {
        notification.success({
          message: 'Question created',
          placement : 'top'
        });
    };

    let submit = async () => {
        setDate(Date.now());
        let newProblem : LeetcodeProblem = {
            title: title,
            description: description,
            userDefinedPriority: priority == -1 ? 0 : priority,
            hints: hints.map(hint => hint.value),
            answer: answer,
            date: new Date(date),
            categories : categories
        }

        await LeetcodeProblemController.addQuestion(newProblem);
        form.resetFields();
        successNotification();
    }

    return (
        <Card>
            <Form form={form} name='qForm' layout="vertical" onFinish={submit}>
                <Form.Item label="Title" name="title" rules={[{required : true, message: "Please enter a title"}]}>
                    <Input 
                        placeholder="Title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                    />
                </Form.Item>
                <Form.Item label="Labels" name="categories">
                    <ComponenentTags setTags={setCategories}></ComponenentTags>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input.TextArea 
                        placeholder="Description"
                        rows={4} 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                    />
                </Form.Item>
                <Form.Item label="Difficulty" name="priority" rules={[{required : true, message: "Please select a difficulty"}]}>
                    <Select 
                        options={priorityOptions} 
                        placeholder={'Easy'} 
                        onChange={e => setPriority(e)} 
                    />
                </Form.Item>
                <Form.Item label="Hints" name="hints">
                    <InputList items={hints} setItems={setHints} />
                </Form.Item>
                <Form.Item label="Answer" name="answer" rules={[{required : true, message: "Please enter an answer"}]}>
                    <Input.TextArea 
                        placeholder="answer" 
                        rows={4}
                        value={answer} 
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>

    )
}

export default AddQuestion;