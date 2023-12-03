import { useState, forwardRef } from 'react';
import { COUNTRIES_LIST } from '../../features/countriesSlice';
import { UseFormSetValue } from 'react-hook-form';
import { FieldData } from '../ReactHookForm/ReactHookForm';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface AutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue?: UseFormSetValue<FieldData>;
}

const CustomAutocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ onChange, setValue }, ref) => {
    const [innerValue, setInnerValue] = useState('');
    const [showList, setShowList] = useState(false);
    const outsideClickRef = useOutsideClick(() => setShowList(false));

    const filteredCountries = COUNTRIES_LIST.filter((country) =>
      country.toLowerCase().includes(innerValue.toLowerCase())
    );

    return (
      <div
        className="input-container input-container__country"
        ref={outsideClickRef}
      >
        <label htmlFor="country">Country</label>
        <input
          type="text"
          ref={ref}
          value={innerValue}
          onFocus={() => setShowList(true)}
          onChange={(e) => {
            setShowList(true);
            if (e.target instanceof HTMLInputElement)
              setInnerValue(e.target.value);
            if (onChange) onChange(e);
          }}
        />

        <ul className={`countries-list ${showList && 'show'}`}>
          {filteredCountries.map((country) => {
            return (
              <li
                key={country}
                onClick={(e) => {
                  if (
                    e.target instanceof HTMLLIElement &&
                    typeof e.target.textContent === 'string'
                  ) {
                    if (setValue)
                      setValue('country', e.target.textContent, {
                        shouldValidate: true,
                        shouldTouch: true,
                        shouldDirty: true,
                      });
                    setInnerValue(e.target.textContent);
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
  }
);

export default CustomAutocomplete;
