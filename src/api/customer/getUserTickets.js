import { http, FS_API_URL } from '../index'

// send customer id to 'get_my_tickets', django view
const getUserTickets = async ({customerId}) => {
  const { data } = await http.get(
    `${FS_API_URL}/customer/my-tickets/${customerId}/`
  )
  return data
}
export default getUserTickets
