import { Button, Form, Input, InputRef } from "antd";
import React, { KeyboardEvent, MutableRefObject, useEffect, useRef } from "react";


interface ListItem {
    key : number, 
    value : string,
}

const InputList = (props : any) => {
    let items : ListItem[] = props.items;
    let itemInputs = useRef<{[key : number] : InputRef}>({});

    useEffect(() => {
        let newInputLine : InputRef = itemInputs.current[items.length];
        if (newInputLine)
            newInputLine.select();
    }, [items.length]);

    let addItem = () => {
        props.setItems([...items, {key : items.length + 1, value : ""}]);
    }

    let updateItem = (newValue : string , key : number) : void => {
        let filteredItems : ListItem[] = items.filter(i => i.key != key);
        let updatedItems : ListItem[] = [...filteredItems, {key : key, value : newValue}];
        updatedItems.sort((a, b) => a.key - b.key);
        props.setItems(updatedItems);
    }

    let handleEnter = (e : KeyboardEvent<HTMLInputElement>, item : ListItem) => {
        if (e.key === 'Enter') {
            if (item.key == items.length) {
                addItem();
                // move ref to new line
            } else {
                let nextInputLine : InputRef = itemInputs.current[item.key + 1];
                nextInputLine.select();
            }
        }
    }

    return (
        <React.Fragment>
            {items.map(item => {
                return (
                    // Move to different component and add delete
                    <Input 
                        key={item.key}
                        style={{margin : "0 0 8px"}}
                        ref={element => {itemInputs.current[item.key] = element as InputRef}}
                        placeholder="hint" 
                        value={item.value} 
                        onChange={e => updateItem(e.target.value, item.key)}
                        onKeyUp={e => handleEnter(e, item)}
                    /> 
                )
            })}
            <Button onClick={addItem}>Add Hint</Button>
        </React.Fragment>
    )
}

export default InputList;