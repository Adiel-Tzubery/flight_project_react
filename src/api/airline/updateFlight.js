import { http, FS_API_URL } from '../index'

// send form data to 'update_flight', django view
const updateFlight = async (props) => {
    const { data } = await http.put(
      `${FS_API_URL}/airline/update-flight/${props.flightId}/`,
      {
        // flight data that can't be change: airline company, origin/destination country. 
        departure_time: props.departureTime,
        landing_time: props.landingTime,
        remaining_tickets: props.remainingTickets,
        price: props.price,
      }
    )
    return data
}
export default updateFlight
