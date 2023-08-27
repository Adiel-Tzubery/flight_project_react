import { http, FS_API_URL } from '../index'

const removeFlight = async (props) => {
  const { data } = await http.delete(`${FS_API_URL}/airline/remove-flight/`, {
    params: {
    flight_id: props.flightId,
  }})
  return data
}
export default removeFlight
