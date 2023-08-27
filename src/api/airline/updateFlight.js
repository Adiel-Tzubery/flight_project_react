import { http, FS_API_URL } from '../index'

// send form data to 'update_flight', django view
const updateFlight = async (props) => {
    const { data } = await http.put(`${FS_API_URL}/airline/update-flight/`, {
      // flight data that won't change: id, airline company, origin/destination country.
      flight_id: props.id,
      airline_company: props.airlineCompany,
      origin_country: props.originCountry,
      destination_country: props.destinationCountry,
      departure_time: props.departureTime,
      landing_time: props.landingTime,
      remaining_tickets: props.remainingTickets,
      price: props.price,
    })
    return data
}
export default updateFlight
