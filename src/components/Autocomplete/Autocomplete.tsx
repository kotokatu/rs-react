import { forwardRef } from 'react';
import { Ref } from 'react';
import { COUNTRIES_LIST } from '../../features/countriesSlice';

const Autocomplete = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ onChange }, ref: Ref<HTMLInputElement>) => {
  return (
    <div className="input-container input-container__country">
      <label htmlFor="country">Select country</label>
      <input
        ref={ref}
        placeholder="Choose country..."
        id="country"
        list="countries"
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
      />

      <datalist id="countries" className={`countries-list`}>
        {COUNTRIES_LIST.map((country) => {
          return (
            <option key={country} value={country}>
              {country}
            </option>
          );
        })}
      </datalist>
    </div>
  );
});

export default Autocomplete;
