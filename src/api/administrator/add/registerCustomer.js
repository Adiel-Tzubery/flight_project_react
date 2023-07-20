import { http, FS_API_URL } from '../../index'

//send form data to 'add_customer', django view
const registerCustomer = async (props) => {
  const { data } = await http.post(`${FS_API_URL}/adm/add-customer/`, {
    username: props.username,
    email: props.email,
    password: props.password,
    first_name: props.firstName,
    last_name: props.lastName,
    credit_card_no: props.creditCardNo,
    phone_no: props.phoneNo,
    address: props.address,
    user_role: props.userRole,
  })
  return data
}
export default registerCustomer