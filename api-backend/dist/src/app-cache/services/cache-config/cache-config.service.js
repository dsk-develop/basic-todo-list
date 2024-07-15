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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
let CacheConfigService = class CacheConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    createCacheOptions() {
        const { host, port, password } = this.configService.get('cache');
        return {
            store: async () => {
                return await (0, cache_manager_redis_store_1.redisStore)({
                    socket: {
                        host,
                        port,
                    },
                    password: password !== null && password !== void 0 ? password : null,
                    ttl: 60 * 60,
                });
            },
        };
    }
};
CacheConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CacheConfigService);
exports.CacheConfigService = CacheConfigService;
//# sourceMappingURL=cache-config.service.js.map