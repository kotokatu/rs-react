import { useAppDispatch } from '../../hooks/hooks';
import { updateHistory } from '../../features/mainSlice';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { convertToBase64 } from '../../helpers/helpers';
import Autocomplete from '../Autocomplete/Autocomplete';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const VALID_FILE_TYPES = ['image/png', 'image/jpeg'];
const VALID_FILE_SIZE = 102400;

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Name is required'),
    age: yup.string().required('Age is required'),
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().required('Password confirmation is required'),
    gender: yup.string().required('Gender is required'),
    country: yup.string().required('Country is required'),
    image: yup
      .mixed()
      .required('Image is required')
      .test('is-valid-type', 'Not a valid image type', (value) => {
        return (
          value instanceof FileList &&
          value[0] &&
          VALID_FILE_TYPES.includes(value[0].type)
        );
      })
      .test(
        'is-valid-size',
        'Max allowed size is 100KB',
        (value) => value instanceof FileList && value[0].size <= VALID_FILE_SIZE
      ),
    tc: yup.boolean().required('Please accept the Terms & Conditions'),
  })
  .required();

type FormFields = yup.InferType<typeof schema>;
const ReactHookForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver<FormFields>(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const file = getValues().image as FileList;
    const base64 = await convertToBase64(file[0]);
    dispatch(updateHistory({ ...data, image: base64 }));
    navigate('/');
  };

  return (
    <>
      <h1>React Hook Form</h1>
      <form
        autoComplete="off"
        className="form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-container input-container__name">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register('name')} />
          {errors.name?.message && <p>{errors.name?.message}</p>}
        </div>
        <div className="input-container input-container__age">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" {...register('age')} />
          {errors.age?.message && <p>{errors.age?.message}</p>}
        </div>
        <div className="input-container input-container__email">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email')} />
          {errors.email?.message && <p>{errors.email?.message}</p>}
        </div>
        <div className="input-container input-container__password">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register('password')} />
          {errors.password?.message && <p>{errors.password?.message}</p>}
        </div>
        <div className="input-container input-container__confirm-password">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword?.message && (
            <p>{errors.confirmPassword?.message}</p>
          )}
        </div>
        <div className="input-container input-container__gender">
          <label htmlFor="gender">Gender</label>
          <select defaultValue="default" id="gender" {...register('gender')}>
            <option disabled hidden value="default">
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender?.message && <p>{errors.gender?.message}</p>}
        </div>
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, value } }) => (
            <Autocomplete onChange={onChange} value={value} />
          )}
        />
        {errors.country?.message && <p>{errors.country?.message}</p>}
        <div className="input-container input-container__image">
          <label htmlFor="image">Upload image</label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            {...register('image')}
          />
          {errors.image?.message && <p>{errors.image?.message}</p>}
        </div>
        <div className="input-container input-container__tc">
          <input type="checkbox" id="termsAndConditions" {...register('tc')} />
          <label htmlFor="termsAndConditions">
            I accept terms and conditions
          </label>
          {errors.tc?.message && <p>{errors.tc?.message}</p>}
        </div>
        <input className="button-submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

export default ReactHookForm;
