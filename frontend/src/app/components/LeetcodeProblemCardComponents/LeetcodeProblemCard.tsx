import { useEffect, useState } from "react";
import LeetcodeProblemCardFront from "./LeetcodeProblemCardFront";
import LeetcodeProblemCardHints from "./LeetcodeProblemCardHints";
import LeetcodeProblemCardAnswer from "./LeetcodeProblemCardAnswer";
import LeetcodeProblemController from "../../controllers/LeetcodeProblemController";
import LeetcodeProblem from "../../models/LeetcodeProblem";

const LeetcodeProblemCard = (props : any) => {
    const leetcodeProblemController = new LeetcodeProblemController();
    const [side, setSide] = useState("front");
    const [problem, setProblem] = useState<LeetcodeProblem>(props.problem);
    const [priorityColor, setPriorityColor] = useState("#FFFFFF")

    const getPriorityColor = () => {
        switch (problem.priority) {
            case 0:
                return '#27FF00';
            case 1:
                return '#00B9CB';
            case 2: 
                return '#FFE800';
            case 3:
                return '#FF7400';
            case 4:
                return '#FF00AA';
            case 5:
                return '#FF0000';
            case -1:
                return '#808080';
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
        if (priority <= -1) {
            priority = -1;
        }
        let updatedProblem = {
            ...problem,
            date: new Date(),
            userDefinedPriority : priority
        }
        updatedProblem = await leetcodeProblemController.updateQuestion(updatedProblem);
        setSide("front");
        setProblem(updatedProblem);
        // Updating the list when the priority is changed
        if (props.updateList) {
            props.updateList(problem);
        }
    }

    const archive = () => {
        let updatedProblem = {
            ...problem,
            date: new Date(),
            userDefinedPriority : -1
        }
        leetcodeProblemController.updateQuestion(updatedProblem);
        setSide("front");
        setProblem(updatedProblem);
        if (props.updateList) {
            props.updateList(problem);
        }
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

    return <LeetcodeProblemCardFront style={style} problem={problem} setSide={setSide} delete={props.delete}/>
    
}

export default LeetcodeProblemCard;