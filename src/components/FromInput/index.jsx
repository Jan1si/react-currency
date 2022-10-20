import React from 'react';
import { useState, useContext } from 'react';
import { ValueContext } from '../../App';

export const FromInput = ({ сurrencyData, currency, setCurrency, changeValue }) => {
  const { valueInput } = useContext(ValueContext);
  // console.log(currency);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="input__group from_input">
      <input onChange={changeValue} type="text" value={valueInput} />
      <div onClick={() => setIsOpen((prev) => !prev)} className="input__dropdown from_currency">
        <div className="current__value">
          <span>{currency.code}</span>
          <img className={`${isOpen ? 'arrow_active' : null}`} src="./img/arrow.svg" alt="" />
        </div>
        <div className={`dropdown__menu menu__from ${isOpen ? 'dropdown__menu_active' : null}`}>
          <ul>
            {сurrencyData.map((item) => (
              <li
                onClick={() => setCurrency({ code: item.CharCode, value: item.Value })}
                key={item.CharCode}>
                <p className="currency__code">{item.CharCode}</p>
                <p className="currency__name">{item.Name}</p>
                <p className="currency__name">{item.Value.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
