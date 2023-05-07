import { useEffect, useState } from "react";
import useLeetcodeProblems from "../../hooks/useLeetcodeProblems";
import LeetcodeProblem from "../../models/LeetcodeProblem";
import { Row, Col } from "antd";
import LeetcodeProblemCard from "./LeetcodeProblemCard";
import Navbar from "./Navbar";
import useLeetcodeProblemCategories from "../../hooks/useLeetcodeProblemCategories";

const LeetcodeProblemCardList = (props : any) => {
    const categories = useLeetcodeProblemCategories(["Category"]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [problems, setProblems] = useState<LeetcodeProblem[]>([]);
    const [leetcodeProblems, setLeetcodeProblems] = useLeetcodeProblems([], selectedCategory);
    
    useEffect(() => {
        setProblems(leetcodeProblems);
    }, [leetcodeProblems])

    return (
        <div style={{display: "flex", flexDirection:"column"}}>
            <Navbar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} problems={problems} setProblems={setProblems} />
            <Row>
                {problems && problems.map((p, index) => 
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <LeetcodeProblemCard problem={p} />
                </Col>
                )}
            </Row>
        </div>
        
    )

}

export default LeetcodeProblemCardList;