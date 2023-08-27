// hooks
import { useState, useEffect } from 'react';

// router
import { useNavigate } from 'react-router';

// api
import getFlightById from '../../api/base/flight/getFlightById';
import removeTicket from '../../api/customer/removeTicket';

// css
import Spinner from '../Spinner';
import { toast, ToastContainer } from 'react-toastify';

const TicketData = ({ ticket }) => {
  const [flight, setFlight] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getFlightById({ flightId: ticket.flight })
      .then((response) => {
        console.debug('Get flight:', response);
        setFlight(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching flights:', error);
        setIsLoading(false);
      });
  }, [ticket]);

  // cancel ticket
  const deleteOnClickHandler = (event) => {
    removeTicket({ ticketId: event.target.value })
      .then(async (response) => {
        toast.success('🙁 ticket returned!', {
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
        alert('Ticket returned successfully!');
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

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <tr>
          <td className="text-center text-dark font-medium text-base  px-6 bg-[#F3F6FF] border-b border-[#E8E8E8]">
            {ticket.id}
          </td>
          <td className="text-center text-dark font-medium text-base  px-6 bg-white border-b border-[#E8E8E8]">
            {flight.airline_company}
          </td>
          <td className="text-center text-dark font-medium text-base  px-6 bg-[#F3F6FF] border-b border-[#E8E8E8]">
            {flight.origin_country}
          </td>
          <td className="text-center text-dark font-medium text-base  px-6 bg-white border-b border-[#E8E8E8]">
            {flight.destination_country}
          </td>
          <td className="text-center text-dark font-medium text-base  px-6 bg-[#F3F6FF] border-b border-[#E8E8E8]">
            {flight.departure_time}
          </td>
          <td>
            <ToastContainer />
            <button
              onClick={deleteOnClickHandler}
              value={ticket.id}
              type="button"
              className="text-white bg-gradient-to-r from-red-300 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-500 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center ml-1 mb-1 flex justify-end"
            >
              Cancel Order
            </button>
          </td>
        </tr>
      )}
    </>
  );
};
export default TicketData;
