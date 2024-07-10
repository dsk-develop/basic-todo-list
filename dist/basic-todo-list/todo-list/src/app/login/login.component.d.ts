import { Router } from '@angular/router';
export declare class LoginComponent {
    private router;
    email: string;
    password: string;
    constructor(router: Router);
    onLogin(): void;
}
