// hooks
import { useState, useEffect } from 'react';

// css
import Spinner from '../Spinner';
import { Card, Typography } from '@material-tailwind/react';

// router
import { useNavigate } from 'react-router';

// data
import CustomerData from '../data/CustomerData';

// api
import getAllCustomers from '../../api/administrator/getAllCustomers';

const GetAllCustomers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCustomers()
      .then((response) => {
        console.debug('Got Customers:', response);
        setCustomers(response);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCustomerDeletion = (deletedCustomer) => {
    // update the customers state in case of deletion
    setCustomers((prevCustomer) =>
      prevCustomer.filter((customer) => customer !== deletedCustomer)
    );
  };

  return (
    <div className="flex justify-center items-center h-[300px]">
      <Card color="white" className="rounded-3xl p-8" shadow={true}>
        <Typography variant="h3" className="text-left mb-4 text-gray-700">
          All Customers:
        </Typography>
        <button
          className="text-white bg-gradient-to-r from-green-400 via-green-600 to-green-600 text-center hover:bg-gradient-to-br focus:ring-4 py-2 focus:outline-none focus:ring-green-500 dark:focus:ring-green-800 font-semibold rounded-lg text-m px-5 py-4.5  ml-1 mb-1 items-center sm:w-[680px]"
          onClick={() => {
            navigate('/admin-register-customer');
          }}
          type="button"
        >
          Add New
        </button>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {customers.length === 0 ? (
              <Typography
                variant="h3"
                className="text-center text-3xl font-bold mb-4 mt-10 text-gray-600"
              >
                No customer found
              </Typography>
            ) : (
              <table>
                <thead className="text-center">
                  <tr className="bg-primary text-center">
                    {Object.keys(customers[0]).map((key) => (
                      <th
                        key={key}
                        className="w-1/10 min-w-[70px] capitalize text-base font-semibold text-white lg:py-2 px-1 lg:px-5 border-l border-transparent bg-blue-600"
                      >
                        {key.replace('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <CustomerData
                      key={customer.customer_number}
                      customer={customer}
                      onCustomerDeleted={handleCustomerDeletion}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
export default GetAllCustomers;
