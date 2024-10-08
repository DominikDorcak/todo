"use client"

import {QueryClient, QueryClientProvider} from "react-query";
import React from "react";
import ListItems from "@/components/TodoItem/ListItems";

const queryClient = new QueryClient();

export default function Page({params}: { params: { name: string } }) {
    return (
        <QueryClientProvider client={queryClient}>
            <h1 className={"h-1 text-3xl m-20"}>
                TODO list: {decodeURI(params.name)}
            </h1>

            <ListItems name={decodeURI(params.name)} />

        </QueryClientProvider>
    )
}