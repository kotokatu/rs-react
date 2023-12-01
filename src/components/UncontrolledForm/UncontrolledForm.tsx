import { useAppDispatch } from '../../hooks/hooks';
import { useRef } from 'react';
import { updateValues } from '../../features/mainSlice';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../Autocomplete/Autocomplete';
const UncontrolledForm = () => {
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
  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            updateValues({
              name: nameRef.current?.value || '',
              age: ageRef.current?.value || '',
              password: passwordRef.current?.value || '',
              confirmPassword: confirmPasswordRef.current?.value || '',
              email: emailRef.current?.value || '',
              gender: genderRef.current?.value || '',
              tc: tcRef.current?.checked || false,
              image: imageRef.current?.value || '',
              country: countryRef.current?.value || '',
            })
          );
          navigate('/');
        }}
      >
        <div className="input-container input-container__name">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameRef} />
        </div>
        <div className="input-container input-container__age">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" ref={ageRef} />
        </div>
        <div className="input-container input-container__email">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div className="input-container input-container__password">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        <div className="input-container input-container__confirm-password">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
          />
        </div>
        <div className="input-container input-container__gender">
          <label htmlFor="gender">Gender</label>
          <select defaultValue="default" id="gender" ref={genderRef}>
            <option disabled hidden value="default">
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <Autocomplete ref={countryRef} />
        <div className="input-container input-container__image">
          <label htmlFor="image">Upload image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="input-container input-container__tc">
          <input type="checkbox" id="termsAndConditions" ref={tcRef} />
          <label htmlFor="termsAndConditions">
            I accept terms and conditions
          </label>
        </div>
        <input className="button-submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

export default UncontrolledForm;
