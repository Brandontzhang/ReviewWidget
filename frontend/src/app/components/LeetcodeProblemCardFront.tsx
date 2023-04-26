import { Card, Tag } from "antd";
import LeetcodeProblem from "../models/LeetcodeProblem";
import { useEffect, useState } from "react";
import ComponenentTags from "./ComponentTags";

const LeetcodeProblemCardFront = (props : any) => {

    const [problem, setProblem] = useState<LeetcodeProblem>(props.problem);
    const [tags, setTags] = useState<string[]>(problem.categories);

    // useEffect(() => {
    //     setTags(problem.categories);
    //     console.log(problem.categories)
    // }, [problem]);

    return (
        <Card style={{margin: "2%", height : "200px"}} title={problem?.title}>
            {tags && <div>
                <ComponenentTags tags={tags} setTags={setTags}></ComponenentTags>
            </div>}
            
            <div style={{overflow: 'hidden', wordWrap: "break-word", height:'100px', width:'auto'}}>
                {problem.description}
            </div>
        </Card>
    )
}

export default LeetcodeProblemCardFront;