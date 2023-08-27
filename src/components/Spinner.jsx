import { Spinner as SpinnerCss } from '@material-tailwind/react'

const Spinner = () => {
  return (
    <div className="flex items-center my-12 justify-center">
      <SpinnerCss className="h-16 w-16 text-blue-500/10" />
    </div>
  )
}
export default Spinner
