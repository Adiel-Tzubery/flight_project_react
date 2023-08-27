// hooks
import { useEffect, useState } from 'react';

// api
import getAllFlights from '../../api/base/flight/getAllFlights';

// data
import FlightData from '../data/FlightData';
import SearchFlights from './SearchFlights';

// css
import Spinner from '../Spinner';
import { Card, Typography } from '@material-tailwind/react';

const GetAllFlights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    getAllFlights()
      .then((response) => {
        console.debug('Got Flights:', response);
        setFlights(response);
      })
      .catch((error) => {
        console.error('Error fetching flights:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-[500px]">
      <Card color="white" className="rounded-3xl p-8" shadow={true}>
        <Typography variant="h3" className="text-center mb-4 text-gray-700">
          Flights:
        </Typography>
        {/* flights search set the flight state */}
        <SearchFlights setFlights={setFlights} />{' '}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {flights.length === 0 ? (
              <Typography
                variant="h3"
                className="text-center text-3xl font-bold mb-4 mt-10 text-gray-600"
              >
                No flights found
              </Typography>
            ) : (
              <table>
                <thead className="text-center">
                  <tr className="bg-primary text-center">
                    {Object.keys(flights[0]).map((key) => (
                      <th
                        key={key}
                        className="w-1/6 min-w-[70px] capitalize text-base font-semibold text-white lg:py-2 px-1 lg:px-5 border-l border-transparent bg-blue-600"
                      >
                        {key === 'id'
                          ? key.replace('id', 'flight number')
                          : key === 'origin_country'
                          ? key.replace('origin_country', 'Origin')
                          : key === 'destination_country'
                          ? key.replace('destination_country', 'Destination')
                          : key.replace('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight) => (
                    <FlightData key={flight.id} flight={flight} />
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
export default GetAllFlights;
