import { Tag, Input, InputRef, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './components.scss'

const ComponenentTags = (props : any) => {
    const [tags, setTags] = useState<string[]>(props.tags);
    const [inputVisible, setInputVisible] = useState(false);
    const [newTag, setNewTag] = useState("");
    const {editable} = props;

    let inputRef = useRef<InputRef>(null);

    // Refresh on category change
    useEffect(() => {
        setTags(props.tags);
    }, [props.tags])

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
        <Space className='tagList' style={{overflowX : 'auto', overflowY: 'hidden', width: '100%', height: '32px'}}>
            {tags?.map(tag => {
                const isLongTag = tag.length > 20;
                return (
                    <Tag style={{margin : "5px", marginLeft: '0'}} key={tag} closable={editable} onClose={() => handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                )
            })}
            {editable && inputVisible && (
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
        {editable && !inputVisible && (
          <Tag
            onClick={() => setInputVisible(true)}
            style={{ background: '#fff', borderStyle: 'dashed', margin: "5px" }}
          >
            + New Category
          </Tag>
        )}
        </Space>
    )
}

export default ComponenentTags;