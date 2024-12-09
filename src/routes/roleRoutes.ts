// src/routes/roleRoutes.ts
import { Router } from 'express';
import { RoleController } from '../controllers/roleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
const roleController = new RoleController();

// Rutas públicas
router.get('/api/roles', roleController.getAll.bind(roleController));
router.get('/api/roles/count', roleController.count.bind(roleController));
router.get('/api/roles/:id', roleController.getById.bind(roleController));
router.get('/api/roles/name/:name', roleController.getByName.bind(roleController));

// Rutas protegidas
router.post('/api/roles', authMiddleware, roleController.create.bind(roleController));
router.put('/api/roles/:id', authMiddleware, roleController.update.bind(roleController));
router.delete('/api/roles/:id', authMiddleware, roleController.delete.bind(roleController));

export default router;
