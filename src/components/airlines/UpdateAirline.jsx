// global state
import { useStoreActions } from 'easy-peasy';

// form
import { object, string, ref } from 'yup';
import { Formik, Form } from 'formik';
import Input from '../forms/Input';

// router
import { useNavigate } from 'react-router-dom';

// api
import updateAirline from '../../api/airline/updateAirline';

// css
import { Card, Button, Typography } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

const UpdateAirline = ({ userData }) => {
  const updateUserData = useStoreActions(
    (actions) => actions.user.updateUserData
  );
  const navigate = useNavigate();

  const onSubmitHandler = (values) => {
    updateAirline(values)
      .then((response) => {
        toast.success('🥳 Update successfully!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        updateUserData(response);
        setTimeout(() => {
          navigate('/user-data');
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
      .required('Username is required')
      .min(5, 'Minimum 5 characters')
      .max(15, 'Maximum 15 characters')
      .matches(
        /^[a-zA-Z0-9\s_-]+$/,
        'Invalid characters, use only letters, numbers, space, hyphens and underscore'
      ),
    email: string().required('Email is required').email('Email not valid'),
    password: string()
      .min(8, 'Password must be at least 8 characters')
      .max(25, 'Password cannot be over 25 characters'),
    newPassword: string()
      .min(8, 'Password must be at least 8 characters')
      .max(25, 'Password cannot be over 25 characters')
      .notOneOf(
        [ref('password')],
        'new password cannot match the previous one'
      ),
    confirmPassword: string()
      .min(8, 'Password must be at least 8 characters')
      .max(25, 'Password cannot be over 25 characters')
      .oneOf([ref('newPassword')], 'password confirmation not match'),
    name: string()
      .required('this field is required')
      .min(5, 'Minimum 5 characters')
      .max(15, 'Maximum 15 characters')
      .matches(
        /^[a-zA-Z0-9\s_-]+$/,
        'Invalid characters, use only letters, numbers, space, hyphens and underscore'
      ),
  });

  return (
    <div className="flex justify-center items-center min-h-screen my-4">
      <Card color="white" className="p-8" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Update Airline
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter airline details.
        </Typography>
        <ToastContainer />
        <Formik
          initialValues={{
            username: userData.username,
            email: userData.email,
            password: 'Original Password',
            newPassword: '',
            confirmPassword: '',
            name: userData.name,
            userRole: 'airline company',
            airlineId: userData.airline_id,
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
                    label="New Password"
                    type="password"
                    name="newPassword"
                    placeholder="password"
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                  />
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="name"
                  />
                </div>
                <div className="flex justify-center mb-5">
                  <Button
                    fullWidth
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6"
                  >
                    Update
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
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};
export default UpdateAirline;
