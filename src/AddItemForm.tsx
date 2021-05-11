import {TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setError(false)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }

    return (
        <div>
            <TextField
                label={'Title'}
                onBlur={() => setError(false)}
                variant={'outlined'}
                error={error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddTask}
                helperText={error && 'Title is required'}
            />

            <AddBox color={'primary'}
                    onClick={onClickAddItem}
                    fontSize={'large'}/>
        </div>
    )
}
