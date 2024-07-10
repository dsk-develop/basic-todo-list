import { RegisterUserDto } from 'DTO/registerUser.dto';
import { UserEntity } from 'entity/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private repo;
    constructor(repo: Repository<UserEntity>);
    registerUser(registerDTO: RegisterUserDto): Promise<UserEntity | RegisterUserDto>;
}
