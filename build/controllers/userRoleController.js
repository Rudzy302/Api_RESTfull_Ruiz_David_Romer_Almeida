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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleController = void 0;
const userRoleService_1 = require("../services/userRoleService");
class UserRoleController {
    constructor() {
        this.userRoleService = new userRoleService_1.UserRoleService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRole = yield this.userRoleService.create(req.body);
                res.status(201).json(userRole);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getUserRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRoles = yield this.userRoleService.getUserRoles(Number(req.params.userId));
                res.status(200).json(userRoles);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    countUserRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.userRoleService.countUserRoles(Number(req.params.userId));
                res.status(200).json({ count });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateMultipleRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userRoleService.updateMultipleRoles(Number(req.params.userId), req.body.roleIds);
                res.status(200).json({ message: 'Roles actualizados exitosamente' });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UserRoleController = UserRoleController;
//# sourceMappingURL=userRoleController.js.map