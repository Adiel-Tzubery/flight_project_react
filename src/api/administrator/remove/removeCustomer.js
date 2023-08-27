import { http, FS_API_URL } from '../../index'

// send customer's id to 'remove_customer', django view
const removeCustomer = async (props) => {
  const { data } = await http.delete(`${FS_API_URL}/adm/remove-customer/`, {
    params: {
      customer_id: props.customerId,
    },
  })
  return data
}
export default removeCustomer
