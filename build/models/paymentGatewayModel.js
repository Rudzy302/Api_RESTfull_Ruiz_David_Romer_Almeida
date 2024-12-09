"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class PaymentGateway extends sequelize_1.Model {
}
PaymentGateway.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    idPaymentMethod: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'paymentMethods',
            key: 'id',
        },
    },
    gateway: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
}, {
    tableName: 'paymentGateways',
    sequelize: database_1.default,
    timestamps: true,
});
exports.default = PaymentGateway;
//# sourceMappingURL=paymentGatewayModel.js.map