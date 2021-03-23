"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUsers1616285341781 = void 0;

var _typeorm = require("typeorm");

class createUsers1616285341781 {
  constructor() {
    this.tableName = 'users';
  }

  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: this.tableName,
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable(this.tableName);
  }

}

exports.createUsers1616285341781 = createUsers1616285341781;