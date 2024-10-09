import {TodoItem} from "@/types/TodoItem";
import Loader from "@/components/Loader";
import ListItem from "@/components/TodoItem/ListItem";
import React from "react";
import {useQuery} from "react-query";
import API from "@/app/API";
import Link from "next/link";

export default function ListItems({listId}: { listId: string }) {

    const itemsQuery = useQuery({
        queryKey: "TodoItems",
        queryFn: () =>  API.getItems(listId)
    })

    const listQuery =  useQuery({
        queryKey: "TodoList",
        queryFn: () =>  API.getListById(listId)
    })

    return (
        <>
            <h1 className="h-1 text-3xl m-20">
                TODO list: {listQuery.data?.name}
            </h1>

            {<table className="table">
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
                {(itemsQuery.data && itemsQuery.data.length > 0)
                    ?
                    itemsQuery.data.map((item: TodoItem, index: number) =>
                    <ListItem listId={listId}
                              item={item}
                              key={index}/>)
                    :
                    <tr>
                        <td colSpan={5} className="w-full text-center">No items yet...</td>
                    </tr>
                }
                {!!itemsQuery.error && <strong className='alert-error'>Error fetching data</strong>}
                </tbody>
            </table>}
            {itemsQuery.isLoading && <Loader/>}
            <Link href={`/list/${listId}/item/create`}>
                <button className="btn btn-primary">Add item</button>
            </Link>
        </>
    )
}