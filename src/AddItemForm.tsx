import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type AddItemFormPropsType = {
  addItem: (title:string) => void
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

    const errorMessage = error ?
        <div style={{color: "red"}}> Title is required!</div> : null

    return (
        <div>
            <input className = {error ? "error" : ""}
                   value={title}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressAddTask}/>
            <button onClick={onClickAddItem}>+</button>
            {errorMessage}
        </div>
    )
}
