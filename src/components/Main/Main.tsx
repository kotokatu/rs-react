import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
const Main = () => {
  const { name, age, password, confirmPassword, tc, gender, image, country } =
    useAppSelector((state) => state.main);
  return (
    <main className="main">
      <nav className="navigation">
        <Link to="uncontrolled">Uncontrolled Form</Link>
        <Link to="controlled">React Hook Form</Link>
      </nav>
      <div>{name}</div>
      <div>{age}</div>
      <div>{password}</div>
      <div>{confirmPassword}</div>
      <div>{tc ? 'T&C accepted' : 'T&C not accepted'}</div>
      <div>{gender}</div>
      <div>{image}</div>
      <div>{country}</div>
    </main>
  );
};

export default Main;
