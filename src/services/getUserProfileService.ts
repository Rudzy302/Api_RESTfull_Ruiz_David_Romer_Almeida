// src/services/getUserProfileService.ts
import { UserByIdSql } from '../infra/getDataByQuerySql';

interface UserProfile {
  id: number;
  email: string;
  profile: {
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
    phone: string | null;
  }
}
export class GetUserProfile {
  async getUserProfile(userId: number): Promise<UserProfile> {
    try {
      const userQuery = new UserByIdSql();
      const userProfile = await userQuery.UserByIdSql(userId);

      const profile = userProfile[0];
      return {
        id: profile.id,
        email: profile.email,
        profile: {
          firstName: profile.firstName || null,
          middleName: profile.middleName || null,
          lastName: profile.lastName || null,
          phone: profile.phone || null,
        },
      };
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw new Error('Error al obtener la información del usuario');
    }
  }
}
