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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const todo_entity_1 = require("../../../../entity/todo.entity");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    getAlltodos() {
        return this.todoService.getAllTodos();
    }
    async creatNewToDo(data, res) {
        const { title, description } = data;
        console.log(data);
        try {
            const createdTodo = await this.todoService.createTodo(data);
            res.status(common_1.HttpStatus.CREATED).json({
                todo: createdTodo,
                message: 'Todo created successfully',
            });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to create todo',
                error: error.message,
            });
        }
    }
    async update(id, status, res) {
        try {
            const todoUpdate = await this.todoService.todoUpdate(id, status);
            res.status(common_1.HttpStatus.OK).json({
                todo: todoUpdate,
                message: 'Todo updated successfully',
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                res.status(common_1.HttpStatus.NOT_FOUND).json({
                    message: error.message,
                    error: 'Not Found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                });
            }
            else {
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Failed to update todo',
                    error: error.message,
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                });
            }
        }
    }
    deleteTodo(id) {
        return this.todoService.todoDelete(id);
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "getAlltodos", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "creatNewToDo", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "deleteTodo", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map