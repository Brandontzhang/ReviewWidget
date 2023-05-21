import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LeetcodeProblem from "../models/LeetcodeProblem";
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";

const useLeetcodeProblems = (problems : LeetcodeProblem[], category? : string, shuffle? : boolean, due? : boolean) : [LeetcodeProblem[], Dispatch<SetStateAction<LeetcodeProblem[]>>] => {
    const leetcodeProblemController = new LeetcodeProblemController();
    const [leetcodeProblems, setLeetcodeProblems] = useState<LeetcodeProblem[]>(problems);

    const fetchAllProblems = async () => {
        const problemsPromise : Promise<LeetcodeProblem[]> = leetcodeProblemController.getAll(shuffle, due);
        const [problems]  = await Promise.all([problemsPromise])
        setLeetcodeProblems(problems);
    }

    const fetchProblemsByCategory = async (category : string) => {
        const problemsPromise : Promise<LeetcodeProblem[]> = leetcodeProblemController.getProblemsInCategory(category, shuffle, due);
        const [problems]  = await Promise.all([problemsPromise])
        setLeetcodeProblems(problems);
    }

    useEffect(() => {
        if (!category) {
            fetchAllProblems();
        } else {
            fetchProblemsByCategory(category);
        }
    }, [category]);

    return [leetcodeProblems, setLeetcodeProblems];
}

export default useLeetcodeProblems;