import { TodoService } from './todo.service';
import { TodoEntity, TodoStatus } from 'entity/todo.entity';
import { Response } from 'express';
export declare class TodoController {
    private todoService;
    constructor(todoService: TodoService);
    getAlltodos(): Promise<TodoEntity[]>;
    creatNewToDo(data: any, res: Response): Promise<void>;
    update(id: number, status: TodoStatus, res: Response): Promise<void>;
    deleteTodo(id: number): Promise<import("typeorm").DeleteResult>;
}
