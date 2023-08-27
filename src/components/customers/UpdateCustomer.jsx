// global state
import { useStoreActions } from 'easy-peasy';

// form
import { object, string, ref } from 'yup';
import { Formik, Form } from 'formik';
import Input from '../forms/Input';

// router
import { useNavigate } from 'react-router-dom';

// api
import updateCustomer from '../../api/customer/updateCustomer';

// css
import { Card, Button, Typography } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

const UpdateCustomer = ({ userData }) => {
  const updateUserData = useStoreActions(
    (actions) => actions.user.updateUserData
  );
  const navigate = useNavigate();

  // set credit card number template
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

  // set phone number template
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
    updateCustomer(values)
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
  const UpdateValidation = object().shape({
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
    firstName: string()
      .required('First name is required')
      .min(3, 'minimum 3 characters')
      .max(50, 'Maximum 50 characters'),
    lastName: string()
      .required('Last name is required')
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters'),
    creditCardNo: string()
      .min(19, 'Credit not valid, use pattern: XXXX-XXXX-XXXX-XXXX')
      .max(19, 'Credit not valid, use pattern: XXXX-XXXX-XXXX-XXXX'),
    phoneNo: string()
      .required('Phone number is required')
      .min(12, 'Phone number not valid, use pattern: 05X-XXXX-XXX')
      .max(12, 'Phone number not valid, use pattern: 05X-XXXX-XXX')
      .matches(
        /^05\d{1}-\d{4}-\d{3}$/,
        'Phone number not valid, use pattern: 05X-XXXX-XXX'
      ),
    address: string().required('Address is requires'),
  });

  return (
    <div className="flex justify-center items-center min-h-screen my-4">
      <Card color="white" className="p-8" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Update Customer
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter customer details.
        </Typography>
        <ToastContainer />
        <Formik
          initialValues={{
            username: userData.username,
            email: userData.email,
            password: 'Original Password',
            newPassword: '',
            confirmPassword: '',
            firstName: userData.first_name,
            lastName: userData.last_name,
            creditCardNo: '',
            phoneNo: userData.phone_no,
            address: userData.address,
            userRole: 'customer',
            customerId: userData.customer_id,
          }}
          onSubmit={onSubmitHandler}
          validationSchema={UpdateValidation} //use the input validators above.
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
export default UpdateCustomer;
