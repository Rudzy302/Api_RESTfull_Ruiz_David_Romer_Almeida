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
exports.GetUserProfile = void 0;
const getDataByQuerySql_1 = require("../infra/getDataByQuerySql");
class GetUserProfile {
    getUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userQuery = new getDataByQuerySql_1.UserByIdSql();
                const userProfile = yield userQuery.UserByIdSql(userId);
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
            }
            catch (error) {
                console.error('Error al obtener perfil:', error);
                throw new Error('Error al obtener la información del usuario');
            }
        });
    }
}
exports.GetUserProfile = GetUserProfile;
//# sourceMappingURL=getUserProfileService.js.map