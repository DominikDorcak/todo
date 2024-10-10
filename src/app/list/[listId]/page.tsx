import React from "react";
import ListPageComponent from "@/app/list/[listId]/ListPageComponent";

export function generateStaticParams() {
    const perms = []
    for (let i = 1; i <= 100; i++) {
        perms.push({listId: `${i}`})
    }
    return perms
}

export default function Page({params}: { params: { listId: string } }) {
    return <ListPageComponent params={params}/>
}