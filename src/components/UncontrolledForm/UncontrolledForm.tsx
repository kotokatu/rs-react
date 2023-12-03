import { useAppDispatch } from '../../hooks/hooks';
import { useRef, useState } from 'react';
import { updateHistory } from '../../features/mainSlice';
import { useNavigate } from 'react-router-dom';
import { getYupErrorObject, ErrorObject } from '../../utils/helpers';
import { convertToBase64 } from '../../utils/helpers';
import { ValidationError } from 'yup';
import CustomAutocomplete from '../CustomAutocomplete/CustomAutocomplete';
import type { FormFields } from '../../features/mainSlice';
import { schema } from '../../utils/validationSchema';

const UncontrolledForm = () => {
  const [validationErrors, setValidationErrors] = useState<ErrorObject>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const tcRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getFormData = async () => {
    return {
      name: nameRef.current?.value,
      age: ageRef.current?.value ? +ageRef.current?.value : undefined,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      email: emailRef.current?.value,
      gender: genderRef.current?.value,
      tc: tcRef.current?.checked,
      image: imageRef.current?.files,
      country: countryRef.current?.value,
    };
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form
        autoComplete="off"
        className="form-container"
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await getFormData();
          try {
            await schema.validate(data, { abortEarly: false });
            const file = imageRef.current?.files as FileList;
            const base64 = await convertToBase64(file[0]);
            dispatch(updateHistory({ ...data, image: base64 } as FormFields));
            navigate('/');
          } catch (err) {
            if (err instanceof ValidationError) {
              const errors = getYupErrorObject(err);
              setValidationErrors(errors);
            }
          }
        }}
      >
        <div className="input-container input-container__name">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameRef} />
          <p className="error">{validationErrors?.name?.[0]}</p>
        </div>
        <div className="input-container input-container__age">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" ref={ageRef} />
          <p className="error">{validationErrors?.age?.[0]}</p>
        </div>
        <div className="input-container input-container__email">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" ref={emailRef} />
          <p className="error">{validationErrors?.email?.[0]}</p>
        </div>
        <div className="input-container input-container__password">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
          <ul className="error-list__password">
            {!!validationErrors.password &&
              validationErrors?.password.map((message) => {
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
            ref={confirmPasswordRef}
          />
          <p className="error">{validationErrors?.confirmPassword?.[0]}</p>
        </div>
        <div className="input-container input-container__gender">
          <label htmlFor="gender">Gender</label>
          <select defaultValue="" id="gender" ref={genderRef}>
            <option disabled hidden value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="error">{validationErrors?.gender?.[0]}</p>
        </div>
        <CustomAutocomplete ref={countryRef} />
        <p className="error">{validationErrors?.country}</p>
        <div className="input-container input-container__image">
          <label htmlFor="image">Upload image</label>
          <input type="file" id="image" ref={imageRef} />
          <p className="error">{validationErrors?.image?.[0]}</p>
        </div>
        <div className="input-container input-container__tc">
          <div className="input-container__tc-wrapper">
            <input type="checkbox" id="termsAndConditions" ref={tcRef} />
            <label htmlFor="termsAndConditions">
              I accept terms and conditions
            </label>
          </div>
          <p className="error">{validationErrors?.tc?.[0]}</p>
        </div>
        <input className="button-submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

export default UncontrolledForm;
