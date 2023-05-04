import { Menu, MenuProps } from "antd"
import { ItemType } from "antd/es/menu/hooks/useItems"
import LeetcodeProblem from "../../models/LeetcodeProblem";

const Navbar = (props : any) => {

    const {categories, selectedCategory, setSelectedCategory, problems} = props;

    const changeCategory = (e : any) => {
        let p : LeetcodeProblem[] = problems;
        setSelectedCategory(e.key);
    }

    const getCategories = (categories : string[]) : ItemType[] => {
        let listCategories : ItemType[] = categories.map(c => {return {label: c, key: c}})
        return [{label: "All Categories", key: ""}, ...listCategories];
    }

    const items : MenuProps['items'] = [
        {
            label: <span style={{fontSize: "200%"}}>{selectedCategory ? selectedCategory : "All Categories"}</span>,
            key: "1",
            children : getCategories(categories)
        }
    ]

    return <Menu onClick={(e) => changeCategory(e)} mode="horizontal" items={items} />
}

export default Navbar;