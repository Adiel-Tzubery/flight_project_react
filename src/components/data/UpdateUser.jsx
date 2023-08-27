// global state
import { useStoreState, useStoreActions } from 'easy-peasy';

// hook
import { useEffect } from 'react';

// api
import getUserData from '../../api/base/getUserData';

// data
import UpdateCustomer from '../customers/UpdateCustomer';
import UpdateAirline from '../airlines/UpdateAirline';

// utils
import { isLoggedIn } from '../utils';

// css
import Spinner from '../Spinner';

const UpdateUser = () => {
  const setUserData = useStoreActions((actions) => actions.user.setUserData);
  const userData = useStoreState((state) => state?.user?.data || null);
  useEffect(() => {
    if (isLoggedIn()) {
      getUserData()
        .then((response) => {
          console.debug('Got User details:', response);
          setUserData(response);
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsLoading(false);
        });
    }
  }, []);
  return !userData ? (
    <Spinner />
  ) : userData.role_name === 'customer' ? (
    <UpdateCustomer userData={userData} />
  ) : userData.role_name === 'airline company' ? (
    <UpdateAirline userData={userData} />
  ) : (
    <h1>Some day we'll update the admin</h1>
  );
};

export default UpdateUser;
