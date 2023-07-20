import { http, FS_API_URL } from '../index'

// get all customers from the backend
const getAllCustomers = async () => {
  const { data } = await http.get(`${FS_API_URL}/adm/all-customers/`)
  return data
}
export default getAllCustomers