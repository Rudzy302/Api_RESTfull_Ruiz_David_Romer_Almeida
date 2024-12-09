// src/controllers/userRoleController.ts
import { Request, Response } from 'express';
import { UserRoleService } from '../services/userRoleService';

export class UserRoleController {
  private userRoleService: UserRoleService;

  constructor() {
    this.userRoleService = new UserRoleService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const userRole = await this.userRoleService.create(req.body);
      res.status(201).json(userRole);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserRoles(req: Request, res: Response): Promise<void> {
    try {
      const userRoles = await this.userRoleService.getUserRoles(Number(req.params.userId));
      res.status(200).json(userRoles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async countUserRoles(req: Request, res: Response): Promise<void> {
    try {
      const count = await this.userRoleService.countUserRoles(Number(req.params.userId));
      res.status(200).json({ count });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateMultipleRoles(req: Request, res: Response): Promise<void> {
    try {
      await this.userRoleService.updateMultipleRoles(
        Number(req.params.userId),
        req.body.roleIds,
      );
      res.status(200).json({ message: 'Roles actualizados exitosamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
