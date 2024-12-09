import PaymentGatewayLocation from './paymentGatewayLocationModel';
import PaymentGateway from './paymentGatewayModel';

// src/models/associations.ts
export const defineAssociations = () => {
  // Asumiendo que PaymentGateway y PaymentGatewayLocation ya están importados
  PaymentGateway.hasMany(PaymentGatewayLocation, {
    foreignKey: 'idPaymentGateway',
    onDelete: 'CASCADE',
  });

  PaymentGatewayLocation.belongsTo(PaymentGateway, {
    foreignKey: 'idPaymentGateway',
    onDelete: 'CASCADE',
  });
};
