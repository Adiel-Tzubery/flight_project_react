// hooks
import { useState, useEffect } from 'react';

//css
import { Card, Button, Typography } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

// rout
import { useNavigate } from 'react-router';

// form
import Input from './Input';
import { object, string, ref } from 'yup';
import { Formik, Form, Field } from 'formik';

// api
import getAllCountries from '../../api/base/country/getAllCountries';
import registerAirline from '../../api/administrator/add/registerAirline';

const RegisterAirlineForm = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

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
    registerAirline(values)
      .then((response) => {
        toast.success('🥳 we have a new Airline!', {
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
        console.error(error);
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

  // form input validators
  const LoginValidation = object().shape({
    username: string()
      .required('this field is required')
      .min(5, 'Minimum 5 characters')
      .max(15, 'Maximum 15 characters')
      .matches(
        /^[a-zA-Z0-9\s_-]+$/,
        'Invalid characters, use only letters, numbers, space, hyphens and underscore'
      ),
    name: string()
      .required('this field is required')
      .min(5, 'Minimum 5 characters')
      .max(15, 'Maximum 15 characters')
      .matches(
        /^[a-zA-Z0-9\s_-]+$/,
        'Invalid characters, use only letters, numbers, space, hyphens and underscore'
      ),
    email: string().required('this field is required').email('Email not valid'),
    password: string()
      .required('this field is required')
      .min(8, 'Password must be at least 8 characters')
      .max(25, 'Password cannot be over 25 characters'),
    confirmPassword: string()
      .required('this field is required')
      .min(8, 'Password must be at least 8 characters')
      .max(25, 'Password cannot be over 25 characters')
      .oneOf([ref('password')], 'Passwords are not the same'),
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ToastContainer />
      <Card color="white" className="p-8" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Register Airline
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter flight details.
        </Typography>
        <Formik
          initialValues={{
            username: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            userRole: 'airline company',
          }}
          onSubmit={onSubmitHandler}
          validationSchema={LoginValidation} //use the input validators above.
        >
          {({ setFieldValue }) => {
            return (
              <Form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="username"
                  />
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="name"
                  />
                  <Input
                    label="Email"
                    type="text"
                    name="email"
                    placeholder="email"
                  />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                  />
                  <Field
                    label="Country"
                    name="country"
                    as="select"
                    onChange={(event) => {
                      setFieldValue('country', parseInt(event.target.value));
                    }}
                  >
                    <option disabled selected>
                      Select the airline country
                    </option>
                    {countries.map((country) => {
                      return <option value={country.id}>{country.name}</option>;
                    })}
                  </Field>
                  <div className="flex justify-center">
                    <Button
                      fullWidth
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6"
                    >
                      Register
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
  );
};

export default RegisterAirlineForm;
