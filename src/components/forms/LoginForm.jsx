// form related imports
import { object, string } from 'yup'
import { Formik, Form } from 'formik'
import { Input } from './Input'

// api related imports
import { http } from '../../api'
import login from '../../api/auth/login'
import getUserData from '../../api/base/getUserData'

// global state import
import { useStoreActions } from 'easy-peasy'

const LoginForm = () => {
  const setUserData = useStoreActions((actions) => actions.user.setUserData)

  const onSubmitHandler = (values) => {
    console.debug(values)
    login(values.username, values.password)
      .then(async (response) => {
        console.debug('First response', response)
        // set access and refresh tokens
        localStorage.setItem('access_token', response.access)
        localStorage.setItem('refresh_token', response.refresh)

        // for the initial rendering
        http.defaults.headers['Authorization'] = `JWT ${response.access}`

        getUserData().then((response) => {
          console.debug('Got User details:', response)

          setUserData(response)
        })

        // TODO: setLoading(False) && Navigate to home page

        console.debug('Login success!')
      })
      .catch((error) => {
        console.error('something went wrong', error)
      })
  }

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
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
            <Form className="bg-white rounded shadow p-8">
              <div className="mb-4">
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
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Login
                  </button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginForm
