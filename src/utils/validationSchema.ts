import * as yup from 'yup';
import {
  NAME_REGEX,
  EMAIL_REGEX,
  VALID_FILE_SIZE,
  VALID_FILE_TYPES,
} from '../constants/constants';
import { COUNTRIES_LIST } from '../features/countriesSlice';

export const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Name is required')
      .matches(NAME_REGEX, 'First letter should be uppercase'),
    age: yup
      .number()
      .nullable()
      .transform((value, original) => (original === '' ? null : value))
      .required('Age is required')
      .min(0, 'Age cannot be a negative number')
      .integer('Please enter a whole number'),
    email: yup
      .string()
      .required('Email is required')
      .email('Must be a valid email')
      .matches(EMAIL_REGEX, 'Must be a valid email'),
    password: yup
      .string()
      .required('Password cannot be empty')
      .matches(/.{8}/, 'Must contain 8 characters')
      .matches(/^(?=.*[a-z])/, 'Must contain a lowercase character')
      .matches(/^(?=.*[A-Z])/, 'Must contain an uppercase character')
      .matches(/^(?=.*[0-9])/, 'Must contain a number')
      .matches(/^(?=.*[!@#$%^&*])/, 'Must contain a special case character')
      .matches(/^\S*$/, 'Must not contain spaces'),
    confirmPassword: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup.string().required('Gender is required'),
    country: yup
      .string()
      .required('Enter a valid country')
      .oneOf(COUNTRIES_LIST, 'Enter a valid country'),
    image: yup
      .mixed()
      .required('Image is required')
      .test('is-valid-type', 'Only .png and .jpg(.jpeg) files', (value) => {
        return (
          value instanceof FileList &&
          value[0] &&
          VALID_FILE_TYPES.includes(value[0].type)
        );
      })
      .test(
        'is-valid-size',
        'Max allowed size is 100KB',
        (value) =>
          value instanceof FileList &&
          value[0] &&
          value[0].size <= VALID_FILE_SIZE
      ),
    tc: yup.boolean().required().isTrue('Please accept the Terms & Conditions'),
  })
  .required();
