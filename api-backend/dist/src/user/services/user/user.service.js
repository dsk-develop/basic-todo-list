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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const password_service_1 = require("../password/password.service");
const jwt_service_1 = require("../jwt/jwt.service");
let UserService = class UserService {
    constructor(usersRepository, passwordService, jwtService) {
        this.usersRepository = usersRepository;
        this.passwordService = passwordService;
        this.jwtService = jwtService;
    }
    async isUserExists(email) {
        return this.usersRepository.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });
    }
    async createUser(userDto) {
        const userPayload = {
            email: userDto.email.toLowerCase(),
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            passwordHash: await this.passwordService.generate(userDto.password),
        };
        let newUser = this.usersRepository.create(userPayload);
        newUser = await this.updateUser(newUser);
        newUser.token = this.getUserToken(newUser);
        return await this.updateUser(newUser);
    }
    async updateUser(newUser) {
        return await this.usersRepository.save(newUser);
    }
    async checkUserPassword(user, requestPassword) {
        return this.passwordService.compare(requestPassword, user.passwordHash);
    }
    getUserToken(user) {
        return this.jwtService.sign({
            id: user.id,
            email: user.email.toLowerCase(),
            firstName: user.firstName,
            lastName: user.lastName,
        });
    }
    getAll() {
        return this.usersRepository.find({
            select: ['id', 'email', 'lastName', 'firstName'],
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        password_service_1.PasswordService,
        jwt_service_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map