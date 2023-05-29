import { Button, Card, Col, Row, Select, Space } from "antd";
import useLeetcodeProblemCategories from "../../hooks/useLeetcodeProblemCategories";
import { useState } from "react";
import Navbar from "../LeetcodeProblemCardComponents/Navbar";
import { useNavigate } from "react-router-dom";
import useLeetcodeProblems from "../../hooks/useLeetcodeProblems";

const Main = () => {

    const categories = useLeetcodeProblemCategories([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [leetcodeProblems, setLeetcodeProblems] = useLeetcodeProblems([], selectedCategories, false, true);
    const navigate = useNavigate();

    const options = categories.map(category => {return {value : category, label : category}});

    const viewCards = () => {
        navigate("/cards", {state : {selectedCategories : selectedCategories}});
    }

    const startReview = () => {
        navigate("/review", {state : {selectedCategories : selectedCategories, due : true}});
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
                                <Select 
                                    mode="multiple" 
                                    style={{width : "100%"}} 
                                    options={options} 
                                    onDeselect={(c : string) => setSelectedCategories(sc => sc.filter(existingCategory => existingCategory != c))} 
                                    onSelect={(c : string) => setSelectedCategories(sc => [...sc, c])} 
                                />
                            </div>
                            <div style={{display : "flex", flexDirection: "column", justifyContent:"space-between", alignItems:"center"}}>
                                <Button style={{margin: "10px"}} onClick={viewCards}>View Cards</Button>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col style={{display: "flex", justifyContent: 'center', alignItems: "center"}} lg={12}>
                    <Button onClick={() => startReview()} style={{width: "150px", height: "50px", backgroundColor:"#d64b4b", color:"white"}}>
                        Review ({leetcodeProblems.length})
                    </Button>
                </Col>
            </Row>
        </div>
        
    )

}

export default Main;