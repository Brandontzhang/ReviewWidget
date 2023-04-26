import { useEffect, useState } from "react";
import useLeetcodeProblems from "../hooks/useLeetcodeProblems";
import LeetcodeProblem from "../models/LeetcodeProblem";
import LeetcodeProblemCardFront from "./LeetcodeProblemCardFront";
import { Row, Col } from "antd";

const LeetcodeProblemCardList = (props : any) => {

    const leetcodeProblems = useLeetcodeProblems([]);

    const [problems, setProblems] = useState<LeetcodeProblem[]>([]);
    
    useEffect(() => {
        setProblems(leetcodeProblems);
    }, [leetcodeProblems])

    return (

        <Row>
            {problems && problems.map(p => 
            <Col xs={12} sm={8} md={6} lg={6} xl={4}>
                <LeetcodeProblemCardFront problem={p}/>
            </Col>
            )}
        </Row>
    )

}

export default LeetcodeProblemCardList;