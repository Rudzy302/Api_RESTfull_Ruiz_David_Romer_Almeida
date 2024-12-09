// src/controllers/paymentMethodController.ts
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import PaymentMethod from '../models/paymentMethodModel';
import PaymentGateway from '../models/paymentGatewayModel';
import PaymentGatewayLocation from '../models/paymentGatewayLocationModel';
import Payment from '../models/paymentModel';
import sequelize from '../config/database';

export class PaymentMethodController {
  // CRUD básico
  async create(req: Request, res: Response): Promise<void> {
    try {
      const paymentMethod = await PaymentMethod.create(req.body);
      res.status(201).json(paymentMethod);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      console.log(req);
      const paymentMethods = await PaymentMethod.findAll();
      res.status(200).json(paymentMethods);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const paymentMethod = await PaymentMethod.findByPk(req.params.id);
      if (!paymentMethod) throw new Error('Método de pago no encontrado');
      res.status(200).json(paymentMethod);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const paymentMethod = await PaymentMethod.findByPk(req.params.id);
      if (!paymentMethod) throw new Error('Método de pago no encontrado');
      await paymentMethod.update(req.body);
      res.status(200).json(paymentMethod);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const paymentMethod = await PaymentMethod.findByPk(req.params.id);
      if (!paymentMethod) throw new Error('Método de pago no encontrado');
      await paymentMethod.destroy();
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Endpoints específicos
  async getFilteredPayments(req: Request, res: Response): Promise<void> {
    try {
      const { status, amount, date } = req.query;
      const where: any = {};

      if (status) where.status = status;
      if (amount) where.amount = amount;
      if (date) where.createdAt = { [Op.like]: `${date}%` };

      const payments = await Payment.findAll({ where });
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPaymentsByLocationAndMethod(req: Request, res: Response): Promise<void> {
    try {
      const { locationId, methodId } = req.params;
      const payments = await Payment.findAll({
        where: {
          locationId,
          paymentMethodId: methodId,
        },
      });
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPendingPaymentsByLocation(req: Request, res: Response): Promise<void> {
    try {
      const { locationId } = req.params;
      const payments = await Payment.findAll({
        where: {
          locationId,
          status: 'PENDING',
        },
      });
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTotalByPaymentMethod(req: Request, res: Response): Promise<void> {
    try {
      const { methodId } = req.params;
      const total = await Payment.sum('amount', {
        where: { paymentMethodId: methodId },
      });
      res.status(200).json({ total });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getInvoicePayments(req: Request, res: Response): Promise<void> {
    try {
      const { invoiceId } = req.params;
      const payments = await Payment.findAll({
        where: { invoiceId },
        include: [PaymentMethod],
      });
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePaymentStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const payment = await Payment.findByPk(id);
      if (!payment) throw new Error('Pago no encontrado');
      await payment.update({ status });
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAvailableMethodsByLocation(req: Request, res: Response): Promise<void> {
    try {
      const { locationId } = req.params;
      const methods = await PaymentMethod.findAll({
        include: [{
          model: PaymentGateway,
          include: [{
            model: PaymentGatewayLocation,
            where: { id: locationId },
          }],
        }],
      });
      res.status(200).json(methods);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPaymentCountByStatus(req: Request, res: Response): Promise<void> {
    try {
      console.log(req);
      const counts = await Payment.findAll({
        attributes: ['status', [sequelize.fn('count', 'status'), 'count']],
        group: ['status'],
      });
      res.status(200).json(counts);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTotalsByPaymentMethod(req: Request, res: Response): Promise<void> {
    try {
      console.log(req);
      const totals = await Payment.findAll({
        attributes: [
          'paymentMethodId',
          [sequelize.fn('sum', sequelize.col('amount')), 'total'],
        ],
        group: ['paymentMethodId'],
        include: [PaymentMethod],
      });
      res.status(200).json(totals);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
