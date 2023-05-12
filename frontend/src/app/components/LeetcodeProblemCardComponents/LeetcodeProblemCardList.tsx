import { useEffect, useState } from "react";
import useLeetcodeProblems from "../../hooks/useLeetcodeProblems";
import LeetcodeProblem from "../../models/LeetcodeProblem";
import { Row, Col } from "antd";
import LeetcodeProblemCard from "./LeetcodeProblemCard";
import Navbar from "./Navbar";
import useLeetcodeProblemCategories from "../../hooks/useLeetcodeProblemCategories";
import LeetcodeProblemController from "../../controllers/LeetcodeProblemController";

const LeetcodeProblemCardList = (props : any) => {
    const categories = useLeetcodeProblemCategories(["Category"]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [problems, setProblems] = useState<LeetcodeProblem[]>([]);
    const [leetcodeProblems, setLeetcodeProblems] = useLeetcodeProblems([], selectedCategory);
    
    useEffect(() => {
        setProblems(leetcodeProblems);
    }, [leetcodeProblems])

    const deleteProblem = (problem : LeetcodeProblem) => {
        LeetcodeProblemController.deleteQuestion(problem);
        setLeetcodeProblems(leetcodeProblems => {
            return leetcodeProblems.filter(p => p.id != problem.id);
        })
    }

    return (
        <div style={{display: "flex", flexDirection:"column"}}>
            <Navbar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} problems={problems} setProblems={setProblems} />
            <Row>
                {problems && problems.map((p, index) => 
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <LeetcodeProblemCard problem={p} delete={deleteProblem}/>
                </Col>
                )}
            </Row>
        </div>
        
    )

}

export default LeetcodeProblemCardList;