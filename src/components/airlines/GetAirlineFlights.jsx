// global state and local state
import { useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';

// api
import getAirlineFlights from '../../api/airline/getAirlineFlights';

// auth
import { isLoggedIn } from '../utils';

// router
import { useNavigate } from 'react-router';

// api
import getUserData from '../../api/base/getUserData';

// data
import FlightData from '../data/FlightData';

// css
import Spinner from '../Spinner';
import { Card, Typography } from '@material-tailwind/react';

const GetAirlineFlights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  const setUserData = useStoreActions((actions) => actions.user.setUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      getUserData().then((response) => {
        console.debug('Got User details:', response);
        setUserData(response);
        getAirlineFlights({ airlineId: response?.airline_id })
          .then((response) => {
            console.debug('Got Flights:', response);
            setFlights(response); // update the flights state with the fetch data
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching flights:', error);
            setIsLoading(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    }
  }, []);
  console.debug('airline flights:', flights);

  return (
    <div className="flex justify-center items-center h-[500px]">
      <Card color="white" className="rounded-3xl p-8" shadow={true}>
        <Typography variant="h3" className="text-left mb-4 text-gray-700">
          My Flights:
        </Typography>
        <button
          className="text-white bg-gradient-to-r from-green-400 via-green-600 to-green-600 text-center hover:bg-gradient-to-br focus:ring-4 py-1.5 focus:outline-none focus:ring-green-500 dark:focus:ring-green-800 font-bold rounded-lg text-2xl text px-5 py-4.5  ml-1 mb-1 items-center sm:w-[1145px]"
          onClick={() => {
            navigate('/add-flight');
          }}
          type="button"
        >
          Add New
        </button>
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
                        {key.replace('_', ' ')}
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
export default GetAirlineFlights;
