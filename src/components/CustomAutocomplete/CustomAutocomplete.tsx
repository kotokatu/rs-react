import { useState, forwardRef } from 'react';
import { Ref } from 'react';
import { COUNTRIES_LIST } from '../../features/countriesSlice';

const Autocomplete = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ onChange, value }, ref: Ref<HTMLInputElement>) => {
  const [innerValue, setInnerValue] = useState<string>('');
  const [showList, setShowList] = useState(false);
  const filteredCountries = COUNTRIES_LIST.filter((country) =>
    country.toLowerCase().includes(innerValue.toLowerCase())
  );
  return (
    <div className="input-container input-container__country">
      <label htmlFor="country">Select country</label>
      <input
        type="text"
        ref={ref}
        value={innerValue}
        placeholder="Choose country..."
        id="country"
        name="countries"
        autoComplete="off"
        onInput={(e) => {
          setShowList(true);
          if (e.target instanceof HTMLInputElement)
            setInnerValue(e.target.value);
        }}
        onChange={(e) => {
          if (onChange) onChange(e);
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
                  setInnerValue(e.target.textContent);
                  if (value) value = innerValue;
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
