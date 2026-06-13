class AuthService {

    async logout() {

        return await fetch(
            "http://localhost:8000/api/v1/users/logout",
            {
                method: "POST",
                credentials: "include"
            }
        )
    }
}

const authService = new AuthService()

export default authService