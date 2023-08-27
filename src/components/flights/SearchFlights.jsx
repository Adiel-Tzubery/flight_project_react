// hooks
import { useEffect, useState } from 'react';

// css
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// api
import getFlightsByParameters from '../../api/base/flight/getFlightsByParameters';
import getAllFlights from '../../api/base/flight/getAllFlights';
import getAllCountries from '../../api/base/country/getAllCountries';

const SearchFlights = ({ setFlights }) => {
  const initialSearchParams = {
    origin_country: '',
    destination_country: '',
    departure_time: '',
  };

  const [countries, setCountries] = useState([]);
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  useEffect(() => {
    getAllCountries()
      .then((response) => {
        setCountries(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // setFlight with all the flights when search cleared
  const handleClearSearch = () => {
    console.log('clear search button pressed');
    getAllFlights()
      .then((response) => {
        setFlights(response);
        setSearchParams(initialSearchParams);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchForm = (event) => {
    event.preventDefault();
    getFlightsByParameters(searchParams, setFlights)
      .then((response) => {
        console.log('response: ', response);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.message, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  // update the search state onChange
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [name]: value,
    }));
  };

  return (
    <div>
      <form
        method="GET"
        onSubmit={handleSearchForm}
        className="mt-8 mb-2 sm:w-full max-w flex flex-wrap"
      >
        <select
          name="origin_country"
          value={searchParams.origin_country}
          onChange={handleChange}
          className="w-2/12 mr-4 mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" selected>
            Origin Country
          </option>
          {countries.map((country) => {
            return (
              <option key={`origin-country-${country.id}`} value={country.name}>
                {country.name}
              </option>
            );
          })}
        </select>
        <select
          name="destination_country"
          value={searchParams.destination_country}
          onChange={handleChange}
          className="w-2/12 mr-4 mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" selected>
            Destination Country
          </option>
          {countries.map((country) => {
            return (
              <option
                key={`destination_country-${country.id}`}
                value={country.name}
              >
                {country.name}
              </option>
            );
          })}
        </select>
        <input
          type="date"
          name="departure_time"
          onChange={handleChange}
          className="w-2/12 mr-4 mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="w-1/12 mr-4 mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="w-1.5/12 mr-4 mb-4 p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
        >
          Clear Search
        </button>
      </form>
    </div>
  );
};
export default SearchFlights;
