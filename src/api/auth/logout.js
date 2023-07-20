import { http, FS_API_URL } from '../index'


const logout = async (refresh_token) => {
    console.debug('logout api invoked')
    const { data } = await http.post(`${FS_API_URL}/auth/logout/`, {
        refresh_token: refresh_token,
    })
    return data
}
export default logout
