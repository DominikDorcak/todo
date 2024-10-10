import {TodoList} from "@/types/TodoList";
import React, {useEffect} from "react";
import Card from "@/components/TodoList/Card";
import {useQuery} from "react-query";
import Loader from "@/components/Loader";
import API from "@/app/API";
import {queryClient} from "@/app/QueryClient";

export default function Todos(): React.JSX.Element {

    useEffect(() => {
        queryClient.removeQueries({ queryKey: ['TodoItems'], exact: true })
    })
    
    const {isLoading, error, data} = useQuery({
        queryKey: ['TodoLists'],
        queryFn: () => API.getLists()
    })

    return (
        <div className="flex flex-col content-center gap-20 items-center m-5">
            <h1 className="h-1 font-bold m-5 text-3xl text-center">TODO Lists</h1>
            <div className="flex align-middle justify-center flex-row flex-wrap gap-5">
                {isLoading && <Loader/>}
                {!isLoading && data && data.map((list: TodoList, index: number) => <Card list={list} key={index}/>)}
                {!!error && <strong className='alert-error'>Error fetching data</strong>}
            </div>
        </div>
    )
}