// src/models/paymentGatewayModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class PaymentGateway extends Model {
  public id!: number;

  public idPaymentMethod!: number;

  public gateway!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

PaymentGateway.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  idPaymentMethod: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'paymentMethods',
      key: 'id',
    },
  },
  gateway: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'paymentGateways',
  sequelize,
  timestamps: true,
});

export default PaymentGateway;
