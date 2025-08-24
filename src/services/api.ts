import axios from "services/axios.customize"

export const loginAPI = (username: String, password: String) => {
    const urlBackend = "/api/v1/auth/login";
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password })
}

export const registerAPI = (fullName: String, email: String, password: string, phone: string) => {
    const urlBackend = "/api/v1/user/register";
    return axios.post<IBackendRes<IRegister>>(urlBackend, { fullName, email, password, phone })
}