import * as yup from 'yup';

const invoiceValidationSchema = yup.object().shape({
  payment_terms: yup.number().required(),
  due_date: yup.string().when('payment_terms', {
    is: 0,
    then: yup.string().required()
  }),
  line_items: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      quantity: yup.number().required(),
      unit_price: yup.number().required()
    })
  )
})

export default invoiceValidationSchema;
