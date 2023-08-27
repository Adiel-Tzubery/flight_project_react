import { http, FS_API_URL } from '../index'


// send ticket id to 'remove_ticket', django view
const removeTicket = async ({ticketId}) => {
  const { data } = await http.delete(
    `${FS_API_URL}/customer/remove-ticket/`, {
      params: {
        ticket_id: ticketId
      },
    }
  )
  return data
}
export default removeTicket