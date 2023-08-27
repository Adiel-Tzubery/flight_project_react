// global state
import { useStoreState } from 'easy-peasy';

import { ToastContainer, toast } from 'react-toastify';
// css
import Spinner from '../Spinner';

// api
import removeCustomer from '../../api/administrator/remove/removeCustomer';

const CustomerData = ({ customer, onCustomerDeleted }) => {
  const userData = useStoreState((state) => state?.user?.data || null);

  const deleteOnClickHandler = (event) => {
    const props = {
      customerId: event.target.value,
    };
    removeCustomer(props)
      .then(async (response) => {
        toast.success('🙁 Customer deleted!', {
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
        onCustomerDeleted(customer);
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
      {!userData ? (
        <Spinner />
      ) : (
        <tr>
          {Object.values(customer).map((value, index) => (
            <td
              key={index}
              className={
                index % 2 !== 0
                  ? 'text-center text-dark font-medium text-base  px-6 bg-white border-b border-[#E8E8E8]'
                  : 'text-center text-dark font-medium text-base  px-6 bg-[#F3F6FF] border-b border-[#E8E8E8]'
              }
            >
              {value}
            </td>
          ))}
          <td>
            <ToastContainer />
            {userData.role_name === 'administrator' ? (
              <button
                onClick={deleteOnClickHandler}
                value={customer.customer_number}
                type="button"
                className="text-white bg-gradient-to-r from-red-300 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-500 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center ml-1 mb-1 flex justify-end"
              >
                Delete
              </button>
            ) : null}
          </td>
        </tr>
      )}
    </>
  );
};
export default CustomerData;
