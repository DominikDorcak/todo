import {TodoItem} from "@/types/TodoItem";
import {TodoList} from "@/types/TodoList";

class APIController {
    private readonly baseUrl: string | undefined;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    }

    public getLists = async (): Promise<TodoList[]> => {
        const response = await fetch(`${this.baseUrl}/lists`, {})
        return response.json()
    }

    public getListById = async (id: string): Promise<TodoList> =>{
        const response = await fetch(`${this.baseUrl}/lists/${id}`, {})
        return response.json()
    }

    public addList = async (list: TodoList) => {
        const response = await fetch(`${this.baseUrl}/lists`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(list)
        })
        return response.json()
    }

    public getItems = async (listId: string, isDone?: boolean): Promise<TodoItem[]> => {
        const url = new URL(`${this.baseUrl}/lists/${listId}/items`)

        if (typeof isDone !== "undefined") {
            url.searchParams.set("isDone", isDone ? 'true' : 'false')
        }

        const response = await fetch(url, {})
        if (!response.ok) {
            return []
        }
        const data: TodoItem[] = await response.json()
        return data.map(item => {
            item.deadline = new Date(item.deadline as number * 1000)
            return item as TodoItem
        })

    }

    public getItemById = async (id: string): Promise<TodoItem> => {
        const response = await fetch(`${this.baseUrl}/items/${id}`, {})
        const data = await response.json()
        data.deadline = new Date(data.deadline * 1000)
        return data
    }

    private updateItem = async (item: TodoItem)=> {
        const response = await fetch(`${this.baseUrl}/items/${item.id}`, {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(item)
        })
        return response.json()
    }

    private addItem = async (item: TodoItem) => {
        const response = await fetch(`${this.baseUrl}/items`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(item)
        })
        return response.json()
    }

    public saveItem = async (item: TodoItem)=> {
        const itemToSave = {...item}
        itemToSave.deadline = new Date(item.deadline).getTime() / 1000
        if(item.id){
            return await this.updateItem(itemToSave)
        } else {
            return await this.addItem(itemToSave)
        }
    }

    public flipDone = async (item: TodoItem) => {
        item.isDone = !item.isDone
        return await this.saveItem(item)
    }

    public deleteItem = async (item: TodoItem) => {
        const response = await fetch(`${this.baseUrl}/lists/${item.listId}/items/${item.id}`, {
            method: 'DELETE',
        })
        return response.json()
    }

}

const API = new APIController()
export default API;