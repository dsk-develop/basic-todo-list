import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './services/auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from './services/user/user.service';
export declare class UserController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(user: CreateUserDto): Promise<{
        message: string;
        user: {
            id: number;
            token: string;
        };
    }>;
    login(login: LoginDto): Promise<{
        message: string;
        token: string | void;
    }>;
    getUsers(): Promise<{
        message: string;
        users: import("./entities/user.entity").UserEntity[];
    }>;
}
