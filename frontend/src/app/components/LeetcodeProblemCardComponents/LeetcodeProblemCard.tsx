import { useState } from "react";
import LeetcodeProblemCardFront from "./LeetcodeProblemCardFront";
import LeetcodeProblemCardHints from "./LeetcodeProblemCardHints";
import LeetcodeProblemCardAnswer from "./LeetcodeProblemCardAnswer";

const LeetcodeProblemCard = (props : any) => {
    const [side, setSide] = useState("front");
    
    if (side === "hints") {
        return <LeetcodeProblemCardHints hints={props.problem.hints} setSide={setSide}/>
    } 

    if (side === "answer") {
        return <LeetcodeProblemCardAnswer answer={props.problem.answer} setSide={setSide} />
    }

    return <LeetcodeProblemCardFront problem={props.problem} setSide={setSide}/>
    
}

export default LeetcodeProblemCard;