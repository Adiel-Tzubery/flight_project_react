import { http, FS_API_URL } from '../../index'

// send customer's id to 'remove_customer', django view
const removeCustomer = async ({customerId}) => {
  const { data } = await http.delete(
    `${FS_API_URL}/adm/remove-customer/${customerId}/`
  )
  return data
}
export default removeCustomer