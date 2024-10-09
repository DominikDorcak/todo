export type TodoItem = {
    id?: string
    title: string
    description: string
    deadline: number | Date
    isDone: boolean
    listId: string
}