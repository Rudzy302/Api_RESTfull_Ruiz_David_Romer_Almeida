// src/models/paymentMethodModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class PaymentMethod extends Model {
  public id!: number;

  public methodName!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

PaymentMethod.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  methodName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'paymentMethods',
  sequelize,
  timestamps: true,
});

export default PaymentMethod;
