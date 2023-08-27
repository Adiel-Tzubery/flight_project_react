import { http, FS_API_URL } from '../index'

// send data to 'add_ticket', django view
const addTicket = async (props) => {
  const { data } = await http.post(
    `${FS_API_URL}/customer/add-ticket/`, {
      customer_id: props.customerId,  
      flight_id: props.flightId,
    }
  )
  return data
}
export default addTicket