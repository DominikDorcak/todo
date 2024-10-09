"use client"

import Todos from "@/components/Todos";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/app/QueryClient";
import React from "react";


export default function Page() {
    const showAddListModal = () => {
        const modal = document.getElementById('add_list_modal') as HTMLDialogElement
        modal.showModal()
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Todos/>

            <button className="btn m-5" onClick={showAddListModal}>Add TODO List</button>

            <dialog id="add_list_modal" className="modal">
                <div className="modal-box">
                    <p className="py-4">Choose name of new TODO List</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </QueryClientProvider>
    );
}
