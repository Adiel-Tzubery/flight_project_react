// hooks
import { useState, useEffect } from 'react';

// api
import getUserTickets from '../../api/customer/getUserTickets';

// data
import TicketData from '../data/TicketData';

// css
import Spinner from '../Spinner';
import { Card, Typography } from '@material-tailwind/react';

const GetCustomerTickets = ({ customerId }) => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserTickets({ customerId })
      .then((response) => {
        console.debug('Got tickets:', response);
        setTickets(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
        setIsLoading(false);
      });
  }, [customerId]);

  const ticketTableHeader = [
    'ticket number',
    'airline company',
    'from',
    'to',
    'departure time',
  ];

  return (
    <div className="flex justify-center items-center h-[400px]">
      <Card color="white" className="rounded-3xl p-8" shadow={true}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {tickets.length === 0 ? (
              <Typography
                variant="h3"
                className="text-center text-3xl font-bold mb-4 mt-10 text-gray-600"
              >
                User hasn't booked any flights
              </Typography>
            ) : (
              <>
                <Typography
                  variant="h3"
                  className="flex justify-left mb-3 text-gray-700"
                >
                  Tickets:
                </Typography>
                <table>
                  <thead className="text-center">
                    {/* display the table head first */}
                    <tr className="bg-primary text-center">
                      {ticketTableHeader.map((head) => (
                        <th
                          key={head}
                          className="w-1/6 min-w-[70px] text-lg font-semibold text-white lg:py-4 px-1 lg:px-5 border-l border-transparent bg-blue-600"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <TicketData key={ticket.id} ticket={ticket} />
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
export default GetCustomerTickets;
