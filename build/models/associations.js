"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAssociations = void 0;
const paymentGatewayLocationModel_1 = __importDefault(require("./paymentGatewayLocationModel"));
const paymentGatewayModel_1 = __importDefault(require("./paymentGatewayModel"));
const defineAssociations = () => {
    paymentGatewayModel_1.default.hasMany(paymentGatewayLocationModel_1.default, {
        foreignKey: 'idPaymentGateway',
        onDelete: 'CASCADE',
    });
    paymentGatewayLocationModel_1.default.belongsTo(paymentGatewayModel_1.default, {
        foreignKey: 'idPaymentGateway',
        onDelete: 'CASCADE',
    });
};
exports.defineAssociations = defineAssociations;
//# sourceMappingURL=associations.js.map