import { Tag, Input, InputRef } from 'antd';
import { useEffect, useRef, useState } from 'react';

const ComponenentTags = (props : any) => {

    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [newTag, setNewTag] = useState("");

    let inputRef = useRef<InputRef>(null);

    // Toggle for clicking to add new tag
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputVisible]);

    const handleClose = (removedTag : string) => {
        setTags(tags.filter(tag => tag !== removedTag));
    }

    const addTag = () => {
        if (!tags.includes(newTag)) {
            setTags(curTags => [...curTags, newTag]);
            props.setTags([...tags, newTag]);
        } 
        setNewTag("");
        setInputVisible(false);
    }

    return (
        <div>
            {tags.map(tag => {
                const isLongTag = tag.length > 20;
                return (
                    <Tag key={tag} closable={true} onClose={() => handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                )
            })}
            {inputVisible && (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    onBlur={addTag}
                    onPressEnter={addTag}
                />
        )}
        {!inputVisible && (
          <Tag
            onClick={() => setInputVisible(true)}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            + New Category
          </Tag>
        )}
        </div>
    )
}

export default ComponenentTags;