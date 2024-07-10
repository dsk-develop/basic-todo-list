"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_entity_1 = require("../../entity/todo.entity");
const typeorm_2 = require("typeorm");
const todo_entity_2 = require("../../entity/todo.entity");
let TodoService = class TodoService {
    updateTodo(id, status) {
        throw new Error('Method not implemented.');
    }
    constructor(repo) {
        this.repo = repo;
    }
    async getAllTodos() {
        return await this.repo.find();
    }
    async createTodo(createTodoDto) {
        const { title, description } = createTodoDto;
        const newTodo = new todo_entity_2.TodoEntity();
        newTodo.title = title;
        newTodo.description = description;
        newTodo.status = todo_entity_1.TodoStatus.OPEN;
        await this.repo.save(newTodo);
        return newTodo;
    }
    async todoUpdate(id, status) {
        const todo = await this.repo.findOneBy({ id });
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with id ${id} not found`);
        }
        todo.status = status;
        await this.repo.save(todo);
        return todo;
    }
    async todoDelete(id) {
        try {
            return await this.repo.delete({ id });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_2.TodoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoService);
//# sourceMappingURL=todo.service.js.map