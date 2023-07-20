import { http, FS_API_URL } from '../../index'


//send form data to 'add_administrator', django view
const registerAdmin = async (props) => {
  const { data } = await http.post(`${FS_API_URL}/adm/add-admin/`, {
    username: props.username,
    email: props.email,
    password: props.password,
    first_name: props.firstName,
    last_name: props.lastName,
    user_role: props.userRole,
  })
  return data
}
export default registerAdmin