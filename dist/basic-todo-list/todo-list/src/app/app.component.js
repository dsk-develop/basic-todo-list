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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const todo_component_1 = require("./todo/todo.component");
const common_1 = require("@angular/common");
let AppComponent = class AppComponent {
    constructor(router) {
        this.router = router;
        this.title = 'todo-app';
        this.showTodoForm = false;
        this.isLoginPage = true;
    }
    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof router_1.NavigationEnd) {
                this.isLoginPage = event.url.includes('/login');
            }
        });
    }
    logout() {
        this.router.navigate(['/login']);
    }
    openTodoForm() {
        this.showTodoForm = true;
    }
    closeTodoForm() {
        this.showTodoForm = false;
    }
};
exports.AppComponent = AppComponent;
exports.AppComponent = AppComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-root',
        standalone: true,
        imports: [router_1.RouterOutlet, todo_component_1.TodoComponent, common_1.CommonModule],
        templateUrl: './app.component.html',
        styleUrl: './app.component.css'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" ? _a : Object])
], AppComponent);
//# sourceMappingURL=app.component.js.map