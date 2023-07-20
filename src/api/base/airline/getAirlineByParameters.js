import { http, FS_API_URL } from '../../index'

// get airlines from the backend
const getAirlineByParameters = async ({originCountryId, destinationCountryId, date}) => {
  const { data } = await http.get(
    `${FS_API_URL}/base/airlines-by-parameters/`,
    {
      'origin_country_id': originCountryId,
      'destination_country_id': destinationCountryId,
      'date': date,
    }
  )
  return data
}
export default getAirlineByParameters
