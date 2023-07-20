import { http, FS_API_URL } from '../index'

// send form data to 'update_airline', django view
const updateAirline = async (props) => {
  const { data } = await http.put(
    `${FS_API_URL}/airline/update-airline/${props.airlineId}/`,
    {
      username: props.username,
      email: props.email,
      password: props.password,
      name: props.name,
      country: props.country,
    }
    )
    return data
}
export default updateAirline