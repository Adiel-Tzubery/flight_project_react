import { ErrorMessage, useField } from 'formik'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

const DateTimeProvider = ({ name, label, ...props }) => {
  const [field, meta] = useField(name)
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker {...field} {...props} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  )
}
export default DateTimeProvider
