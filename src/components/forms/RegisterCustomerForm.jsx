import { object, string, ref } from 'yup'
import { Formik, Form } from 'formik'
import { Input } from './Input'

import registerCustomer from '../../api/administrator/add/registerCustomer'

import { ToastContainer, toast } from 'react-toastify'

const RegisterCustomerForm = () => {

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
        })
      })
      .catch((error) => {
        console.error(error)
        toast.error(error.response.data.message, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
    })
  }

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
      address: string()
      .required("Address is requires"),
  })

  return (
    <div>
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
        {() => {
          return (
            <Form>
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
                placeholder="credit card"
              />
              <Input
                label="Phone Number"
                type="text"
                name="phoneNo"
                placeholder="phone number"
              />
              <Input
                label="Address"
                type="text"
                name="address"
                placeholder="address"
              />
              <button type="submit">Register</button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
export default RegisterCustomerForm
