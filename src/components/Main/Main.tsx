import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { v4 as uuidv4 } from 'uuid';

const Main = () => {
  const { history } = useAppSelector((state) => state.main);
  return (
    <main className="main">
      <nav className="navigation">
        <Link to="uncontrolled">Uncontrolled Form</Link>
        <Link to="with-react-hook-form">Form with React Hook Form</Link>
      </nav>
      {history.map((item, index) => {
        return (
          item && (
            <div
              className={`output-container ${index === 0 ? 'blink' : ''}`}
              key={uuidv4()}
            >
              <div className="output-name">Name: {item.name}</div>
              <div className="output-age">Age: {item.age.toString()}</div>
              <div className="output-email">Email: {item.email}</div>
              <div className="output-password">Password: {item.password}</div>
              <div className="output-gender">Gender: {item.gender}</div>
              <div className="output-country">Country: {item.country}</div>
              <div className="output-tc">
                Terms & Conditions: {item.tc ? 'accepted' : 'not accepted'}
              </div>
              <div className="output-image">
                {typeof item.image === 'string' && <img src={item.image} />}
              </div>
            </div>
          )
        );
      })}
    </main>
  );
};

export default Main;
