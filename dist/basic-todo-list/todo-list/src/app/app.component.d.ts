import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
export declare class AppComponent implements OnInit {
    router: Router;
    title: string;
    showTodoForm: boolean;
    isLoginPage: boolean;
    constructor(router: Router);
    ngOnInit(): void;
    logout(): void;
    openTodoForm(): void;
    closeTodoForm(): void;
}
