import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/database';
import User from './models/userModel';
import Role from './models/roleModel';
import UserRole from './models/userRoleModel';
import People from './models/peopleModel';
import PaymentMethod from './models/paymentMethodModel';
import PaymentGateway from './models/paymentGatewayModel';
import PaymentGatewayLocation from './models/paymentGatewayLocationModel';
import Payment from './models/paymentModel';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Eliminar tablas existentes en orden inverso
    await sequelize.query('DROP TABLE IF EXISTS payments');
    await sequelize.query('DROP TABLE IF EXISTS paymentGatewayLocations');
    await sequelize.query('DROP TABLE IF EXISTS paymentGateways');
    await sequelize.query('DROP TABLE IF EXISTS paymentMethods');
    await sequelize.query('DROP TABLE IF EXISTS userRoles');
    await sequelize.query('DROP TABLE IF EXISTS people');
    await sequelize.query('DROP TABLE IF EXISTS roles');
    await sequelize.query('DROP TABLE IF EXISTS users');

    // Crear tablas en orden correcto
    await User.sync();
    await Role.sync();
    await UserRole.sync();
    await People.sync();
    await PaymentMethod.sync();
    await PaymentGateway.sync();
    await PaymentGatewayLocation.sync();
    await Payment.sync();

    console.log('Modelos sincronizados correctamente.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

// Definir relaciones
UserRole.belongsTo(Role, { foreignKey: 'idRole' });
Role.hasMany(UserRole, { foreignKey: 'idRole' });

PaymentGateway.belongsTo(PaymentMethod, { foreignKey: 'idPaymentMethod' });
PaymentMethod.hasMany(PaymentGateway, { foreignKey: 'idPaymentMethod' });

PaymentGatewayLocation.belongsTo(PaymentGateway, { foreignKey: 'idPaymentGateway' });
PaymentGateway.hasMany(PaymentGatewayLocation, { foreignKey: 'idPaymentGateway' });

Payment.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });
Payment.belongsTo(PaymentGatewayLocation, { foreignKey: 'locationId' });

initializeDatabase();
