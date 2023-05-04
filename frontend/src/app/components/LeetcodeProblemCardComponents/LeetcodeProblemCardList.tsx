import { useEffect, useState } from "react";
import useLeetcodeProblems from "../../hooks/useLeetcodeProblems";
import LeetcodeProblem from "../../models/LeetcodeProblem";
import { Row, Col, Space } from "antd";
import LeetcodeProblemCard from "./LeetcodeProblemCard";
import Navbar from "./Navbar";

const LeetcodeProblemCardList = (props : any) => {
    const [category, setCategory] = useState("");
    const [problems, setProblems] = useState<LeetcodeProblem[]>([]);
    const leetcodeProblems = useLeetcodeProblems([], category);
    
    useEffect(() => {
        setProblems(leetcodeProblems);
    }, [leetcodeProblems])

    return (
        <div style={{display: "flex", flexDirection:"column"}}>
            <Navbar category={category} setCategory={setCategory} problems={problems} setProblems={setProblems} />
            <Row>
                {problems && problems.map((p, index) => 
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <LeetcodeProblemCard problem={p}/>
                </Col>
                )}
            </Row>
        </div>
        
    )

}

export default LeetcodeProblemCardList;