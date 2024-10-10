import React from "react";
import ListPageComponent from "@/app/list/[listId]/ListPageComponent";

export function generateStaticParams() {
    return [{ listId: "1"}]
}
export default function Page({params}: { params: { listId: string } }) {
    return <ListPageComponent params={params}/>
}