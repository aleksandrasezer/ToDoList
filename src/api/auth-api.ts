import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fd7ee122-ff59-4cee-b5b0-6226ee5b433c'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', {email: email, password: password, rememberMe: rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    },
    authMe() {
        return instance.get(`auth/me`)
    }
}