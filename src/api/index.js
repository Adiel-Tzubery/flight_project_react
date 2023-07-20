import axios from 'axios'

export const http =
  //@@@ remember to change

  // If the user is logged in, then we will
  // use the access token to make requests to the Django API.
  // Otherwise, we won't include the Authorization header.

  // check if user is logged in.
  localStorage.getItem('access_token')
    ? axios.create({
        // if logged in, send the access token with every request.
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access_token')}`,
        },
      })
    : axios.create({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

// reference to the start of every request
export const FS_API_URL = 'http://127.0.0.1:8000/api'
