import { Link } from 'react-router-dom';
const Main = () => {
  return (
    <div className="main">
      <section className="data-container data-container__uncontrolled">
        <Link to="uncontrolled">Uncontrolled Form</Link>
      </section>
      <section className="data-container data-container__controlled">
        <Link to="controlled">Controlled Form</Link>
      </section>
    </div>
  );
};

export default Main;
