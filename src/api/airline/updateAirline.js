import { http, FS_API_URL } from '../index'

// send form data to 'update_airline', django view
const updateAirline = async (props) => {
  const { data } = await http.put(`${FS_API_URL}/airline/update-airline/`, {
    airline_id: props.airlineId,
    username: props.username,
    email: props.email,
    password: props.password,
    new_password: props.newPassword,
    name: props.name,
  });
    return data
}
export default updateAirline