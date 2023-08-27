// utils
import { isLoggedIn } from '../utils';

// global state
import { useStoreActions, useStoreState } from 'easy-peasy';

// router
import { useNavigate } from 'react-router';

// hook
import { useEffect } from 'react';

// api
import getUserData from '../../api/base/getUserData';

// data
import AdminPage from './AdminPage';

const HomePage = () => {
  const navigate = useNavigate();
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
    } else {
      return navigate('/all-flights');
    }
  }, []);

  return (
    <>
      {!userData ? (
        navigate('/all-flights')
      ) : userData.role_name === 'customer' ? (
        navigate('/customer')
      ) : userData.role_name === 'airline company' ? (
        navigate('/airline')
      ) : userData.role_name === 'administrator' ? (
        <AdminPage />
      ) : null}
    </>
  );
};
export default HomePage;
