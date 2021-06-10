import { TextField } from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo(function(props: EditableSpanPropsType) {

    console.log('editable span')

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField
                value={title}
                label={'Title'}
                onChange={onChangeTitle}
                onBlur={offEditMode}
                autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )

})