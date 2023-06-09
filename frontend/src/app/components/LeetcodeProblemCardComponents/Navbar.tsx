import { Col, Menu, MenuProps, Row } from "antd"
import { ItemType } from "antd/es/menu/hooks/useItems"
import { FolderOutlined, HomeOutlined, PlusCircleFilled } from "@ant-design/icons";
const Navbar = (props : any) => {

    const {categories, selectedCategories, setSelectedCategories, problems} = props;

    const selectCategory = (e : any) => {
        let key : string = e.key;
        if (key === "") {
            setSelectedCategories([]);
            return;
        }
        setSelectedCategories((categories : string[]) => [...categories, key]);
    }

    const deselectCategory = (e : any) => {
        let key : string = e.key;
        setSelectedCategories((categories : string[]) => categories.filter(c => c != key));
    }

    const getCategories = (categories : string[]) : ItemType[] => {
        if (!categories) {
            return []
        }
        let listCategories : ItemType[] = categories.map(c => {return {label: c, key: c}})
        return [{label: "All Categories", key: ""}, ...listCategories];
    }

    const items : MenuProps['items'] = [
        {
            label: <span style={{fontSize: "100%"}}>Select Categories</span>,
            key: "1",
            children : getCategories(categories),
            icon: <FolderOutlined />
        }
    ]

    const NavMenu : MenuProps['items'] = [
        {
            label: <a href="/#/cards">Cards</a>,
            key: 1,
            icon: <FolderOutlined />
        },
        {
            label: <a href="/#/create">Add Question</a>,
            key: 2,
            icon: <PlusCircleFilled />
        },
        {
            label: <a href="/">Home</a>,
            key: 3,
            icon: <HomeOutlined />
        }
    ]

    return (
        <Row style={{width:"100%", borderBottom:"1px solid rgba(5, 5, 5, 0.06)"}}>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                {categories && <Menu multiple={true} selectedKeys={selectedCategories} onSelect={e => selectCategory(e)} onDeselect={e => deselectCategory(e)} mode="horizontal" items={items} />}
            </Col>
            <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Menu style={{display:"flex", flexDirection:"row", justifyContent:"end",width:"100%"}} mode="horizontal" items={NavMenu} />
            </Col>
        </Row>
    )
}

export default Navbar;