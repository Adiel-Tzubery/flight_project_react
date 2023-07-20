import { http, FS_API_URL } from '../../index'

// send customer's id to 'remove_administrator', django view
const removeAdmin = async ({administratorId}) => {
  const { data } = await http.delete(
    `${FS_API_URL}/adm/remove-admin/${administratorId}/`)
    return data
}
export default removeAdmin