//  global state
import { useStoreState } from 'easy-peasy';

// data
import GetCustomerTickets from '../customers/GetCustomerTickets';

const UserData = () => {
  const userInfo = useStoreState((state) => state?.user?.data || null);

  if (!userInfo || Object.keys(userInfo).length === 0) {
    return <p>No user data available.</p>;
  }

  return (
    <>
      <div className="mt-12 mx-2 flex flex-row items-center justify-center">
        <div className="bg-white flex flex-row overflow-hidden shadow rounded-[40px] border w-5/11">
          <div className="flex flex-col px-4 py-5 sm:px-6 mr-5">
            {userInfo &&
              (userInfo?.profile_pic ===
              '/images/defaults/default_user_piq.jpeg' ? (
                <img
                  className="w-12 rounded-xl"
                  src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${userInfo.username}`}
                />
              ) : (
                <img
                  src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${userInfo.username}`}
                />
              ))}
            <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900 capitalize">
              {userInfo.first_name} {userInfo.last_name}
            </h3>
            <p className="text-gray-500 text-sm">{userInfo.email}</p>
          </div>
          <div className="grid grid-cols-1 w-fit">
            {Object.entries(userInfo).map(([key, value]) => {
              return (
                key !== 'first_name' &&
                key !== 'last_name' &&
                key !== 'id' &&
                key !== 'profile_pic' &&
                key !== 'email' && (
                  <div key={key} className="border-t border-gray-200">
                    <dl>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace('_', ' ')}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                          {value}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex h-[400px] flex-row items-center justify-center">
        {/* if user is customer, display his tickets data */}
        {userInfo?.role_name === 'customer' ? (
          <>
            <GetCustomerTickets customerId={userInfo.customer_id} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default UserData;
