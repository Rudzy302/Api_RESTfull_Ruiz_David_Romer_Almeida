"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class PaymentGatewayLocation extends sequelize_1.Model {
}
PaymentGatewayLocation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    idPaymentGateway: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'paymentGateways',
            key: 'id',
        },
    },
}, {
    tableName: 'paymentGatewayLocations',
    sequelize: database_1.default,
    timestamps: true,
});
exports.default = PaymentGatewayLocation;
//# sourceMappingURL=paymentGatewayLocationModel.js.map