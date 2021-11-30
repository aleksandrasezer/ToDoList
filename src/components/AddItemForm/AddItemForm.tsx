import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addButtonStyle = props.disabled ? {color: 'grey'} : {color: 'green'}

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton style={addButtonStyle} onClick={addItem} disabled={props.disabled}>
            <AddBox fontSize='large'/>
        </IconButton>
    </div>
})

//types
type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled: boolean
}