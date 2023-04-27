import { useEffect, useState } from "react";
import useLeetcodeProblems from "../../hooks/useLeetcodeProblems";
import LeetcodeProblem from "../../models/LeetcodeProblem";
import { Row, Col } from "antd";
import LeetcodeProblemCard from "./LeetcodeProblemCard";

const LeetcodeProblemCardList = (props : any) => {

    const leetcodeProblems = useLeetcodeProblems([]);

    const [problems, setProblems] = useState<LeetcodeProblem[]>([]);
    
    useEffect(() => {
        setProblems(leetcodeProblems);
    }, [leetcodeProblems])

    return (

        <Row>
            {problems && problems.map(p => 
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <LeetcodeProblemCard problem={p}/>
            </Col>
            )}
        </Row>
    )

}

export default LeetcodeProblemCardList;