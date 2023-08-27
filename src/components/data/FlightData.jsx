// css
import Spinner from '../Spinner';
import { ToastContainer, toast } from 'react-toastify';

// global state
import { useStoreState } from 'easy-peasy';

// hooks
import { useState, useEffect } from 'react';

// api
import addTicket from '../../api/customer/addTicket';
import removeFlight from '../../api/airline/removeFlight';

// router
import { useNavigate } from 'react-router-dom';

const FlightData = ({ flight }) => {
  const userData = useStoreState((state) => state?.user?.data || null);
  const [flightState, setFlightState] = useState(flight);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  // first rendering
  useEffect(() => {
    setTimeout(() => {}, 2000);
  }, []);

  // for customer
  const ticketOnClickHandler = (event) => {
    const props = {
      customerId: userData.customer_id,
      flightId: parseInt(event.target.value),
    };
    addTicket(props)
      .then(async (response) => {
        toast.success('🥳 flight booked!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        console.debug('response: ', response);
        alert('Flight booked successfully!');
        navigate('/');
      })
      .catch((error) => {
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
        console.debug('error: ', error);
      });
  };

  // for airline company
  const editOnClickHandler = () => {
    const currentTime = new Date();
    const departureTime = new Date(flight.departure_time);

    // if flight has not departed yet
    if (departureTime > currentTime) {
      const selectedFlight = flightState;
      navigate('/update-flight', {
        state: { flight: selectedFlight },
      });
    } else {
      // Flight has already departed, display a message
      toast.error('Flight has already departed!', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const deleteOnClickHandler = (event) => {
    const props = {
      flightId: parseInt(event.target.value),
    };
    removeFlight(props)
      .then(async (response) => {
        toast.success('🙁 flight canceled!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        console.debug('response: ', response);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch((error) => {
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
        console.debug('error: ', error);
      });
  };

  return (
    <>
      {/* ensure that the component will render only when userData loaded */}
      {!loggedIn ? (
        <Spinner />
      ) : (
        <tr>
          {Object.values(flight).map((value, index) => (
            <td
              key={index}
              className={
                index % 2 !== 0
                  ? 'text-center text-dark font-medium text-base bg-white border-b border-[#E8E8E8]'
                  : 'text-center text-dark font-medium text-base bg-[#F3F6FF] border-b border-[#E8E8E8]'
              }
            >
              {value}
            </td>
          ))}
          <td>
            <ToastContainer />
            {userData === null ? (
              <button
                onClick={() => {
                  alert('You must login first to book a ticket');
                  return navigate('/login');
                }}
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-500 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-8 py-4.5 text-center ml-1 mb-1 flex justify-end"
              >
                Book
              </button>
            ) : userData?.role_name === 'customer' ? (
              <button
                onClick={ticketOnClickHandler}
                value={flight.id}
                type="button"
                className="text-white bg-gradient-to-r from-green-300 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-500 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-4.5 text-center ml-1 mb-1 flex justify-end"
              >
                Book
              </button>
            ) : userData?.role_name === 'airline company' ? (
              <div>
                <button
                  onClick={editOnClickHandler}
                  value={flight.id}
                  type="button"
                  className="text-white bg-gradient-to-r from-green-300 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-500 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-4.5 text-center ml-1 mb-1 flex justify-end"
                >
                  Edit
                </button>
                <button
                  onClick={deleteOnClickHandler}
                  value={flight.id}
                  type="button"
                  className="text-white bg-gradient-to-r from-red-300 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-500 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-4.5 text-center ml-1 mb-1 flex justify-end"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </td>
        </tr>
      )}
    </>
  );
};
export default FlightData;
