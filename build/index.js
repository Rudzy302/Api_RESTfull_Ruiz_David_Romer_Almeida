"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const userModel_1 = __importDefault(require("./models/userModel"));
const roleModel_1 = __importDefault(require("./models/roleModel"));
const userRoleModel_1 = __importDefault(require("./models/userRoleModel"));
const peopleModel_1 = __importDefault(require("./models/peopleModel"));
const paymentMethodModel_1 = __importDefault(require("./models/paymentMethodModel"));
const paymentGatewayModel_1 = __importDefault(require("./models/paymentGatewayModel"));
const paymentGatewayLocationModel_1 = __importDefault(require("./models/paymentGatewayLocationModel"));
const paymentModel_1 = __importDefault(require("./models/paymentModel"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default.authenticate();
            console.log('Conexión a la base de datos establecida.');
            yield database_1.default.query('DROP TABLE IF EXISTS payments');
            yield database_1.default.query('DROP TABLE IF EXISTS paymentGatewayLocations');
            yield database_1.default.query('DROP TABLE IF EXISTS paymentGateways');
            yield database_1.default.query('DROP TABLE IF EXISTS paymentMethods');
            yield database_1.default.query('DROP TABLE IF EXISTS userRoles');
            yield database_1.default.query('DROP TABLE IF EXISTS people');
            yield database_1.default.query('DROP TABLE IF EXISTS roles');
            yield database_1.default.query('DROP TABLE IF EXISTS users');
            yield userModel_1.default.sync();
            yield roleModel_1.default.sync();
            yield userRoleModel_1.default.sync();
            yield peopleModel_1.default.sync();
            yield paymentMethodModel_1.default.sync();
            yield paymentGatewayModel_1.default.sync();
            yield paymentGatewayLocationModel_1.default.sync();
            yield paymentModel_1.default.sync();
            console.log('Modelos sincronizados correctamente.');
            app_1.default.listen(PORT, () => {
                console.log(`Servidor corriendo en el puerto ${PORT}`);
            });
        }
        catch (error) {
            console.error('Error al inicializar la base de datos:', error);
        }
    });
}
userRoleModel_1.default.belongsTo(roleModel_1.default, { foreignKey: 'idRole' });
roleModel_1.default.hasMany(userRoleModel_1.default, { foreignKey: 'idRole' });
paymentGatewayModel_1.default.belongsTo(paymentMethodModel_1.default, { foreignKey: 'idPaymentMethod' });
paymentMethodModel_1.default.hasMany(paymentGatewayModel_1.default, { foreignKey: 'idPaymentMethod' });
paymentGatewayLocationModel_1.default.belongsTo(paymentGatewayModel_1.default, { foreignKey: 'idPaymentGateway' });
paymentGatewayModel_1.default.hasMany(paymentGatewayLocationModel_1.default, { foreignKey: 'idPaymentGateway' });
paymentModel_1.default.belongsTo(paymentMethodModel_1.default, { foreignKey: 'paymentMethodId' });
paymentModel_1.default.belongsTo(paymentGatewayLocationModel_1.default, { foreignKey: 'locationId' });
initializeDatabase();
//# sourceMappingURL=index.js.map