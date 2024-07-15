"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewTable1720697450903 = void 0;
class AddNewTable1720697450903 {
    constructor() {
        this.name = 'AddNewTable1720697450903';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.AddNewTable1720697450903 = AddNewTable1720697450903;
//# sourceMappingURL=1720697450903-AddNewTable.js.map