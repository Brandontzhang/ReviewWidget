import { useLocation } from "react-router-dom";
import useLeetcodeProblems from "../../hooks/useLeetcodeProblems";
import Navbar from "../LeetcodeProblemCardComponents/Navbar";
import { useEffect, useState } from "react";
import LeetcodeProblemCard from "../LeetcodeProblemCardComponents/LeetcodeProblemCard";
import LeetcodeProblem from "../../models/LeetcodeProblem";
import { Button, Card, Space } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Review = (props : any) => {

    const location = useLocation();
    const {state} = location;
    const [index, setIndex] = useState(0);
    const [leetcodeProblems, setLeetcodeProblems] = useLeetcodeProblems([], state.selectedCategory ? state.selectedCategory : "");
    const [problem, setProblem] = useState(leetcodeProblems[index]);

    const changeProblem = (increment : number) => {
        setIndex(index => {
            setProblem(leetcodeProblems[index + increment]);
            return index + increment;
        })
    }

    // When the inital problems load
    useEffect(() => {
        setProblem(leetcodeProblems[index]);
    }, [leetcodeProblems]);

    // When problem states are updated (the priority)... Problem should be removed
    const updateList = (problem : LeetcodeProblem) => {
        const filteredProblems = leetcodeProblems.filter(p => problem.id != p.id);
        console.log(filteredProblems.length);
        setLeetcodeProblems([...filteredProblems]);
        setIndex(index => {
            return Math.min(Math.max(0, index - 1), filteredProblems.length);
        });
    }

    return (
        <div style={{display: "flex", flexDirection:"column", justifyContent: "space-between", alignItems:"center", height: "100%",}}>
            <Navbar></Navbar>
            {problem && <LeetcodeProblemCard style={{height : "300px", width: "400px"}} problem={problem} updateList={updateList} />}
            <ButtonGroup style={{marginBottom : "150px"}}>
                <Button disabled={index === 0} onClick={() => changeProblem(-1)}><LeftOutlined /></Button>
                <Button disabled={index === leetcodeProblems.length - 1 || leetcodeProblems.length === 0} onClick={() => changeProblem(1)}><RightOutlined /></Button>
            </ButtonGroup>
        </div>
    )
}

export default Review;