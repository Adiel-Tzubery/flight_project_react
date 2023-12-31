import { http, FS_API_URL } from '../../index'

// get flight from the backend
const getFlightById = async ({ flightId }) => {
  const { data } = await http.get(`${FS_API_URL}/base/flight/`, {
    params: {
      flight_id: flightId,
    },
  })
  return data
}
export default getFlightById
