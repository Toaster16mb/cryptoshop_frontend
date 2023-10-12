import http from "@/http-common";
import { AuthDataDTO } from "@/types/AuthDataDTO";

class AuthService {
  checkAuth(): Promise<any> {
    return http.get("/account");
  }
  setAuth(data: AuthDataDTO): Promise<any> {
    return http.post("/users/auth", data);
  }
}

export default new AuthService();
