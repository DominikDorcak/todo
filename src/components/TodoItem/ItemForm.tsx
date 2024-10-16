import {useMutation, useQuery} from "react-query";
import {TodoItem} from "@/types/TodoItem";
import {useForm, SubmitHandler} from "react-hook-form"
import Loader from "@/components/Loader";
import {currentDateNoSeconds, formatDatetimeLocalDate} from "@/app/utils";
import API from "@/app/API";
import {queryClient} from "@/app/QueryClient";
import {useRouter} from 'next/navigation';
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import React from "react";


type ItemFormProps = {
    listId: string;
    itemId: string;
}

const emptyItem: TodoItem = {
    deadline: currentDateNoSeconds(),
    description: "",
    isDone: false,
    listId: "",
    title: ""
}

const itemSchema = yup
    .object({
        deadline: yup.date().required(),
        description: yup.string().min(5).required(),
        isDone: yup.boolean().required(),
        listId: yup.string().required(),
        title: yup.string().min(3).required(),
        id: yup.string(),
    })
    .required()


export default function ItemForm({listId, itemId}: ItemFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(itemSchema)
    })
    const onSubmit: SubmitHandler<TodoItem> = (data) => mutation.mutate(data)

    const itemQuery = useQuery({
        queryKey: "TodoItem",
        queryFn: () => itemId === "create" ? emptyItem : API.getItemById(itemId)
    })

    const listQuery = useQuery({
        queryKey: "TodoList",
        queryFn: () => API.getListById(listId)
    })

    const showSuccessAlert = () => {
        setSuccessAlertVisible(true)
        setTimeout(() => setSuccessAlertVisible(false), 3000)
    }

    const showErrorAlert = () => {
        setErrorAlertVisible(true)
        setTimeout(() => setErrorAlertVisible(false), 3000)
    }

    const mutation = useMutation({
        mutationFn: API.saveItem,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['TodoItems'], exact: true})
            showSuccessAlert()
        },
        onError: () => {
            showErrorAlert()
        }
    })

    const router = useRouter()

    const [successAlertVisible, setSuccessAlertVisible] = React.useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = React.useState(false);


    return (
        <>
            <h1 className="h-1 text-3xl mb-10 w-full text-center">
                {`${itemId === "create" ? "New TODO item" : `TODO item: ${itemQuery.data?.title}`} (${listQuery.data?.name})`}
            </h1>
            <div className="flex flex-col items-center justify-center w-full">
                {itemQuery.isLoading && <Loader/>}
                {!itemQuery.isLoading &&
                    <form className="flex flex-col items-start w-2/3 " onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Title</span>
                            </div>
                            <input className={"input input-bordered w-full " + (errors.title ? "input-error" : "")}
                                   type="text"
                                   defaultValue={itemQuery.data?.title}
                                   placeholder="title"  {...register("title")} />

                            <div className="label min-h-8">
                                <span className="label-text-alt text-red-400">{errors.title?.message}</span>
                            </div>
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea
                                className={"textarea textarea-bordered h-24 w-full " + (errors.description ? "textarea-error" : "")}
                                defaultValue={itemQuery.data?.description}
                                placeholder="description" {...register("description")} />
                            <div className="label min-h-8">
                                <span className="label-text-alt text-red-400">{errors.description?.message}</span>
                            </div>
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Due date</span>
                            </div>
                            <input className={"input input-bordered w-full " + (errors.deadline ? "input-error" : "")}
                                   type="datetime-local"
                                   defaultValue={itemQuery.data ? formatDatetimeLocalDate(itemQuery.data?.deadline) : undefined}
                                   {...register("deadline")}
                            />
                            <div className="label min-h-8">
                                <span className="label-text-alt text-red-400">{errors.deadline?.message}</span>
                            </div>
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Done?</span>
                            </div>
                            <input className="toggle" type="checkbox"
                                   defaultChecked={itemQuery.data?.isDone} {...register("isDone")}
                            />
                            <div className="label min-h-8">
                                <span className="label-text-alt text-red-400">{errors.isDone?.message}</span>
                            </div>
                        </label>

                        <input className="hidden" type="text"  {...register("listId", {value: listQuery.data?.id})}/>
                        <input className="hidden" type="text"  {...register("id", {value: itemQuery.data?.id})}/>

                        <div className="flex flex-row justify-between w-full">
                            <button className="btn mt-4 btn-secondary"
                                    onClick={
                                        (event) => {
                                            event.preventDefault()
                                            router.back()
                                        }
                                    }
                            >
                                <span>Back</span>
                            </button>
                            <button className="btn mt-4 btn-primary" type="submit">Save</button>
                        </div>

                        {successAlertVisible &&
                            <div role="alert" className="alert alert-success mt-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Item saved!</span>
                            </div>
                        }

                        {errorAlertVisible &&
                            <div role="alert" className="alert alert-error mt-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Something went wrong!</span>
                            </div>
                        }
                    </form>
                }
            </div>
        </>
    )
}