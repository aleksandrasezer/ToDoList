import {TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {

    console.log('AddItemForm')

    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError('title is required')
        }
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }

    return (
        <div>
            <TextField
                label={'Title'}
                onBlur={() => setError(null)}
                variant={'outlined'}
                error={!!error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddTask}
                helperText={error}
            />

            <AddBox color={'primary'}
                    onClick={onClickAddItem}
                    fontSize={'large'}/>
        </div>
    )
})
