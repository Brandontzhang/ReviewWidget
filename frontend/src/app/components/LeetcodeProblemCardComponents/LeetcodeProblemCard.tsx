import { useEffect, useState } from "react";
import LeetcodeProblemCardFront from "./LeetcodeProblemCardFront";
import LeetcodeProblemCardHints from "./LeetcodeProblemCardHints";
import LeetcodeProblemCardAnswer from "./LeetcodeProblemCardAnswer";
import LeetcodeProblemController from "../../controllers/LeetcodeProblemController";
import LeetcodeProblem from "../../models/LeetcodeProblem";

const LeetcodeProblemCard = (props : any) => {
    const [side, setSide] = useState("front");
    const [problem, setProblem] = useState<LeetcodeProblem>(props.problem);
    const [priorityColor, setPriorityColor] = useState("#FFFFFF")

    const getPriorityColor = () => {
        switch (problem.priority) {
            case 0:
                return '#FFFFFF';
            case 1:
                return '#27FF00';
            case 2: 
                return '#00B9CB';
            case 3:
                return '#FFE800';
            case 4:
                return '#FF7400';
            case 5:
                return '#FF0000';
            case -1:
                return '#FFFFFF';
            default:
                return '#FFFFFF';
        }
    }

    // When a new list of problems is generated
    useEffect(() => {
        setProblem(props.problem);
    }, [props.problem])

    // When problem gets updated
    useEffect(() => {
        setPriorityColor(getPriorityColor());
    }, [problem])

    const updatePriority = async (priorityIncrement : number) => {
        let priority = problem.userDefinedPriority + priorityIncrement;
        if (priority > 5) {
            priority = 5;
        }
        let updatedProblem = {
            ...problem,
            date: new Date(),
            userDefinedPriority : problem.userDefinedPriority + priorityIncrement
        }
        updatedProblem = await LeetcodeProblemController.updateQuestion(updatedProblem);
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

    const style = {
        ...props.style,
        boxShadow:`0px 0px 10px ${priorityColor}`
    }

    
    if (side === "hints") {
        return <LeetcodeProblemCardHints style={style} hints={problem.hints} setSide={setSide}/>
    } 

    if (side === "answer") {
        return <LeetcodeProblemCardAnswer style={style} updatePriority={updatePriority} archive={archive} answer={problem.answer} setSide={setSide} />
    }

    return <LeetcodeProblemCardFront style={style} problem={problem} setSide={setSide}/>
    
}

export default LeetcodeProblemCard;