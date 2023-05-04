import { useEffect, useState } from "react";
import LeetcodeProblem from "../models/LeetcodeProblem";
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";

const useLeetcodeProblems = (problems : LeetcodeProblem[], category? : string) => {
    const [leetcodeProblems, setLeetcodeProblems] = useState<LeetcodeProblem[]>(problems);

    const fetchAllProblems = async () => {
        const problemsPromise : Promise<LeetcodeProblem[]> = LeetcodeProblemController.getAll();
        const [problems]  = await Promise.all([problemsPromise])
        setLeetcodeProblems(problems);
    }

    const fetchProblemsByCategory = async (category : string) => {
        const problemsPromise : Promise<LeetcodeProblem[]> = LeetcodeProblemController.getProblemsInCategory(category);
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

    return leetcodeProblems;
}

export default useLeetcodeProblems;