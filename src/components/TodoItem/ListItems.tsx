import {TodoItem} from "@/types/TodoItem";
import Loader from "@/components/Loader";
import ListItem from "@/components/TodoItem/ListItem";
import React, {useEffect} from "react";
import {useQuery} from "react-query";
import API from "@/app/API";
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {queryClient} from "@/app/QueryClient";

export default function ListItems({listId}: { listId: string }) {

    useEffect(() => {
        queryClient.removeQueries({ queryKey: ['TodoItem'], exact: true })
    })

    const itemsQuery = useQuery({
        queryKey: "TodoItems",
        queryFn: () => API.getItems(listId),
        retry: false,
    })

    const listQuery = useQuery({
        queryKey: "TodoList",
        queryFn: () => API.getListById(listId)
    })

    const router = useRouter()

    return (
        <>
            <h1 className="h-1 text-3xl mb-10 w-full text-center">
                TODO list: {listQuery.data?.name}
            </h1>

            {<table className="table mb-10 w-full">
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
                        {!itemsQuery.isLoading && <td colSpan={5} className="w-full text-center">No items yet...</td>}
                    </tr>
                }
                </tbody>
            </table>}
            {itemsQuery.isLoading && <Loader/>}
            <div className="flex flex-row justify-between w-full">
                <button className="btn btn-secondary" onClick={router.back}>Back</button>
                <Link href={`/list/${listId}/item/create`}>
                    <button className="btn btn-primary">Add item</button>
                </Link>
            </div>
        </>
    )
}