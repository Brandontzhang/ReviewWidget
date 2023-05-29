import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LeetcodeProblem from "../models/LeetcodeProblem";
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";

const useLeetcodeProblems = (problems : LeetcodeProblem[], categories? : string[], shuffle? : boolean, due? : boolean) : [LeetcodeProblem[], Dispatch<SetStateAction<LeetcodeProblem[]>>] => {
    const leetcodeProblemController = new LeetcodeProblemController();
    const [leetcodeProblems, setLeetcodeProblems] = useState<LeetcodeProblem[]>(problems);

    const fetchAllProblems = async () => {
        console.log(due);
        const problemsPromise : Promise<LeetcodeProblem[]> = leetcodeProblemController.getAll(shuffle, due);
        const [problems]  = await Promise.all([problemsPromise]);
        console.log(problems);
        setLeetcodeProblems(problems);
    }

    const fetchProblemsByCategories = async (categories : string[]) => {
        const problemsPromise : Promise<LeetcodeProblem[]> = leetcodeProblemController.getProblemsInCategories(categories, shuffle, due);
        const [problems]  = await Promise.all([problemsPromise])
        setLeetcodeProblems(problems);
    }

    useEffect(() => {
        if (!categories || (categories && categories.length == 0)) {
            fetchAllProblems();
        } else {
            fetchProblemsByCategories(categories);
        }

    }, [categories]);

    return [leetcodeProblems, setLeetcodeProblems];
}

export default useLeetcodeProblems;