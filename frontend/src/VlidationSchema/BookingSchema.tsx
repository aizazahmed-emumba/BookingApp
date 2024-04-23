import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  numberOfAdults: yup
    .number()
    .integer()
    .min(0, "Must be 0 or postitive integer")
    .required(),
  numberOfChildren: yup
    .number()
    .integer()
    .min(0, "Must be 0 or postitive integer")
    .required(),
  paymentMethod: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
});

export default schema;
