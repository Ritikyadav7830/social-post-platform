import { API_URL } from "../config";

class AuthService {

    async logout() {

        return await fetch(
            `${API_URL}/api/v1/users/logout`,
            {
                method: "POST",
                credentials: "include"
            }
        )
    }
}

const authService = new AuthService()

export default authService