import { useEffect, useState } from "react";
import useLeetcodeProblems from "../../hooks/useLeetcodeProblems";
import LeetcodeProblem from "../../models/LeetcodeProblem";
import { Row, Col } from "antd";
import LeetcodeProblemCard from "./LeetcodeProblemCard";
import Navbar from "./Navbar";
import useLeetcodeProblemCategories from "../../hooks/useLeetcodeProblemCategories";
import LeetcodeProblemController from "../../controllers/LeetcodeProblemController";
import { useLocation } from "react-router-dom";

const LeetcodeProblemCardList = (props : any) => {
    const location = useLocation();
    const leetcodeProblemController = new LeetcodeProblemController();
    const categories = useLeetcodeProblemCategories(["Category"]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [leetcodeProblems, setLeetcodeProblems] = useLeetcodeProblems([], selectedCategories);
    
    useEffect(() => {
        if (location.state) {
            setSelectedCategories(location.state.selectedCategories)
        }
    }, [])

    useEffect(() => {
        setLeetcodeProblems(leetcodeProblems);
    }, [leetcodeProblems])

    const deleteProblem = (problem : LeetcodeProblem) => {
        leetcodeProblemController.deleteQuestion(problem);
        setLeetcodeProblems(leetcodeProblems => {
            return leetcodeProblems.filter(p => p.id != problem.id);
        })
    }

    return (
        <div style={{display: "flex", flexDirection:"column"}}>
            <Navbar categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} problems={leetcodeProblems} setProblems={setLeetcodeProblems} />
            <Row>
                {leetcodeProblems && leetcodeProblems.map((p, index) => 
                <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                    <LeetcodeProblemCard problem={p} delete={deleteProblem}/>
                </Col>
                )}
            </Row>
        </div>
        
    )

}

export default LeetcodeProblemCardList;