import getAllFlights from '../../api/base/flight/getAllFlights'

const GetAllFlights = async () => {

    // get the flights
    const flights = await getAllFlights()
  return (
    <>
    {flights.map((flight)=>{
        return <p>{flight.origin_country}</p>
    })}
    </>
  )
}
export default GetAllFlights