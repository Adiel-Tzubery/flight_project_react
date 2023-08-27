// css
import { Card, Typography } from '@material-tailwind/react';

const AboutPage = () => {
  return (
    <>
      <div className="flex justify-left ml-72 items-center h-[350px]">
        <Card color="white" className="rounded-3xl p-8" shadow={true}>
          <Typography variant="h3" className="text-left mb-4 text-gray-700">
            About us:
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            ATravel is a company who seeks the best of the best for you, no
            matter if you are a customer or an airline company.
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            Our goal is to give you the best conditions, so you can just ease
            your mind and not worry about anything.
          </Typography>
          <br />
          <Typography color="gray" className="mt-1 font-medium">
            Here are the conditions:
          </Typography>
        </Card>
      </div>
      <div className="flex justify-left ml-72 items-center h-[250px]">
        <Card color="white" className="rounded-3xl p-8" shadow={true}>
          <Typography variant="h3" className="text-left mb-4 text-gray-700">
            Customer:
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; All you need to do, is just to make sure you buy the ticket
            before the flight take off and of-course, before the seats are all
            taken.
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; Here in ATravel, we are making our best for you. so we made
            sure that if you buy a ticket, the flight cannot be canceled.
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; As long as the flight didn't take off, you can cancel your
            purchase and get FULL refund without any small letters!
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; You. and only you, have the power to return your ticket. NO
            ONE has the power to cancel your flight besides you.
          </Typography>
        </Card>
      </div>
      <div className="flex justify-left ml-72 items-center h-[500px]">
        <Card color="white" className="rounded-3xl p-8" shadow={true}>
          <Typography variant="h3" className="text-left mb-4 text-gray-700">
            Airline company:
          </Typography>
          <Typography color="gray" className="mt-1 font-bold">
            If you want to work with us, here are some notes for you:
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; The BEST reason for you to work with us is that YOU ARE
            EXCLUSIVE! we work only with one company in every country
            <br />
            &nbsp;&nbsp;&nbsp; so you'll have ZERO competition.
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; You can only issue a flight from or to your base country.
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; You can only edit flight cost/number of available seats if
            the flight is yet to take off.
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; You can cancel a flight. but once a ticket is sold, the
            flight cannot be cancelled. our goal is to make our customers happy.
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; We recommend keeping all your flights data. but if you want,
            we allow to delete past flights from your database.
          </Typography>
          <Typography color="gray" className="mt-1 font-bold">
            Want to work with us? contact one of our administrators at:{' '}
            <a
              className="ml-2 text-blue-600"
              href="mailto:somemadeupmail@mail.com"
            >
              somemadeupmail@mail.com
            </a>
            ,
            <br />
            and we will welcome you to ATravel family, upon meeting our
            conditions.
          </Typography>
        </Card>
      </div>
      <div className="flex justify-left ml-72 items-center h-[300px]">
        <Card color="white" className="rounded-3xl p-8" shadow={true}>
          <Typography variant="h3" className="text-left mb-4 text-gray-700">
            Administrators:
          </Typography>
          <Typography color="gray" className="mt-1 font-bold">
            Some words to our administrators:
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; You have the ability to create all kind of accounts:
            customer/airline company/administrator.
          </Typography>
          <Typography color="gray" className="mt-1 font-medium">
            *&nbsp; When you decide to delete customer/airline account, make
            sure it doesn't contain active tickets/flights <br />
            &nbsp;&nbsp;&nbsp; otherwise you wont be able to complete the
            action.
          </Typography>
          <Typography color="gray" className="mt-1 font-bold">
            Be careful with your actions, you have grate responsibility.
          </Typography>
        </Card>
      </div>
    </>
  );
};
export default AboutPage;
