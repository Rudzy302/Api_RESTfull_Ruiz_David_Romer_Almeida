// src/routes/paymentRoutes.ts
import { Router } from 'express';
import { PaymentMethodController } from '../controllers/paymentMethodController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
const paymentMethodController = new PaymentMethodController();

// CRUD básico
router.post('/api/payment-methods', authMiddleware, paymentMethodController.create);
router.get('/api/payment-methods', paymentMethodController.getAll);
router.get('/api/payment-methods/:id', paymentMethodController.getById);
router.put('/api/payment-methods/:id', authMiddleware, paymentMethodController.update);
router.delete('/api/payment-methods/:id', authMiddleware, paymentMethodController.delete);

// Endpoints específicos
router.get('/api/payments/filter', paymentMethodController.getFilteredPayments);
router.get('/api/payments/location/:locationId/method/:methodId', paymentMethodController.getPaymentsByLocationAndMethod);
router.get('/api/payments/pending/location/:locationId', paymentMethodController.getPendingPaymentsByLocation);
router.get('/api/payments/total/method/:methodId', paymentMethodController.getTotalByPaymentMethod);
router.get('/api/payments/invoice/:invoiceId', paymentMethodController.getInvoicePayments);
router.put('/api/payments/:id/status', authMiddleware, paymentMethodController.updatePaymentStatus);
router.get('/api/payment-methods/location/:locationId', paymentMethodController.getAvailableMethodsByLocation);
router.get('/api/payments/count/status', paymentMethodController.getPaymentCountByStatus);
router.get('/api/payments/total/by-method', paymentMethodController.getTotalsByPaymentMethod);

export default router;
