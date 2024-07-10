import { CreateTodoDto } from 'DTO/create.todo.dto';
import { TodoStatus } from 'entity/todo.entity';
import { DeleteResult, Repository } from 'typeorm';
import { TodoEntity } from 'entity/todo.entity';
export declare class TodoService {
    private readonly repo;
    updateTodo(id: number, status: TodoStatus): TodoEntity | PromiseLike<TodoEntity>;
    constructor(repo: Repository<TodoEntity>);
    getAllTodos(): Promise<TodoEntity[]>;
    createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
    todoUpdate(id: number, status: TodoStatus): Promise<TodoEntity>;
    todoDelete(id: number): Promise<DeleteResult>;
}
