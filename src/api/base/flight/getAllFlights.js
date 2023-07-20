import { http, FS_API_URL } from '../../index'

// get all flights from the backend
const getAllFlights = async () => {
  const { data } = await http.get(`${FS_API_URL}/base/all-flights/`)
    return data
}
export default getAllFlights