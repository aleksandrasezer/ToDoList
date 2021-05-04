import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState<string>(props.title)
    const [error, setError] = useState<boolean>(false)
    const errorMessage = error ?
        <div style={{color: "red"}}> Title is required!</div> : null

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    return (
        editMode
            ? <input
                value={title}
                onChange={onChangeTitle}
                onBlur={offEditMode}
                autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )

}