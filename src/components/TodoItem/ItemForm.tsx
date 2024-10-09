import {useMutation, useQuery} from "react-query";
import {TodoItem} from "@/types/TodoItem";
import {useForm, SubmitHandler} from "react-hook-form"
import Loader from "@/components/Loader";
import {formatDatetimeLocalDate} from "@/app/utils";
import React from "react";
import API from "@/app/API";
import {queryClient} from "@/app/QueryClient";

type ItemFormProps = {
    listId: string;
    itemId: string;
}
export default function ItemForm( { listId, itemId }: ItemFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<TodoItem>()
    const onSubmit: SubmitHandler<TodoItem> = (data) => mutation.mutate(data)

    const itemQuery = useQuery({
        queryKey: "TodoItem",
        queryFn: () => itemId ==="create" ? {} : API.getItemById(itemId)
    })

    const listQuery =  useQuery({
        queryKey: "TodoList",
        queryFn: () =>  API.getListById(listId)
    })

    const mutation = useMutation({
        mutationFn: API.saveItem,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['TodoItem'] })
        },
    })

    return (
        <>
            <h1 className="h-1 text-3xl m-20">
                {`${itemId === "create" ? "New TODO item" : `TODO item: ${itemQuery.data?.title}` } (${listQuery.data?.name})`}
            </h1>
            {itemQuery.isLoading && <Loader/>}
            {!itemQuery.isLoading &&
                <form className="flex flex-col items-start" onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Title</span>
                        </div>
                        <input className="input input-bordered w-full max-w-xs " type="text" defaultValue={itemQuery.data?.title}
                               placeholder="title"  {...register("title")} />
                    </label>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24 w-full max-w-xs"
                                  defaultValue={itemQuery.data?.description}
                                  placeholder="description" {...register("description")} />
                    </label>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Due date</span>
                        </div>
                        <input className="input input-bordered w-full max-w-xs " type="datetime-local"
                               defaultValue={itemQuery.data ? formatDatetimeLocalDate(itemQuery.data?.deadline) : undefined}
                               {...register("deadline")}
                        />
                    </label>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Done?</span>
                        </div>
                        <input className="toggle" type="checkbox"
                               defaultValue={itemQuery.data?.isDone ? "checked" : undefined} {...register("isDone")} />
                    </label>

                    <input className="hidden" type="text"  {...register("listId", {value: listQuery.data?.id})}/>

                    <button className="btn mt-4" type="submit">Save</button>
                </form>
            }
        </>
    )
}