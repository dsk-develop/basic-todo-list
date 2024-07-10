export declare class TodoEntity {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
    date: any;
}
export declare enum TodoStatus {
    OPEN = "OPEN",
    WIP = "WIP",
    COMPLETED = "COMPLETED"
}
