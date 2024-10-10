import {TodoItem} from "@/types/TodoItem";
import Loader from "@/components/Loader";
import ListItem from "@/components/TodoItem/ListItem";
import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
import API from "@/app/API";
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {queryClient} from "@/app/QueryClient";

enum Filter {"ALL", "DONE", "NOT_DONE"}

export default function ListItems({listId}: { listId: string }) {
    const allItemsQuery = () => {
        return {
            queryKey: "TodoItems/all",
            queryFn: () => API.getItems(listId),
        }
    }

    const doneItemsQuery = () => {
        return {
            queryKey: "TodoItems/done",
            queryFn: () => API.getItems(listId, true),
        }
    }

    const notDoneItemsQuery = () => {
        return {
            queryKey: "TodoItems/notDone",
            queryFn: () => API.getItems(listId, false),
        }
    }

    const listQuery = useQuery({
        queryKey: "TodoList",
        queryFn: () => API.getListById(listId)
    })

    const [items, setItems] = useState([] as TodoItem[])
    const [isLoading, setIsLoading] = useState(false)

    const allItemsButton = React.useRef<HTMLButtonElement>(null);

    const loadItems = async (filter: Filter) => {
        let itemsQuery
        setItems(() => [])
        setIsLoading(true)

        switch (filter) {
            case Filter.DONE:
                itemsQuery =  doneItemsQuery()
                break
            case Filter.NOT_DONE:
                itemsQuery = notDoneItemsQuery()
                break
            default:
                itemsQuery =  allItemsQuery()
                break
        }

        const itemsResponse = await queryClient.fetchQuery({...itemsQuery})

        setItems(() => itemsResponse)
        setIsLoading(false)
    }

    useEffect(() => {
        queryClient.removeQueries({queryKey: ['TodoItem'], exact: true})
        queryClient.invalidateQueries({queryKey: ['TodoItems/']})
        allItemsButton.current?.click()
    },[])

    const router = useRouter()

    return (
        <>
            <h1 className="h-1 text-3xl mb-10 w-full text-center">
                TODO list: {listQuery.data?.name}
            </h1>

            <div className="flex flex-row gap-8 items-center justify-center w-full">
                <button ref={allItemsButton} className="btn" onClick={() => loadItems(Filter.ALL)}>All</button>
                <button className="btn" onClick={() => loadItems(Filter.DONE)}>Done</button>
                <button className="btn" onClick={() => loadItems(Filter.NOT_DONE)}>Not done</button>
            </div>

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
                {(items && items.length > 0)
                    ?
                    items.map((item: TodoItem, index: number) =>
                        <ListItem listId={listId}
                                  item={item}
                                  key={index}/>)
                    :
                    <tr>
                        {!isLoading && <td colSpan={5} className="w-full text-center">No items yet...</td>}
                    </tr>
                }
                </tbody>
            </table>}
            {isLoading && <Loader/>}
            <div className="flex flex-row justify-between w-full">
                <button className="btn btn-secondary" onClick={router.back}>Back</button>
                <Link href={`/list/${listId}/item/create`}>
                    <button className="btn btn-primary">Add item</button>
                </Link>
            </div>
        </>
    )
}