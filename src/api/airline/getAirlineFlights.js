import { http, FS_API_URL } from '../index'

// send airline id to 'get_my_flights', django view
const getAirlineFlights = async (props) => {
    const { data } = await http.get(`${FS_API_URL}/airline/my-flights/`, {
     params: {
      airline_id: props.airlineId,
    }})
    console.debug(data)
    return data
}
export default getAirlineFlights