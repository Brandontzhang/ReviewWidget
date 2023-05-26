import { Button, Card, Col, Row, Select, Space } from "antd";
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
        <div style={{height: "100%"}}>
            <Navbar></Navbar>
            <Row style={{height: "100%"}}>
                <Col style={{display: "flex", justifyContent: 'center', alignItems: "center"}} lg={12}>
                    <Card bodyStyle={{height:"100%"}} style={{height : "300px", width: "300px"}}>
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
                            <div style={{display : "flex", flexDirection: "column", alignItems:"center"}}>
                                <span>Interleaving Retrieval Practice</span>
                            </div>
                            <div style={{display : "flex", flexDirection: "column", justifyContent:"space-between", alignItems:"center"}}>
                                <Select style={{width : "100%"}} options={options} onSelect={(c) => setSelectedCategory(c)} />
                            </div>
                            <div style={{display : "flex", flexDirection: "column", justifyContent:"space-between", alignItems:"center"}}>
                                <Button style={{margin: "10px"}} onClick={generateCard}>View Cards</Button>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col style={{display: "flex", justifyContent: 'center', alignItems: "center"}} lg={12}>
                    <Button onClick={() => startReview()} style={{width: "150px", height: "50px", backgroundColor:"#d64b4b", color:"white"}}>
                        Review
                    </Button>
                </Col>
            </Row>
        </div>
        
    )

}

export default Main;