import getAllCountries from '../../api/base/country/getAllCountries'

const GetAllCountries = async () => {
  const countries = await getAllCountries()
  return (
    <>
      {countries.map((country) => {
        return <p>{JSON.stringify(country.name)}</p>
      })}
    </>
  )
}
export default GetAllCountries
