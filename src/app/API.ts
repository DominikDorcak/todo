import {TodoItem} from "@/types/TodoItem";
import {TodoList} from "@/types/TodoList";

class API {
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
        const response = await fetch(`${this.baseUrl}/add`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(list)
        })
        return response.json()
    }

    public getItems = async (listId: string): Promise<TodoItem[]> => {
        const response = await fetch(`${this.baseUrl}/items?listId=${listId}`, {})
        const data: object[] = await response.json()
        return data.map(item => {
            item.deadline = new Date(item.deadline * 1000)
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
        if(item.id){
            return await this.updateItem(item)
        } else {
            return await this.addItem(item)
        }
    }

    public deleteItem = async (id: string) => {
        const response = await fetch(`${this.baseUrl}/items/${id}`, {
            method: 'DELETE',
        })
        return response.json()
    }

}

export default new API();