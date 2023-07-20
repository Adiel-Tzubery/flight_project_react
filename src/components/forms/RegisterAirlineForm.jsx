import { object, string, ref } from 'yup'
import { Formik, Form, Field } from 'formik'
import { Input } from './Input'

import getAllCountries from '../../api/base/country/getAllCountries'
import registerAirline from '../../api/administrator/add/registerAirline'

import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const RegisterAirlineForm = () => {
  const [countries, setCountries] = useState([])

  // set the country state
  useEffect(() => {
    getAllCountries()
      .then((response) => {
        setCountries(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

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
  })

  return (
    <div>
      <ToastContainer />
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
            <Form>
              <Input
                label="Username"
                type="text"
                name="username"
                placeholder="username"
              />
              <Input label="Name" type="text" name="name" placeholder="name" />
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
                  setFieldValue('country', parseInt(event.target.value))
                }}
              >
                <option disabled selected>
                  Select a country
                </option>
                {countries.map((country) => {
                  return <option value={country.id}>{country.name}</option>
                })}
              </Field>
              <button type="submit">Register</button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default RegisterAirlineForm
