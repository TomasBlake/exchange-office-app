import * as yup from "yup";

export const formValidation = yup.object().shape({
    amountOfCzk: yup.number()
    .required('Amount is required')
    .positive('Amount must be a positive number')
    .test('is-decimal', 'Amount should have maximum 2 decimal places', (value) => {
      if (value === undefined) return true;
      const decimalPart = value.toString().split('.')[1];
      return !decimalPart || decimalPart.length <= 2;
    }),
      selectedCurrency: yup.string().required('Select currency is required')
  });