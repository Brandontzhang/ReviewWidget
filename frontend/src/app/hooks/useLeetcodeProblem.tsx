import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LeetcodeProblem from "../models/LeetcodeProblem"
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";

const useLeetcodeProblem = (id? : string) : [LeetcodeProblem | undefined, Dispatch<SetStateAction<LeetcodeProblem | undefined>>] => {
    const [leetcodeProblem, setLeetcodeProblem] = useState<LeetcodeProblem | undefined>();

    const fetchProblem = async (id : string) => {
        const problemsPromise : Promise<LeetcodeProblem> = LeetcodeProblemController.getProblemById(id);
        const [problem] = await Promise.all([problemsPromise])
        setLeetcodeProblem(problem);
    }

    useEffect(() => {
        if (id) {
            fetchProblem(id);
        }
    }, [id]);

    return [leetcodeProblem, setLeetcodeProblem];
}

export default useLeetcodeProblem;