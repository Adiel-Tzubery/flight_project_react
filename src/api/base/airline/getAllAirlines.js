import { http, FS_API_URL } from '../../index'


// get all airline from the backend
const getAllAirlines = async () => {
  const { data } = await http.get(`${FS_API_URL}/base/all-airlines/`)
  return data
}
export default getAllAirlines
