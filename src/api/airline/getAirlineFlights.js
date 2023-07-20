import { http, FS_API_URL } from '../index'

// send airline id to 'get_my_flights', django view
const getAirlineFlights = async ({airlineId}) => {
    const { data } = await http.get(`${FS_API_URL}/airline/my-flight/${airlineId}`)
    return data
}
export default getAirlineFlights