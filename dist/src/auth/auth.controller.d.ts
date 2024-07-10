import { AuthService } from "./auth.service";
import { RegisterUserDto } from "DTO/registerUser.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registration(regDTO: RegisterUserDto): Promise<import("../../entity/user.entity").UserEntity | RegisterUserDto>;
}
