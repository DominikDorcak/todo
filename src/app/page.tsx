"use client"

import Todos from "@/components/Todos";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/app/QueryClient";
import React from "react";
import ListForm from "@/components/TodoList/ListForm";


export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <Todos/>
            <ListForm/>
        </QueryClientProvider>
    );
}
