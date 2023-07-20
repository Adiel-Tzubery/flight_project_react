import { object, string, ref, date, number } from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import DateTimeProvider from './dateTimeProvider'
import { Input } from './Input'

import { useStoreState } from 'easy-peasy'
import { useStoreActions } from 'easy-peasy'

import getAllCountries from '../../api/base/country/getAllCountries'
import addFlight from '../../api/airline/addFlight'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const AddFlightForm = () => {
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

  // form validators

  // IN THE BACKEND VALIDATE PAST DATES
  // AND ONE OF DESTINATION/ORIGIN MUT BE EQUAL TO AIRLINE COUNTRY
  const LoginValidation = object().shape({
    airlineCompany: string().required('this field is required'),
    originCountry: string().required('this field is required'),
    destinationCountry: string()
      .required('this field is required')
      .notOneOf(
        [ref('originCountry')],
        'Origin and destination cannot be the same'
      ),
    departureTime: date().required('this field is required'),
    landingTime: date().required('this field is required'),
    remainingTickets: number().min(1).required('this field is required'),
    price: number().min(1).required('this field is required'),
  })

  const userData = useStoreState((state) => state.user.data)

  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={{
          airline_company: userData?.id || null,
        }}
        onSubmit={onSubmitHandler}
        validationSchema={LoginValidation} //use the input validators above.
      >
        {({ setFieldValue}) => {
          return (
            <Form>
              <Field
                label="Origin Country"
                name="originCountry"
                as="select"
                onChange={(event) => {
                  setFieldValue('originCountry', parseInt(event.target.value))
                }}
              >
                <option disabled selected>
                  Select origin country
                </option>
                {countries.map((country) => {
                  return <option value={country.id}>{country.name}</option>
                })}
              </Field>
              <ErrorMessage
                name={'OriginCountry'}
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
                  )
                }}
              >
                <option disabled selected>
                  Select destination country
                </option>
                {countries.map((country) => {
                  return <option value={country.id}>{country.name}</option>
                })}
              </Field>
              <ErrorMessage
                name={'destinationCountry'}
                component="div"
                className="text-xs text-red-500"
              />
              <DateTimeProvider label="Departure Time" name="departureTime" />
              <DateTimeProvider label="Landing Time" name="landingTime" />
              <Field
                label="Remaining Tickets"
                name="remainingTickets"
                as="input"
                type="number"
                min="1"
                max="1048"
              />
              <ErrorMessage
                name={'remainingTickets'}
                component="div"
                className="text-xs text-red-500"
              />
              <Field
                label="Price"
                name="price"
                as="input"
                type="number"
                min="1"
                max="10000"
              />
              <ErrorMessage
                name={'price'}
                component="div"
                className="text-xs text-red-500"
              />
              <button
                className="bg-green-500 text-white rounded-md p-2 mt-2"
                type="submit"
              >
                Add flight
              </button>
              <br />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
export default AddFlightForm
