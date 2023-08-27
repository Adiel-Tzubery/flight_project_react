// hooks
import { useEffect, useState } from 'react';

// api
import getAllAirlines from '../../api/base/airline/getAllAirlines';

// data
import AirlineData from '../data/AirlineData';

// router
import { useNavigate } from 'react-router';

// css
import Spinner from '../Spinner';
import { Card, Typography } from '@material-tailwind/react';

const GetAllAirlines = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [airlines, setAirlines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllAirlines()
      .then((response) => {
        console.debug('got airlines:', response);
        setAirlines(response); // update the airlines state with the fetch data
      })
      .catch((error) => {
        console.error('Error fetching airlines:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAirlineDeletion = (deletedAirline) => {
    //update the airlines state in case of deletion
    setAirlines((prevAirline) =>
      prevAirline.filter((airline) => airline !== deletedAirline)
    );
  };

  return (
    <div className="flex justify-center items-center h-[350px]">
      <Card color="white" className="rounded-3xl p-8" shadow={true}>
        <Typography variant="h3" className="text-left mb-4 text-gray-700">
          All Airlines:
        </Typography>
        <button
          className="text-white bg-gradient-to-r from-green-400 via-green-600 to-green-600 text-center hover:bg-gradient-to-br focus:ring-4 py-2 focus:outline-none focus:ring-green-500 dark:focus:ring-green-800 font-semibold rounded-lg text-m px-5 py-4.5  ml-1 mb-1 items-center sm:w-[455px]"
          onClick={() => {
            navigate('/register-airline');
          }}
          type="button"
        >
          Add New
        </button>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {airlines.length === 0 ? (
              <Typography
                variant="h3"
                className="text-center text-3xl font-bold mb-4 mt-10 text-gray-600"
              >
                No airlines found
              </Typography>
            ) : (
              <table>
                <thead className="text-center">
                  <tr className="bg-primary text-center">
                    {Object.keys(airlines[0]).map((key) => (
                      <th
                        key={key}
                        className="w-3/10 capitalize text-base font-semibold text-white lg:py-2 px-1 lg:px-5 border-l border-transparent bg-blue-600"
                      >
                        {key.replace('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {airlines.map((airline) => (
                    <AirlineData
                      key={airline.id}
                      airline={airline}
                      onAirlineDeleted={handleAirlineDeletion}
                    />
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
export default GetAllAirlines;
