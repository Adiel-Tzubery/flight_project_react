import { http, FS_API_URL } from '../index'


// get user information from the backend
const getUserData = async () => {
  const { data } = await http.get(`${FS_API_URL}/base/user_data/`)
  return data
}
export default getUserData
