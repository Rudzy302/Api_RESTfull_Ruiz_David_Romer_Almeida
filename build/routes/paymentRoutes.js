"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentMethodController_1 = require("../controllers/paymentMethodController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
const paymentMethodController = new paymentMethodController_1.PaymentMethodController();
router.post('/api/payment-methods', authMiddleware_1.default, paymentMethodController.create);
router.get('/api/payment-methods', paymentMethodController.getAll);
router.get('/api/payment-methods/:id', paymentMethodController.getById);
router.put('/api/payment-methods/:id', authMiddleware_1.default, paymentMethodController.update);
router.delete('/api/payment-methods/:id', authMiddleware_1.default, paymentMethodController.delete);
router.get('/api/payments/filter', paymentMethodController.getFilteredPayments);
router.get('/api/payments/location/:locationId/method/:methodId', paymentMethodController.getPaymentsByLocationAndMethod);
router.get('/api/payments/pending/location/:locationId', paymentMethodController.getPendingPaymentsByLocation);
router.get('/api/payments/total/method/:methodId', paymentMethodController.getTotalByPaymentMethod);
router.get('/api/payments/invoice/:invoiceId', paymentMethodController.getInvoicePayments);
router.put('/api/payments/:id/status', authMiddleware_1.default, paymentMethodController.updatePaymentStatus);
router.get('/api/payment-methods/location/:locationId', paymentMethodController.getAvailableMethodsByLocation);
router.get('/api/payments/count/status', paymentMethodController.getPaymentCountByStatus);
router.get('/api/payments/total/by-method', paymentMethodController.getTotalsByPaymentMethod);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map