// src/controllers/getProfile.ts
import { Request, Response } from 'express';
import { GetUserProfile } from '../services/getUserProfileService';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new Error('Usuario no autenticado');
    }

    const userProfile = new GetUserProfile();
    const user = await userProfile.getUserProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    console.error('Error en getProfile controller:', error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
