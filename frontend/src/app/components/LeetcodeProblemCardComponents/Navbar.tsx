import { Menu, MenuProps } from "antd"
import { ItemType } from "antd/es/menu/hooks/useItems"
import LeetcodeProblem from "../../models/LeetcodeProblem";

const Navbar = (props : any) => {

    const {category, setCategory, problems, setProblems} = props;

    const changeCategory = (e : any) => {
        let p : LeetcodeProblem[] = problems;
        console.log(p.flatMap(p => p.categories));

        setCategory(e.key);
    }

    const getCategories = (problems : LeetcodeProblem[]) : ItemType[] => {
        let categories = problems.flatMap(p => p.categories);
        let uniqueCategories = [...new Set(categories)];
        let listCategories : ItemType[] = uniqueCategories.map(c => {return {label: c, key: c}})
        return listCategories;
    }

    const items : MenuProps['items'] = [
        {
            label: <span style={{fontSize: "200%"}}>{category ? category : "Category"}</span>,
            key: "1",
            children : getCategories(problems)
        }
    ]

    return <Menu onClick={(e) => changeCategory(e)} mode="horizontal" items={items} />
}

export default Navbar;