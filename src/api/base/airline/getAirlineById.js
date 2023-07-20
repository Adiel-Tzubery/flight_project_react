import { http, FS_API_URL } from '../../index'

// get airline from the backend
const getAirlineById = async ({airlineId}) => {
  const { data } = await http.get(
    `${FS_API_URL}/'base/airline/${airlineId}/`,
    (params = {
      airline_id: airlineId,
      
    })
  )
  return data
}
export default getAirlineById
