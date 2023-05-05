import { useEffect, useState } from "react"
import LeetcodeProblemController from "../controllers/LeetcodeProblemController";

const useLeetcodeProblemCategories = (defaultCategories : string[]) => {
    const [categories, setCategories] = useState<string[]>(defaultCategories);

    const fetchCategories = async () => {
        const categoriesPromise : Promise<string[]> = LeetcodeProblemController.getCategories();
        const [categories] = await Promise.all([categoriesPromise]);
        setCategories(categories.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return categories;
}

export default useLeetcodeProblemCategories;