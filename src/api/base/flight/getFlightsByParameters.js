import { http, FS_API_URL } from '../../index';

// get flights from the backend
const getFlightsByParameters = async (input, setFlights) => {
  const { data } = await http.get(`${FS_API_URL}/base/flights-by-parameters/`, {
    params: {
      origin_country: input.origin_country,
      destination_country: input.destination_country,
      departure_time: input.departure_time,
    },
  });
  if (data.message === 'No flights found with the specified parameters.') {
    setFlights([]); // if search don't match any flights
  } else if (data) {
    console.log(data.message);
    setFlights(data); // set the flights state with the found flights
  }
};
export default getFlightsByParameters;
