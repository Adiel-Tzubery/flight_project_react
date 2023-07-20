import { http, FS_API_URL } from '../../index'

// get flights from the backend
const getFlightsByParameters = async ({name, countryId}) => {
  const { data } = await http.get(`${FS_API_URL}/base/flights-by-parameters/`, {
    'name': name,
    'country_id': countryId,
  })
  return data
}
export default getFlightsByParameters
