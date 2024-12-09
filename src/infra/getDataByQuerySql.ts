import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';

// src/infra/getDataByQuerySql.ts
interface UserQueryResult {
  id: number;
  email: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  phone: string | null;
}

export class UserByIdSql {
  async UserByIdSql(userId: number): Promise<UserQueryResult[]> {
    const query = `
      SELECT 
        u.id,
        u.email,
        p.firstName,
        p.middleName,
        p.lastName,
        p.phone
      FROM users u
      LEFT JOIN people p ON p.idUser = u.id
      WHERE u.id = :userId
    `;

    try {
      const results = await sequelize.query(query, {
        replacements: { userId },
        type: QueryTypes.SELECT,
      });

      if (!results.length) {
        throw new Error('Usuario no encontrado');
      }

      return results as UserQueryResult[];
    } catch (error) {
      throw new Error('Error al obtener la información del usuario');
    }
  }
}
