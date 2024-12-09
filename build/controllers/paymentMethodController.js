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
exports.PaymentMethodController = void 0;
const sequelize_1 = require("sequelize");
const paymentMethodModel_1 = __importDefault(require("../models/paymentMethodModel"));
const paymentGatewayModel_1 = __importDefault(require("../models/paymentGatewayModel"));
const paymentGatewayLocationModel_1 = __importDefault(require("../models/paymentGatewayLocationModel"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const database_1 = __importDefault(require("../config/database"));
class PaymentMethodController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield paymentMethodModel_1.default.create(req.body);
                res.status(201).json(paymentMethod);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                const paymentMethods = yield paymentMethodModel_1.default.findAll();
                res.status(200).json(paymentMethods);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield paymentMethodModel_1.default.findByPk(req.params.id);
                if (!paymentMethod)
                    throw new Error('Método de pago no encontrado');
                res.status(200).json(paymentMethod);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield paymentMethodModel_1.default.findByPk(req.params.id);
                if (!paymentMethod)
                    throw new Error('Método de pago no encontrado');
                yield paymentMethod.update(req.body);
                res.status(200).json(paymentMethod);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield paymentMethodModel_1.default.findByPk(req.params.id);
                if (!paymentMethod)
                    throw new Error('Método de pago no encontrado');
                yield paymentMethod.destroy();
                res.status(204).send();
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getFilteredPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, amount, date } = req.query;
                const where = {};
                if (status)
                    where.status = status;
                if (amount)
                    where.amount = amount;
                if (date)
                    where.createdAt = { [sequelize_1.Op.like]: `${date}%` };
                const payments = yield paymentModel_1.default.findAll({ where });
                res.status(200).json(payments);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getPaymentsByLocationAndMethod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { locationId, methodId } = req.params;
                const payments = yield paymentModel_1.default.findAll({
                    where: {
                        locationId,
                        paymentMethodId: methodId,
                    },
                });
                res.status(200).json(payments);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getPendingPaymentsByLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { locationId } = req.params;
                const payments = yield paymentModel_1.default.findAll({
                    where: {
                        locationId,
                        status: 'PENDING',
                    },
                });
                res.status(200).json(payments);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getTotalByPaymentMethod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { methodId } = req.params;
                const total = yield paymentModel_1.default.sum('amount', {
                    where: { paymentMethodId: methodId },
                });
                res.status(200).json({ total });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getInvoicePayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { invoiceId } = req.params;
                const payments = yield paymentModel_1.default.findAll({
                    where: { invoiceId },
                    include: [paymentMethodModel_1.default],
                });
                res.status(200).json(payments);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updatePaymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const payment = yield paymentModel_1.default.findByPk(id);
                if (!payment)
                    throw new Error('Pago no encontrado');
                yield payment.update({ status });
                res.status(200).json(payment);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAvailableMethodsByLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { locationId } = req.params;
                const methods = yield paymentMethodModel_1.default.findAll({
                    include: [{
                            model: paymentGatewayModel_1.default,
                            include: [{
                                    model: paymentGatewayLocationModel_1.default,
                                    where: { id: locationId },
                                }],
                        }],
                });
                res.status(200).json(methods);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getPaymentCountByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                const counts = yield paymentModel_1.default.findAll({
                    attributes: ['status', [database_1.default.fn('count', 'status'), 'count']],
                    group: ['status'],
                });
                res.status(200).json(counts);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getTotalsByPaymentMethod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                const totals = yield paymentModel_1.default.findAll({
                    attributes: [
                        'paymentMethodId',
                        [database_1.default.fn('sum', database_1.default.col('amount')), 'total'],
                    ],
                    group: ['paymentMethodId'],
                    include: [paymentMethodModel_1.default],
                });
                res.status(200).json(totals);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.PaymentMethodController = PaymentMethodController;
//# sourceMappingURL=paymentMethodController.js.map