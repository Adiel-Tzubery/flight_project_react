// for,
import Input from './Input';
import { object, string, ref } from 'yup';
import { Formik, Form } from 'formik';

// api
import registerAdmin from '../../api/administrator/add/registerAdmin';

// router
import { useNavigate } from 'react-router';

// css
import { Card, Button, Typography } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

const RegisterAdminForm = () => {
  const navigate = useNavigate();

  const onSubmitHandler = (values) => {
    registerAdmin(values)
      .then((response) => {
        toast.success('🥳 we have a new Admin!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch((error) => {
        console.error(error);
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

  // form input validators
  const LoginValidation = object().shape({
    username: string()
      .required('Username is required')
      .min(5, 'Minimum 5 characters')
      .max(15, 'Maximum 15 characters')
      .matches(
        /^[a-zA-Z0-9\s_-]+$/,
        'Invalid characters, use only letters, numbers, space, hyphens and underscore'
      ),
    email: string().required('Email is required').email('Email not valid'),
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(25, 'Password cannot be over 25 characters'),
    confirmPassword: string()
      .required('Must confirm the password')
      .min(8, 'Password must be at least 8 characters')
      .max(25, 'Password cannot be over 25 characters')
      .oneOf([ref('password')], 'Two password are not the same'),
    firstName: string()
      .required('First name is required')
      .min(3, 'minimum 3 characters')
      .max(50, 'Maximum 50 characters'),
    lastName: string()
      .required('Last name is required')
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters'),
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card color="white" className="p-8" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Register Admin
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter admin details.
        </Typography>
        <ToastContainer />
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            userRole: 'administrator',
          }}
          onSubmit={onSubmitHandler}
          validationSchema={LoginValidation} //use the input validators above.
        >
          {() => {
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
                  <Input
                    label="First Name"
                    type="text"
                    name="firstName"
                    placeholder="first name"
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="last name"
                  />
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
export default RegisterAdminForm;
