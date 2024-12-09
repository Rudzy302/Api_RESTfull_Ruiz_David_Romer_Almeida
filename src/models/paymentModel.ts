// src/models/paymentModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Payment extends Model {
  public id!: number;

  public amount!: number;

  public status!: string;

  public invoiceId!: number;

  public paymentMethodId!: number;

  public locationId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Payment.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
    allowNull: false,
    defaultValue: 'PENDING',
  },
  invoiceId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  paymentMethodId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'paymentMethods',
      key: 'id',
    },
  },
  locationId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'paymentGatewayLocations',
      key: 'id',
    },
  },
}, {
  tableName: 'payments',
  sequelize,
  timestamps: true,
});

export default Payment;
