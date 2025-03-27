import type { AuthResponse } from "~/src/domain";
import type { AuthResponseDatasource } from "../data-sources/auth_datasource.response";

export class AuthMapper {
  fromApiToModel(apiData: AuthResponseDatasource): AuthResponse {
    return {
      id: apiData.id,
      firstName: apiData.first_name,
      lastName: apiData.last_name,
      username: apiData.username,
      email: apiData.email,
      phone: apiData.phone,
      avatar: apiData.avatar,
      createdAt: apiData.created_at,
      updatedAt: apiData.updated_at,
      status: apiData.status,
      emailVerifiedAt: apiData.email_verified_at,
    };
  }
}
