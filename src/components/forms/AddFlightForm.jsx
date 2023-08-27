// css
import Spinner from '../Spinner';
import { Card, Button, Typography } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

// form
import { object, string, ref, date, number } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DateTimeProvider from './DateTimeProvider';

// global state
import { useStoreState } from 'easy-peasy';

// hooks
import { useState, useEffect } from 'react';

// api
import getAllCountries from '../../api/base/country/getAllCountries';
import addFlight from '../../api/airline/addFlight';

// router
import { useNavigate } from 'react-router';

const AddFlightForm = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate()

  // set the country state
  useEffect(() => {
    getAllCountries()
      .then((response) => {
        setCountries(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onSubmitHandler = (values) => {
    console.log('Form submitted!', values);
    addFlight(values)
      .then((response) => {
        toast.success('🥳 new flight Added!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch((error) => {
        console.error('there is terrible horror in you code! fux it!', error);
        toast.error(error.response.data.message, {
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


  const FlightValidation = object().shape({
    originCountry: string().required('this field is required'),
    destinationCountry: string()
      .required('this field is required')
      .notOneOf(
        [ref('originCountry')],
        'Origin and destination cannot be the same'
      ),
    departureTime: date().required('this field is required'),
    landingTime: date()
      .required('this field is required')
      .test(
        'is-after-departure',
        'Landing time must be after departure time',
        function (value) {
          const { departureTime } = this.parent;
          return value > departureTime;
        }
      ),
    remainingTickets: number().min(1).max(500).required('this field is required'),
    price: number().min(1).max(3000).required('this field is required'),
  });

  // use global state
  const userData = useStoreState((state) => state.user.data);

  return (
    <>
      {/* ensure that the component will render only when userData loaded */}
      {!userData ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center min-h-screen mt-10">
          <ToastContainer />
          <Card color="white" className="p-8" shadow={true}>
            <Typography variant="h4" color="blue-gray">
              Add Flight
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter flight details.
            </Typography>
            <Formik
              initialValues={{
                airlineCompany: userData?.airline_id,
              }}
              onSubmit={onSubmitHandler}
              validationSchema={FlightValidation} //use the input validators above.
            >
              {({ setFieldValue }) => {
                return (
                  <Form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                      <Field
                        label="Origin Country"
                        name="originCountry"
                        as="select"
                        onChange={(event) => {
                          setFieldValue(
                            'originCountry',
                            parseInt(event.target.value)
                          );
                        }}
                      >
                        <option disabled selected>
                          Select origin country
                        </option>
                        {countries.map((country) => {
                          return (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        name={'originCountry'}
                        component="div"
                        className="text-xs text-red-500"
                      />
                      <Field
                        label="Destination Country"
                        name="destinationCountry"
                        as="select"
                        onChange={(event) => {
                          setFieldValue(
                            'destinationCountry',
                            parseInt(event.target.value)
                          );
                        }}
                      >
                        <option disabled selected>
                          Select destination country
                        </option>
                        {countries.map((country) => {
                          return (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        name={'destinationCountry'}
                        component="div"
                        className="text-xs text-red-500"
                      />
                      <DateTimeProvider
                        label="Departure Time"
                        name="departureTime"
                        onChange={(event) => {
                          // change date format
                          event = event.toISOString();
                          console.log(event);
                          setFieldValue('departureTime', event);
                        }}
                      />
                      <ErrorMessage
                        name={'departureTime'}
                        component="div"
                        className="text-xs text-red-500"
                      />
                      <DateTimeProvider
                        label="Landing Time"
                        name="landingTime"
                        onChange={(event) => {
                          // change date format
                          event = event.toISOString();
                          setFieldValue('landingTime', event);
                        }}
                      />
                      <ErrorMessage
                        name={'landingTime'}
                        component="div"
                        className="text-xs text-red-500"
                      />
                      <Typography color="gray" className="mt-1 font-normal">
                        Seats Number
                      </Typography>
                      <Field
                        label="Remaining Tickets"
                        name="remainingTickets"
                        as="input"
                        type="number"
                        min="1"
                        max="1048"
                        className="input-field focus:ring focus:ring-blue-200 focus:outline-none border border-gray-400"
                      />
                      <ErrorMessage
                        name={'remainingTickets'}
                        component="div"
                        className="text-xs text-red-500"
                      />
                      <Typography color="gray" className="mt-1 font-normal">
                        Ticket Price
                      </Typography>
                      <Field
                        label="Price"
                        name="price"
                        as="input"
                        type="number"
                        min="1"
                        max="10000"
                        className="input-field focus:ring focus:ring-blue-200 focus:outline-none border border-gray-400"
                      />
                      <ErrorMessage
                        name={'price'}
                        component="div"
                        className="text-xs text-red-500"
                      />
                      <div className="flex justify-center">
                        <Button
                          fullWidth
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6"
                        >
                          Add Flight
                        </Button>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            navigate('/');
                          }}
                          type="button"
                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-500 dark:focus:ring-red-800 font-semibold rounded-lg text-l px-5 py-4.5 text-center ml-1 mb-1 sm:w-full "
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </div>
      )}
    </>
  );
};
export default AddFlightForm;
