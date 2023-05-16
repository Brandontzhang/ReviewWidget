import { useEffect, useState } from "react"
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";

const useLeetcodeProblemCategories = (defaultCategories : string[]) => {
    const leetcodeProblemController = new LeetcodeProblemController();
    const [categories, setCategories] = useState<string[]>(defaultCategories);

    const fetchCategories = async () => {
        const categoriesPromise : Promise<string[]> = leetcodeProblemController.getCategories();
        const [categories] = await Promise.all([categoriesPromise]);
        setCategories(categories.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return categories;
}

export default useLeetcodeProblemCategories;