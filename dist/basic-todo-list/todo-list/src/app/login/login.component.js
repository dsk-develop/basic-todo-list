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
exports.LoginComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const todo_component_1 = require("../todo/todo.component");
let LoginComponent = class LoginComponent {
    constructor(router) {
        this.router = router;
        this.email = '';
        this.password = '';
    }
    onLogin() {
        this.router.navigate(['/main']);
    }
};
exports.LoginComponent = LoginComponent;
exports.LoginComponent = LoginComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-login',
        standalone: true,
        imports: [todo_component_1.TodoComponent, forms_1.FormsModule, common_1.CommonModule],
        templateUrl: './login.component.html',
        styleUrl: './login.component.css'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" ? _a : Object])
], LoginComponent);
//# sourceMappingURL=login.component.js.map