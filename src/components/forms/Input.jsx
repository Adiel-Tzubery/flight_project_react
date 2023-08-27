import { ErrorMessage, useField } from 'formik'
import { Input as MaterialInput } from '@material-tailwind/react'

const Input = ({ name, label, ...props }) => {
  const [field, meta] = useField(name)
  return (
    <div>
      <MaterialInput
        size="lg"
        label={label}
        {...field}
        {...props}
        placeholder=""
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-xs text-red-500"
      />
    </div>
  )
}

export default Input
