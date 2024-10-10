"use client"

import {QueryClientProvider} from "react-query";
import React from "react";
import {queryClient} from "@/app/QueryClient";
import ItemForm from "@/components/TodoItem/ItemForm";

export default function ItemPageComponent({params}: { params: { listId: string, itemId: string } }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ItemForm listId={params.listId}
                      itemId={params.itemId}/>
        </QueryClientProvider>
    )
}