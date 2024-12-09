// src/controllers/roleController.ts
import { Request, Response } from 'express';
import { RoleService } from '../services/roleService';

export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const role = await this.roleService.create(req.body);
      res.status(201).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      console.log(req, 'req');
      const roles = await this.roleService.getAll();
      res.status(200).json(roles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const role = await this.roleService.getById(Number(req.params.id));
      res.status(200).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByName(req: Request, res: Response): Promise<void> {
    try {
      const role = await this.roleService.getByName(req.params.name);
      res.status(200).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async count(req: Request, res: Response): Promise<void> {
    try {
      console.log(req, 'req');
      const count = await this.roleService.count();
      res.status(200).json({ count });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.roleService.delete(Number(req.params.id));
      res.status(200).json({ message: 'Rol eliminado exitosamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const role = await this.roleService.update(Number(req.params.id), req.body);
      res.status(200).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
