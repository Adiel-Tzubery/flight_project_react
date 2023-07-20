import { http, FS_API_URL } from '../../index'

// send customer's id to 'remove_airline', django view
const removeAirline = async ({airlineId}) => {
  const { data } = await http.delete(
    `${FS_API_URL}/adm/remove-airline/${airlineId}/`
  )
  return data
}
export default removeAirline