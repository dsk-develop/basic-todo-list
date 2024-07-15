"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewTable1720697822530 = void 0;
class AddNewTable1720697822530 {
    constructor() {
        this.name = 'AddNewTable1720697822530';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "token" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "token" SET NOT NULL`);
    }
}
exports.AddNewTable1720697822530 = AddNewTable1720697822530;
//# sourceMappingURL=1720697822530-AddNewTable.js.map