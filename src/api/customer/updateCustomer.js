import { http, FS_API_URL } from '../index'


// send form data to 'update_customer', django view
const updateCustomer = async (props) => {
const { data } = await http.put(
  `${FS_API_URL}/customer/update-customer/`,
  {
    customer_id: props.customerId,
    username: props.username,
    email: props.email,
    password: props.password,
    new_password: props.newPassword,
    first_name: props.firstName,
    last_name: props.lastName,
    credit_card_no: props.creditCardNo,
    phone_no: props.phoneNo,
    address: props.address,
  }
)
return data
}
export default updateCustomer