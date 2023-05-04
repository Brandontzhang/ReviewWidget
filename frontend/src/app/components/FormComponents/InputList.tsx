import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space } from "antd";
import React, { useState, useRef } from "react";


interface ListItem {
    key : number, 
    value : string,
}

const InputList = (props : any) => {
    let items : ListItem[] = props.items;
    let itemInputs = useRef<{[key : number] : InputRef}>({});
    let [key, setKey] = useState(items.length);

    let addItem = () => {
        props.setItems([...items, {key : key + 1, value : ""}]);
        setKey(key => key + 1);
    }

    let updateItem = (newValue : string , key : number) : void => {
        let filteredItems : ListItem[] = items.filter(i => i.key != key);
        let updatedItems : ListItem[] = [...filteredItems, {key : key, value : newValue}];
        updatedItems.sort((a, b) => a.key - b.key);
        props.setItems(updatedItems);
    }

    let deleteListItem = (item : ListItem) => {
        props.setItems((curItems : ListItem[]) => {
            let removedList = curItems.filter(i => i.key != item.key);
            return removedList;
        })
    }

    return (
        <React.Fragment>
            {items.map(item => {
                return (
                    // Move to different component and add delete
                    <Space.Compact key={item.key} style={{width : '100%'}}>
                        <Input 
                        style={{margin : "0 0 8px"}}
                        ref={element => {itemInputs.current[item.key] = element as InputRef}}
                        placeholder="hint" 
                        value={item.value} 
                        onChange={e => updateItem(e.target.value, item.key)}
                        /> 
                        <Button onClick={() => deleteListItem(item)}><DeleteOutlined /></Button>
                    </Space.Compact>
                    
                )
            })}
            <Button onClick={addItem}>Add Hint</Button>
        </React.Fragment>
    )
}

export default InputList;