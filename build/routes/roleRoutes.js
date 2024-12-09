"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controllers/roleController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
const roleController = new roleController_1.RoleController();
router.get('/api/roles', roleController.getAll.bind(roleController));
router.get('/api/roles/count', roleController.count.bind(roleController));
router.get('/api/roles/:id', roleController.getById.bind(roleController));
router.get('/api/roles/name/:name', roleController.getByName.bind(roleController));
router.post('/api/roles', authMiddleware_1.default, roleController.create.bind(roleController));
router.put('/api/roles/:id', authMiddleware_1.default, roleController.update.bind(roleController));
router.delete('/api/roles/:id', authMiddleware_1.default, roleController.delete.bind(roleController));
exports.default = router;
//# sourceMappingURL=roleRoutes.js.map