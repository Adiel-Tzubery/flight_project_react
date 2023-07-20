import { http, FS_API_URL } from '../index'

// send form data to 'add_flight', django view
const addFlight = async (props) => {
  const { data } = await http.post(`${FS_API_URL}/airline/add-flight/`, {
    airline_company: props.airlineCompany,
    origin_country: props.originCountry,
    destination_country: props.destinationCountry,
    departure_time: props.departureTime,
    landing_time: props.landingTime,
    remaining_tickets: props.remainingTickets,
    price: props.price
  })
  return data
}
export default addFlight