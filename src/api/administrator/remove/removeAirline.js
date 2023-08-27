import { http, FS_API_URL } from '../../index'

// send customer's id to 'remove_airline', django view
const removeAirline = async (props) => {
  const { data } = await http.delete(
    `${FS_API_URL}/adm/remove-airline/`,{
      params: {
        airline_id: props.airlineId,
      },
    }
  )
  return data
}
export default removeAirline