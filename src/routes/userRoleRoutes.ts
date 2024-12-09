// src/routes/userRoleRoutes.ts
import { Router } from 'express';
import { UserRoleController } from '../controllers/userRoleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
const userRoleController = new UserRoleController();

// Todas las rutas protegidas
router.use(authMiddleware);

router.post('/api/user-roles', userRoleController.create.bind(userRoleController));
router.get('/api/users/:userId/roles', userRoleController.getUserRoles.bind(userRoleController));
router.get('/api/users/:userId/roles/count', userRoleController.countUserRoles.bind(userRoleController));
router.put('/api/users/:userId/roles', userRoleController.updateMultipleRoles.bind(userRoleController));

export default router;
