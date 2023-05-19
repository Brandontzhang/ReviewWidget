import { Form, Input, Card, Button, Select, notification } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import InputList from "./InputList";
import LeetcodeProblemController from "../../controllers/LeetcodeProblemController";
import LeetcodeProblem from "../../models/LeetcodeProblem";
import ComponenentTags from "./ComponentTags";
import Navbar from "../LeetcodeProblemCardComponents/Navbar";
import { useParams } from "react-router-dom";
import useLeetcodeProblem from "../../hooks/useLeetcodeProblem";

interface Hint {
    key : number,
    value : string;
}

let AddQuestion = (props : any) => {
    const leetcodeProblemController = new LeetcodeProblemController();
    const [form] = Form.useForm();
    
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [priority, setPriority] = useState(-1);
    let [difficulty, setDifficulty] = useState(1);
    let [answer, setAnswer] = useState("");
    let [hints, setHints] = useState<Hint[]>([]);
    let [categories, setCategories] = useState<string[]>([]);
    const { id } = useParams();
    const [leetcodeProblem, setLeetcodeProblem] = useLeetcodeProblem(id);

    useEffect(() => {
        if (leetcodeProblem) {
            const {title, description, priority, answer, hints, categories} = leetcodeProblem;
            setTitle(title);
            setDescription(description);
            setPriority(priority);
            setAnswer(answer);
            setHints(hints.map((hint, index) => {return{key : index, value : hint}}));
            setCategories(categories);
            form.setFieldValue("title", title);
            form.setFieldValue("description", description);
            form.setFieldValue("priority", priority);
            form.setFieldValue("answer", answer);
            form.setFieldValue("hints", hints);
            form.setFieldValue("categories", categories);
        }
    }, [leetcodeProblem]);

    let difficultyOptions : DefaultOptionType[] = [
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
          message: id ? 'Question updated' : 'Question created',
          placement : 'top'
        });
    };

    let submit = async () => {
        let newProblem : LeetcodeProblem = {
            id : id? id : "",
            title: title,
            description: description,
            priority: 5, // Default priority always starts at 5
            hints: hints.map(hint => hint.value),
            answer: answer,
            categories : categories,
            difficulty : difficulty,

            // Dates are temporary values, they are set on the backend on create
            lastReviewedDate : new Date(), 
            nextReviewDate : new Date(),
        }

        if (!id) {
            // Creating a problem
            await leetcodeProblemController.addQuestion(newProblem);
        } else {
            // Updating a problem
            await leetcodeProblemController.updateQuestion(newProblem);
        }
        form.resetFields();
        setCategories([]);
        setHints([]);
        successNotification();
    }

    return (
        <div style={{display: "flex", flexDirection:"column", height: "100%",}}>
            <Navbar/>
            <Card style={{margin : '2%'}}>
            <Form form={form} name='qForm' layout="vertical" onFinish={submit}>
                <Form.Item label="Title" name="title" rules={[{required : true, message: "Please enter a title"}]}>
                    <Input 
                        placeholder="Title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                    />
                </Form.Item>
                <Form.Item label="Labels" name="categories">
                    <ComponenentTags tags={categories} setTags={setCategories} editable={true}></ComponenentTags>
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{required : true, message: "Please enter a description"}]}>
                    <Input.TextArea 
                        placeholder="Description"
                        rows={4} 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                    />
                </Form.Item>
                <Form.Item label="Difficulty" name="difficulty" rules={[{required : true, message: "Please select a difficulty"}]}>
                    <Select 
                        options={difficultyOptions} 
                        placeholder={'Easy'} 
                        onChange={e => setDifficulty(e)} 
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
        </div>
        

    )
}

export default AddQuestion;