import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup
    .number()
    .integer("Price must be an integer")
    .positive("Price must be a positive number")
    .required(),
  duration: yup
    .number()
    .integer()
    .positive("Duration must be a positive number")
    .required(),
  start_date: yup.string().required(),
  end_date: yup.string().required(),
  description: yup.string().required(),
  file: yup.mixed().required(), // Update the validation for 'file' field
  facilities: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(),
      })
    )
    .required(),
});

export default schema;
