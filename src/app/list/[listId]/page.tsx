"use client"

import {QueryClientProvider} from "react-query";
import React from "react";
import ListItems from "@/components/TodoItem/ListItems";
import {queryClient} from "@/app/QueryClient";

export function generateStaticParams() {
    return [{ listId: "1" }]
}

export default function Page({params}: { params: { listId: string } }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ListItems listId={params.listId} />
        </QueryClientProvider>
    )
}