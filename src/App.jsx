import Navbar from './components/Navbar'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './components/forms/LoginForm'
import RegisterCustomerForm from './components/forms/RegisterCustomerForm'
import RegisterAdminForm from './components/forms/RegisterAdminForm'
import GetAllFlights from './components/flights/getAllFlights'
import GetAllCountries from './components/countries/GetAllCountries'
import RegisterAirlineForm from './components/forms/RegisterAirlineForm'
import AddFlightForm from './components/forms/AddFlightForm'

import { isLoggedIn } from './components/utils'
import getUserData from './api/base/getUserData'

import { useStoreActions } from 'easy-peasy'
import { useEffect } from 'react'

const App = () => {

  const setUserData = useStoreActions((actions) => actions.user.setUserData)


  useEffect(()=>{
    if ( isLoggedIn ){
      getUserData().then((response) => {
        console.debug('Got User details:', response)
  
        setUserData(response)
      })
    }
  },[])

  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route path="/register-customer" element={<RegisterCustomerForm />} />

          <Route path="/register-airline" element={<RegisterAirlineForm />} />

          <Route path="/register-admin" element={<RegisterAdminForm />} />

          <Route path="/add-flight" element={<AddFlightForm />} />

          <Route path="/all-flights" element={<GetAllFlights />} />

          <Route path="/all-countries" element={<GetAllCountries />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
