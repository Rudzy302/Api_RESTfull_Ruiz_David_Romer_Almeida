"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoleController_1 = require("../controllers/userRoleController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
const userRoleController = new userRoleController_1.UserRoleController();
router.use(authMiddleware_1.default);
router.post('/api/user-roles', userRoleController.create.bind(userRoleController));
router.get('/api/users/:userId/roles', userRoleController.getUserRoles.bind(userRoleController));
router.get('/api/users/:userId/roles/count', userRoleController.countUserRoles.bind(userRoleController));
router.put('/api/users/:userId/roles', userRoleController.updateMultipleRoles.bind(userRoleController));
exports.default = router;
//# sourceMappingURL=userRoleRoutes.js.map