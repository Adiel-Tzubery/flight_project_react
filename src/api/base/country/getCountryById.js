import { http, FS_API_URL } from '../../index'

// get country from the backend
const getCountryById = async ({countryId}) => {
  const { data } = await http.get(`${FS_API_URL}/base/country/${countryId}/`)
  return data
}
export default getCountryById