// src/models/paymentGatewayLocationModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class PaymentGatewayLocation extends Model {
  public id!: number;

  public location!: string;

  public idPaymentGateway!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

PaymentGatewayLocation.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  location: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  idPaymentGateway: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'paymentGateways',
      key: 'id',
    },
  },
}, {
  tableName: 'paymentGatewayLocations',
  sequelize,
  timestamps: true,
});

export default PaymentGatewayLocation;
