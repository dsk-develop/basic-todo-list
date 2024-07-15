import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { PasswordService } from '../password/password.service';
import { JwtService } from '../jwt/jwt.service';
export declare class UserService {
    private usersRepository;
    private readonly passwordService;
    private readonly jwtService;
    constructor(usersRepository: Repository<UserEntity>, passwordService: PasswordService, jwtService: JwtService);
    isUserExists(email: string): Promise<UserEntity | null>;
    createUser(userDto: CreateUserDto): Promise<UserEntity>;
    updateUser(newUser: UserEntity): Promise<UserEntity>;
    checkUserPassword(user: UserEntity, requestPassword: string): Promise<boolean>;
    getUserToken(user: UserEntity): string;
    getAll(): Promise<UserEntity[]>;
}
