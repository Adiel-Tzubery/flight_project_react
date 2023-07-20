import { http, FS_API_URL } from '../index'

// send login request to the backend, get te data (access and refresh tokens) and return it
const login = async (username, password) => {
  const { data } = await http.post(`${FS_API_URL}/auth/login/`, {
    username: username,
    password: password,
  })

  return data
}

export default login
