import React from "react";
import ItemPageComponent from "@/app/list/[listId]/item/[itemId]/ItemPageComponent";

export function generateStaticParams() {
    const perms = []
    for (let i = 1; i <= 100; i++) {
        perms.push({listId: `${i}`, itemId: "create"})
        for (let j = 1; j <= 100; j++) {
            perms.push({listId: `${i}`, itemId: `${j}`})
        }

    }
    return perms
}

export default function Page({params}: { params: { listId: string, itemId: string } }) {
    return <ItemPageComponent params={params}/>
}