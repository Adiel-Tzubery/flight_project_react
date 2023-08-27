// data
import GetAllCustomers from '../customers/GetAllCustomers';
import GetAllAirlines from '../airlines/GetAllAirlines';

// css
import { Card } from '@material-tailwind/react';

// router
import { useNavigate } from 'react-router';

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center mt-16">
        <Card
          color="white"
          className="rounded-3xl p-3 sm:w-[200px]"
          shadow={true}
        >
          <div className="grid place-items-center">
            {' '}
            {/* Center the content both horizontally and vertically */}
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-600 to-green-600 text-center hover:bg-gradient-to-br focus:ring-4 py-2 focus:outline-none focus:ring-green-500 dark:focus:ring-green-800 font-semibold rounded-lg text-m ml-1 mb-1 items-center sm:w-[125px]"
              onClick={() => {
                navigate('/register-admin');
              }}
              type="button"
            >
              Add admin
            </button>
          </div>
        </Card>
      </div>

      <GetAllAirlines />
      <GetAllCustomers />
    </>
  );
};
export default AdminPage;
