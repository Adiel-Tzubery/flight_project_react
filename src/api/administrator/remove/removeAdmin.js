import { http, FS_API_URL } from '../../index'

// send administrator's id to 'remove_administrator', django view
const removeAdmin = async (props) => {
  const { data } = await http.delete(`${FS_API_URL}/adm/remove-admin/`, {
    params: {
      administrator_id: props.administratorId,
    },
  })
  return data
}
export default removeAdmin
