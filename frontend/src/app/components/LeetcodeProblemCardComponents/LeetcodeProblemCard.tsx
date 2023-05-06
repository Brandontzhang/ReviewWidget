import { useEffect, useState } from "react";
import LeetcodeProblemCardFront from "./LeetcodeProblemCardFront";
import LeetcodeProblemCardHints from "./LeetcodeProblemCardHints";
import LeetcodeProblemCardAnswer from "./LeetcodeProblemCardAnswer";
import LeetcodeProblemController from "../../controllers/LeetcodeProblemController";
import LeetcodeProblem from "../../models/LeetcodeProblem";

const LeetcodeProblemCard = (props : any) => {
    const [side, setSide] = useState("front");
    const [problem, setProblem] = useState<LeetcodeProblem>(props.problem);

    useEffect(() => {
        setProblem(props.problem);
    }, [props.problem])

    const updatePriority = (priorityIncrement : number) => {
        let priority = problem.userDefinedPriority + priorityIncrement;
        if (priority > 5) {
            priority = 5;
        }
        let updatedProblem = {
            ...problem,
            date: new Date(),
            userDefinedPriority : problem.userDefinedPriority + priorityIncrement
        }
        LeetcodeProblemController.updateQuestion(updatedProblem);
        setSide("front");
        setProblem(updatedProblem);
    }

    const archive = () => {
        let updatedProblem = {
            ...problem,
            date: new Date(),
            userDefinedPriority : -1
        }
        LeetcodeProblemController.updateQuestion(updatedProblem);
        setSide("front");
        setProblem(updatedProblem);
    }

    
    if (side === "hints") {
        return <LeetcodeProblemCardHints style={props.style} hints={problem.hints} setSide={setSide}/>
    } 

    if (side === "answer") {
        return <LeetcodeProblemCardAnswer style={props.style} updatePriority={updatePriority} archive={archive} answer={problem.answer} setSide={setSide} />
    }

    return <LeetcodeProblemCardFront style={props.style} problem={problem} setSide={setSide}/>
    
}

export default LeetcodeProblemCard;