// global state
import { useStoreActions } from 'easy-peasy';

// hooks
import { useEffect, useState } from 'react';

// routers
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components for creating routers
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import CustomerPage from './components/pages/CustomerPage';
import AirlinePage from './components/pages/AirlinePage';
import AboutPage from './components/pages/AboutPage';
import LoginForm from './components/forms/LoginForm';
import UserData from './components/data/UserData';
import CustomerData from './components/data/CustomerData';
import FlightData from './components/data/FlightData';
import AirlineData from './components/data/AirlineData';
import AdminRegisterCustomerForm from './components/forms/AdminRegisterCustomerForm';
import RegisterCustomerForm from './components/forms/RegisterCustomerForm';
import RegisterAdminForm from './components/forms/RegisterAdminForm';
import RegisterAirlineForm from './components/forms/RegisterAirlineForm';
import GetAllFlights from './components/flights/GetAllFlights';
import GetAllAirlines from './components/airlines/GetAllAirlines';
import GetAirlineFlights from './components/airlines/GetAirlineFlights';
import GetAllCustomers from './components/customers/GetAllCustomers';
import AddFlightForm from './components/forms/AddFlightForm';
import UpdateFlight from './components/airlines/UpdateFlight';
import UpdateUser from './components/data/UpdateUser';

// utils
import { isLoggedIn } from './components/utils';

// data
import getUserData from './api/base/getUserData';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const setUserData = useStoreActions((actions) => actions.user.setUserData);

  useEffect(() => {
    if (isLoggedIn()) {
      getUserData().then((response) => {
        console.debug('Got User details:', response);
        setUserData(response);
        setLoggedIn(true); // after successful login
      });
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route
            path="/login"
            element={<LoginForm setLoggedIn={setLoggedIn} />}
          />

          <Route path="/" element={<HomePage />} />

          <Route path="/customer" element={<CustomerPage />} />

          <Route path="/airline" element={<AirlinePage />} />

          <Route path="/user-data" element={<UserData />} />

          <Route path="/customer-data" element={<CustomerData />} />

          <Route path="/airline-data" element={<AirlineData />} />

          <Route path="/flight" element={<FlightData />} />

          <Route path="/airline-flights" element={<GetAirlineFlights />} />

          <Route path="/all-flights" element={<GetAllFlights />} />

          <Route path="/all-airlines" element={<GetAllAirlines />} />

          <Route path="/all-customers" element={<GetAllCustomers />} />

          <Route
            path="/admin-register-customer"
            element={<AdminRegisterCustomerForm />}
          />

          <Route path="/register-customer" element={<RegisterCustomerForm />} />

          <Route path="/register-airline" element={<RegisterAirlineForm />} />

          <Route path="/register-admin" element={<RegisterAdminForm />} />

          <Route path="/add-flight" element={<AddFlightForm />} />

          <Route path="/update-flight" element={<UpdateFlight />} />

          <Route path="/update-user" element={<UpdateUser />} />

          <Route path="/about-us" element={<AboutPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
