import { useState, forwardRef } from 'react';
import { Ref } from 'react';
import { COUNTRIES_LIST } from '../../features/countriesSlice';

const Autocomplete = forwardRef((_, ref: Ref<HTMLInputElement>) => {
  const [value, setValue] = useState('');
  const [showList, setShowList] = useState(false);
  const filteredCountries = COUNTRIES_LIST.filter((country) =>
    country.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <div className="input-container input-container__country">
      <label htmlFor="country">Select country</label>
      <input
        type="text"
        ref={ref}
        value={value}
        placeholder="Choose country..."
        id="country"
        name="countries"
        autoComplete="off"
        onInput={(e) => {
          setShowList(true);
          if (e.target instanceof HTMLInputElement) setValue(e.target.value);
        }}
      />

      <ul id="countries" className={`countries-list ${showList ? 'show' : ''}`}>
        {filteredCountries.map((country) => {
          return (
            <li
              key={country}
              onClick={(e) => {
                if (
                  e.target instanceof HTMLLIElement &&
                  typeof e.target.textContent === 'string'
                ) {
                  setValue(e.target.textContent);
                  setShowList(false);
                }
              }}
            >
              {country}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Autocomplete;
