"use client"

import {QueryClientProvider} from "react-query";
import React from "react";
import {queryClient} from "@/app/QueryClient";
import ItemForm from "@/components/TodoItem/ItemForm";

export function generateStaticParams() {
    return [{ listId: "1", itemId: "1" }]
}

export default function Page({params}: { params: { listId: string, itemId: string } }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ItemForm listId={params.listId}
                      itemId={params.itemId}/>
        </QueryClientProvider>
    )
}