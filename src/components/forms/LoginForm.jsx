// form related
import { object, string } from 'yup';
import { Formik, Form } from 'formik';
import Input from './Input';

// api
import { http } from '../../api';
import login from '../../api/auth/login';
import getUserData from '../../api/base/getUserData';

// global state
import { useStoreActions } from 'easy-peasy';

// router
import { Link, useNavigate } from 'react-router-dom';

// css
import { Card, Button, Typography } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

// utils
import { isLoggedIn } from '../utils';

const LoginForm = ({ setLoggedIn }) => {
  const setUserData = useStoreActions((actions) => actions.user.setUserData);
  const navigate = useNavigate();

  const onSubmitHandler = (values) => {
    console.debug(values);
    login(values.username, values.password)
      .then(async (response) => {
        toast.success('🥳 you have logged in!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        console.debug('First response', response);
        // set access and refresh tokens
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);

        // for the initial rendering, set the token in the headers
        http.defaults.headers['Authorization'] = `JWT ${response.access}`;

        getUserData().then((response) => {
          console.debug('Got User details:', response);
          setUserData(response);
          setLoggedIn(true);
        });
        console.debug('Login success!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Something terrible happened', error);
        toast.error(error.response.data.detail, {
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

  // form input validators.
  const LoginValidation = object().shape({
    username: string()
      .required('Username is required')
      .min(5, 'Username must be at least 5 characters')
      .max(15, 'Username cannot be over 15 characters')
      .matches(
        /^[a-zA-Z0-9\s_-]+$/,
        'Invalid characters, use only letters, numbers, space, hyphens and underscore'
      ),

    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(25, 'Password cannot be over 25 characters'),
  });

  return isLoggedIn() ? (
    <h1>FORBIDDEN! ALREADY LOGGED IN</h1>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <Card color="white" className="p-8" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details.
        </Typography>
        <ToastContainer />
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={onSubmitHandler}
          validationSchema={LoginValidation} // use the input validators above.
        >
          {() => {
            return (
              <Form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="enter username"
                  />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="enter password"
                  />
                  <div className="flex justify-center">
                    <Button
                      fullWidth
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6"
                    >
                      Login
                    </Button>
                  </div>
                  <div>
                    <Link to={'/register-customer'}>
                      <Typography
                        color="gray"
                        className="mt-4 text-center font-normal"
                      >
                        haven't got an account?{' '}
                        <a
                          href="#"
                          className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                        >
                          Register
                        </a>
                      </Typography>
                    </Link>
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

export default LoginForm;
