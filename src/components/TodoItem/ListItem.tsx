import {TodoItem} from "@/types/TodoItem";
import React from "react";

type TodoItemProps = {
    item: TodoItem
}

export default function ListItem({item}: TodoItemProps): React.JSX.Element {
    return (
        <tr>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{`${item.deadline.toLocaleDateString()} ${item.deadline.toLocaleTimeString()}`}</td>
            <td>{item.isDone
                ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>

            }</td>
            <td></td>
        </tr>
    )
}