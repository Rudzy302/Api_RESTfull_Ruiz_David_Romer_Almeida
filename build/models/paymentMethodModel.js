"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class PaymentMethod extends sequelize_1.Model {
}
PaymentMethod.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    methodName: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
}, {
    tableName: 'paymentMethods',
    sequelize: database_1.default,
    timestamps: true,
});
exports.default = PaymentMethod;
//# sourceMappingURL=paymentMethodModel.js.map