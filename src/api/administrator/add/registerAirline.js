import { http, FS_API_URL } from '../../index'


//send form data to 'add_airline', django view
const registerAirline = async (props) => {
  const { data } = await http.post(`${FS_API_URL}/adm/add-airline/`, {
    username: props.username,
    email: props.email,
    password: props.password,
    name: props.name,
    country: props.country,
    user_role: props.userRole,
  })
  return data
}
export default registerAirline
