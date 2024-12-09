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
exports.RoleController = void 0;
const roleService_1 = require("../services/roleService");
class RoleController {
    constructor() {
        this.roleService = new roleService_1.RoleService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.roleService.create(req.body);
                res.status(201).json(role);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req, 'req');
                const roles = yield this.roleService.getAll();
                res.status(200).json(roles);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.roleService.getById(Number(req.params.id));
                res.status(200).json(role);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.roleService.getByName(req.params.name);
                res.status(200).json(role);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req, 'req');
                const count = yield this.roleService.count();
                res.status(200).json({ count });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.roleService.delete(Number(req.params.id));
                res.status(200).json({ message: 'Rol eliminado exitosamente' });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.roleService.update(Number(req.params.id), req.body);
                res.status(200).json(role);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.RoleController = RoleController;
//# sourceMappingURL=roleController.js.map