import { ErrorMessage, useField } from 'formik'

export const Input = ({ name, label, ...props }) => {
  const [field, meta] = useField(name)
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input
        {...field}
        {...props}
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-xs text-red-500"
      />
    </div>
  );
};
