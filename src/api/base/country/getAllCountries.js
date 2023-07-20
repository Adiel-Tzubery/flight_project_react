import { http, FS_API_URL } from '../../index'

// get all countries from the backend
const getAllCountries = async () => {
  const { data } = await http.get(`${FS_API_URL}/base/all-countries/`)
  return data
}
export default getAllCountries