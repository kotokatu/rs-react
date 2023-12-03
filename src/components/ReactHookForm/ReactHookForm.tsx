import { useAppDispatch } from '../../hooks/hooks';
import { updateHistory } from '../../features/mainSlice';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { convertToBase64 } from '../../utils/helpers';
import CustomAutocomplete from '../CustomAutocomplete/CustomAutocomplete';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/validationSchema';

export type FieldData = yup.InferType<typeof schema>;
const FormWithReactHookForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<FieldData>({
    resolver: yupResolver<FieldData>(schema, { abortEarly: false }),
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FieldData> = async (data) => {
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
          <p className="error">{errors.name?.message}</p>
        </div>
        <div className="input-container input-container__age">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" {...register('age')} />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="input-container input-container__email">
          <label htmlFor="email">Email</label>
          <input id="email" {...register('email')} />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="input-container input-container__password">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register('password')} />
          <ul className="error-list__password">
            <li className="error__password">{errors.password?.message}</li>
            {Array.isArray(errors.password?.types?.matches) &&
              errors.password?.types?.matches.map((message) => {
                return (
                  <li className="error__password" key={message}>
                    {message}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="input-container input-container__confirm-password">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          <p className="error">{errors.confirmPassword?.message}</p>
        </div>
        <div className="input-container input-container__gender">
          <label htmlFor="gender">Gender</label>
          <select defaultValue="" id="gender" {...register('gender')}>
            <option disabled hidden value="" />
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="error">{errors.gender?.message}</p>
        </div>
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange } }) => (
            <CustomAutocomplete onChange={onChange} setValue={setValue} />
          )}
        />
        {errors.country?.message && (
          <p className="error">{errors.country?.message}</p>
        )}
        <div className="input-container input-container__image">
          <label htmlFor="image">Upload image</label>
          <input type="file" id="image" {...register('image')} />
          <p className="error">{errors.image?.message}</p>
        </div>
        <div className="input-container input-container__tc">
          <div className="input-container__tc-wrapper">
            <input
              type="checkbox"
              id="termsAndConditions"
              {...register('tc')}
            />
            <label htmlFor="termsAndConditions">
              I accept terms and conditions
            </label>
          </div>
          <p className="error">{errors.tc?.message}</p>
        </div>
        <input
          className="button-submit"
          type="submit"
          value="Submit"
          disabled={!isValid}
        />
      </form>
    </>
  );
};

export default FormWithReactHookForm;
