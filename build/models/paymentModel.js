"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Payment extends sequelize_1.Model {
}
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
        allowNull: false,
        defaultValue: 'PENDING',
    },
    invoiceId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    paymentMethodId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'paymentMethods',
            key: 'id',
        },
    },
    locationId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'paymentGatewayLocations',
            key: 'id',
        },
    },
}, {
    tableName: 'payments',
    sequelize: database_1.default,
    timestamps: true,
});
exports.default = Payment;
//# sourceMappingURL=paymentModel.js.map