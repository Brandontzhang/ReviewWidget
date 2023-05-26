import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LeetcodeProblem from "../models/LeetcodeProblem";
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";

const useReviewLeetcodeProblems = (problems : LeetcodeProblem[]) : [LeetcodeProblem[], Dispatch<SetStateAction<LeetcodeProblem[]>>] => {
    const leetcodeProblemController = new LeetcodeProblemController();
    const [reviewLeetcodeProblems, setReviewLeetcodeProblems] = useState<LeetcodeProblem[]>([]);

    const fetchProblemsForReview = async() => {
        const problemsPromise : Promise<LeetcodeProblem[]> = leetcodeProblemController.getAll(true, true);
        const [problems] = await Promise.all([problemsPromise]);
        setReviewLeetcodeProblems(problems);
    }

    useEffect(() => {
        fetchProblemsForReview();
    },  []);

    return [reviewLeetcodeProblems, setReviewLeetcodeProblems];
}