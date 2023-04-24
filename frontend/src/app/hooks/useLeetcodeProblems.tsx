import { useEffect, useState } from "react";
import LeetcodeProblem from "../models/LeetcodeProblem";
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";

const useLeetcodeProblems = (problems : LeetcodeProblem[]) => {
    const [leetcodeProblems, setLeetcodeProblems] = useState<LeetcodeProblem[]>(problems);

    const fetchProblems = async () => {
        const problemsPromise : Promise<LeetcodeProblem[]> = LeetcodeProblemController.getAll();
        const [problems]  = await Promise.all([problemsPromise])
        setLeetcodeProblems(problems);
    }

    useEffect(() => {
        fetchProblems();
    }, []);

    return leetcodeProblems;
}

export default useLeetcodeProblems;