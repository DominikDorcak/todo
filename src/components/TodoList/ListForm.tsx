import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {TodoList} from "@/types/TodoList";
import {useMutation} from "react-query";
import API from "@/app/API";
import {queryClient} from "@/app/QueryClient";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"

const listSchema = yup
    .object({
        name: yup.string().min(3).required(),
    })
export default function ListForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(listSchema)
    })

    const onSubmit: SubmitHandler<TodoList> = (data) => {
        mutation.mutate(data)
        hideAddListModal()
    }

    const mutation = useMutation({
        mutationFn: API.addList,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['TodoLists']})
        },
    })

    const showAddListModal = () => {
        const modal = document.getElementById('add_list_modal') as HTMLDialogElement
        modal.showModal()
    }

    const hideAddListModal = () => {
        const form = document.getElementById('add_list_form') as HTMLFormElement
        form.reset()
        const modal = document.getElementById('add_list_modal') as HTMLDialogElement
        modal.close()
    }

    return (
        <>
            <div className="flex flex-row justify-center w-full">
                <button className="btn btn-primary m-4" onClick={showAddListModal}>Add TODO List</button>
            </div>

            <dialog id="add_list_modal" className="modal">
                <div className="modal-box">
                    <div className="flex flex-col items-stretch">
                        <p className="py-4 w-full text-center">Choose name of new TODO List:</p>

                        <form id="add_list_form" onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap w-full">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Title</span>
                                </div>
                                <input className={"input input-bordered w-full " + (errors.name ? "input-error" : "")}
                                       type="text"
                                       placeholder="name"  {...register("name")} />

                                <div className="label min-h-8">
                                    <span className="label-text-alt text-red-400">{errors.name?.message}</span>
                                </div>
                            </label>

                            <div className="flex flex-row justify-between w-full mt-4">
                                <button className="btn btn-primary" type="submit">Add List</button>
                                <button className="btn btn-secondary"
                                        onClick={
                                            (event) => {
                                                event.preventDefault()
                                                hideAddListModal()
                                            }
                                        }
                                >
                                    <span>Close</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}