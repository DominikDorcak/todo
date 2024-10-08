import {TodoItem} from "@/types/TodoItem";
import Loader from "@/components/Loader";
import ListItem from "@/components/TodoItem/ListItem";
import React from "react";
import {useQuery} from "react-query";

export default function ListItems({name}: { name: string }) {
    const {isLoading, error, data} = useQuery({
        queryKey: "TodoItems",
        queryFn: () => {
            return [
                {
                    title: "item 1",
                    description: "create todo app",
                    isDone: false,
                    deadline: new Date("2024-10-10T00:00:00Z")
                },
                {
                    title: "item 1",
                    description: "get tired",
                    isDone: true,
                    deadline: new Date("2024-10-08T19:00:00Z")
                },
            ] as TodoItem[]
        }
    })

    return (
        <>
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Done?</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data && data.length > 0 && data.map((item: TodoItem, index: number) => <ListItem item={item}
                                                                                                  key={index}/>)}
                {!!error && <strong className={'alert-error'}>Error fetching data</strong>}
                </tbody>
            </table>
            {isLoading && <Loader/>}
        </>
    )
}