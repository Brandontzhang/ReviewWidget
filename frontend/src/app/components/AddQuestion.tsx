import { Form, Input, Card, Button, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";

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

    let updateHints = (newHint : string , key : number) : void => {
        let filteredHints : Hint[] = hints.filter(h => h.key != key);
        let updatedHints : Hint[] = [...filteredHints, {key : key, value : newHint}];
        updatedHints.sort((a, b) => a.key - b.key);
        setHints(updatedHints);
    }

    let submit = () => {
        setDate(Date.now());
        hints.forEach(console.log);
    }

    return (
        <Card>
            <Form form={form} layout="vertical">
                <Form.Item label="Title">
                    <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item label="Difficulty">
                    <Select options={priorityOptions} />
                </Form.Item>
                <Form.Item label="Hints">
                    {hints.map(hint => {
                        return (
                            // Move to different component and add delete
                            <Input key={hint.key} placeholder="hint" value={hint.value} onChange={e => updateHints(e.target.value, hint.key)}/> 
                        )
                    })}
                    <Button onClick={() => {
                        setHints([...hints, {key : hints.length + 1, value : ""}]);
                    }}>Plus</Button>
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