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
        if (problem.priority == 0) {
            return "#FFFFFF"
        }

        let currentDate = new Date();
        let reviewDate = new Date(problem.nextReviewDate);

        let timeDif = reviewDate.getTime() - currentDate.getTime();
        let daysDif = Math.ceil(timeDif / (1000 * 3600 * 24));

        let color = "#0000FF";

        if (daysDif <= 7) {
            color = "#27FF00";
        }

        if (daysDif <= 5) {
            color = "#FFE800";
        }

        if (daysDif <= 3) {
            color = "#FF7400";
        }

        if (daysDif < 0) {
            color = "#FF0000";
        } 

        return color;
    }

    // When a new list of problems is generated
    useEffect(() => {
        setProblem(props.problem);
    }, [props.problem])

    // When problem gets updated
    useEffect(() => {
        setPriorityColor(getPriorityColor());
    }, [problem])

    const updatePriority = async (priority : number) => {
        priority = Math.max(priority, 0);
        let updatedProblem = {
            ...problem,
            priority : priority
        }
        updatedProblem = await leetcodeProblemController.updateQuestion(updatedProblem);
        setSide("front");
        setProblem(updatedProblem);
        // Updating the list when the priority is changed
        if (props.updateList) {
            props.updateList(problem);
        }
    }

    const style = {
        ...props.style,
        boxShadow:`0px 0px 10px ${priorityColor}`,
        margin : "8%", 
        minWidth : "290px"
    }

    
    if (side === "hints") {
        return <LeetcodeProblemCardHints style={style} hints={problem.hints} setSide={setSide}/>
    } 

    if (side === "answer") {
        return <LeetcodeProblemCardAnswer style={style} updatePriority={updatePriority} priority={problem.priority} answer={problem.answer} setSide={setSide} />
    }

    return <LeetcodeProblemCardFront style={style} problem={problem} setSide={setSide} delete={props.delete}/>
    
}

export default LeetcodeProblemCard;