import { Button, Card, Select, Space } from "antd";
import useLeetcodeProblemCategories from "../../hooks/useLeetcodeProblemCategories";
import { useState } from "react";
import Navbar from "../LeetcodeProblemCardComponents/Navbar";
import { useNavigate } from "react-router-dom";

const Main = () => {

    const categories = useLeetcodeProblemCategories([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    const options = categories.map(category => {return {value : category, label : category}});

    const generateCard = () => {
        navigate("/review", {state : {selectedCategory : selectedCategory}});
    }

    const startReview = () => {
        navigate("/review", {state : {selectedCategory : selectedCategory, due : true}});
    }

    return (
        <div style={{display: "flex", flexDirection:"column", height: "100%",}}>
            <Navbar></Navbar>
            <Space direction="horizontal" style={{width: '100%', height: "100%", justifyContent: 'center'}}>
                <Card bodyStyle={{height:"100%"}} style={{height : "300px", width: "300px"}}>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
                    <div style={{display : "flex", flexDirection: "column", alignItems:"center"}}>
                        <span>Interleaving Retrieval Practice</span>
                    </div>
                    <div style={{display : "flex", flexDirection: "column", justifyContent:"space-between", alignItems:"center"}}>
                        <Select style={{width : "100%"}} options={options} onSelect={(c) => setSelectedCategory(c)} />
                    </div>
                    <div style={{display : "flex", flexDirection: "column", justifyContent:"space-between", alignItems:"center"}}>
                        <Button style={{margin: "10px"}} onClick={generateCard}>Review</Button>
                    </div>
                </div>
                </Card>
            </Space>
        </div>
        
    )

}

export default Main;