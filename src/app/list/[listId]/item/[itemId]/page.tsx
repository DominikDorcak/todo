import React from "react";
import ItemPageComponent from "@/app/list/[listId]/item/[itemId]/ItemPageComponent";

export function generateStaticParams() {
    return [{ listId: "1", itemId: "1" }]
}
export default function Page({params}: { params: { listId: string, itemId: string } }) {
    return <ItemPageComponent params={params}/>
}