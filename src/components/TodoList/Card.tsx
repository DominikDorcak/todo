import {TodoList} from "@/types/TodoList";
import React from "react";
import Link from "next/link";

type TodoListProps = {
    list: TodoList
}
export default function Card({ list }: TodoListProps): React.JSX.Element {
    const getListUrl = (list: TodoList) => {
        return "/list/" + list.name;
    }
    return (
        <Link href={getListUrl(list)}>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{list.name}</h2>
                </div>
            </div>
        </Link>
    )
}