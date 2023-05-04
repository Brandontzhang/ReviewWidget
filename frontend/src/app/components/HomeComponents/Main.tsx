import { Button, Card, Select, Space } from "antd";
import useLeetcodeProblemCategories from "../../hooks/useLeetcodeProblemCategories";
import { useEffect, useState } from "react";

const Main = () => {

    const categories = useLeetcodeProblemCategories([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const options = categories.map(category => {return {value : category, label : category}});

    const generateCard = () => {
        console.log(selectedCategory);
        // Get card by category
    }

    return (
        <Space direction="horizontal" style={{width: '100%', height: "100%", justifyContent: 'center'}}>
            <Card bodyStyle={{height:"100%"}} style={{height : "300px", width: "300px"}}>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
                <div style={{display : "flex", flexDirection: "column", alignItems:"center"}}>
                    <span>Interleaving Review</span>
                </div>
                <div style={{display : "flex", flexDirection: "column", justifyContent:"space-between", alignItems:"center"}}>
                    <Select style={{width : "100%"}} options={options} onSelect={(c) => setSelectedCategory(c)} />
                    <Button style={{margin: "10px"}} onClick={generateCard}>Review</Button>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <Button href="/cards">View All</Button>
                    <Button href="/create">Add New</Button>
                </div>
            </div>
            </Card>
        </Space>
    )

}

export default Main;