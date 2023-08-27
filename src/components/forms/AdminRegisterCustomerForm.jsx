// global state
import { useStoreActions } from 'easy-peasy';

// form related
import Input from './Input';
import { object, string, ref } from 'yup';
import { Formik, Form } from 'formik';

// router
import { Link, useNavigate } from 'react-router-dom';

// api
import registerCustomer from '../../api/administrator/add/registerCustomer';

// css
import { ToastContainer, toast } from 'react-toastify';
import { Card, Button, Typography } from '@material-tailwind/react';

const AdminRegisterCustomerForm = () => {
  const setUserData = useStoreActions((actions) => actions.user.setUserData);
  const navigate = useNavigate();

  const handleCreditCardChange = (event, setFieldValue) => {
    let newValue = event.target.value;
    // Remove any non-digit characters
    newValue = newValue.replace(/\D/g, '');
    // Remove any existing '-' characters
    newValue = newValue.replace(/-/g, '');
    // Restrict the input to a maximum of 16 characters
    if (newValue.length > 16) {
      newValue = newValue.slice(0, 16);
    }
    // Add '-' after every 4 digits
    if (newValue.length > 0) {
      newValue = newValue.match(/.{1,4}/g).join('-');
    }
    // Update Formik's value for creditCardNo
    setFieldValue('creditCardNo', newValue);
  };

  const handlePhoneChange = (event, setFieldValue) => {
    let newValue = event.target.value;
    // Remove any non-digit characters
    newValue = newValue.replace(/\D/g, '');
    // Ensure it always starts with '05'
    if (!newValue.startsWith('05')) {
      newValue = '05';
    }
    // Format the rest of the digits with hyphens
    if (newValue.length > 3) {
      if (newValue.length <= 7) {
        newValue = `${newValue.slice(0, 3)}-${newValue.slice(3)}`;
      } else {
        newValue = `${newValue.slice(0, 3)}-${newValue.slice(
          3,
          7
        )}-${newValue.slice(7)}`;
      }
    }
    // Update Formik's value for phoneNo
    setFieldValue('phoneNo', newValue);
  };

  const onSubmitHandler = (values) => {
    registerCustomer(values)
      .then((response) => {
        toast.success('🥳 we have a new Customer!', {
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
    creditCardNo: string()
      // add regex here.
      .required('Credit Card is required')
      .min(19, 'Credit card number not valid')
      .max(19, 'Credit card number not valid'),
    phoneNo: string()
      .required('Phone number is required')
      .min(12, 'Phone number not valid')
      .max(12, 'Phone number not valid')
      // maybe change the regex
      .matches(/^\d{3}-\d{4}-\d{3}$/, 'Phone number not valid, : 123-4567-890'),
    address: string().required('Address is requires'),
  });

  return (
    <div className="flex justify-center items-center min-h-screen my-4">
      <Card color="white" className="p-8" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Register Customer
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter customer details.
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
            creditCardNo: '',
            phone_no: '',
            address: '',
            userRole: 'customer',
          }}
          onSubmit={onSubmitHandler}
          validationSchema={LoginValidation} //use the input validators above.
        >
          {({ values, setFieldValue }) => {
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
                  <Input
                    label="Credit Card Number"
                    type="text"
                    name="creditCardNo"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    value={values.creditCardNo} // Use formik values instead of state
                    onChange={(event) =>
                      handleCreditCardChange(event, setFieldValue)
                    }
                  />
                  <Input
                    label="Phone Number"
                    type="text"
                    name="phoneNo"
                    placeholder="05x-xxxx-xxx"
                    maxLength={12} // This includes hyphens
                    value={values.phoneNo} // Use formik values instead of state
                    onChange={(event) =>
                      handlePhoneChange(event, setFieldValue)
                    }
                  />
                  <Input
                    label="Address"
                    type="text"
                    name="address"
                    placeholder="address"
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
export default AdminRegisterCustomerForm;
