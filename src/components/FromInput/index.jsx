import React from 'react';
import { useState, useContext } from 'react';
import { ValueContext } from '../../App';

export const FromInput = ({ changeValue, onKeyPress }) => {
  const { valueInput, setValueInput, currencyData, currency, setCurrency, setConverCurrency } =
    useContext(ValueContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="input__group from_input">
      <input onKeyPress={onKeyPress} onChange={changeValue} type="text" value={valueInput} />
      <div onClick={() => setIsOpen((prev) => !prev)} className="input__dropdown from_currency">
        <div className="current__value">
          <span>{currency.code}</span>
          <img className={`${isOpen ? 'arrow_active' : null}`} src="./img/arrow.svg" alt="arrow" />
        </div>
        <div className={`dropdown__menu menu__from ${isOpen ? 'dropdown__menu_active' : null}`}>
          <ul>
            {currencyData.map((item) => (
              <li
                className={`${currency.code === item.CharCode ? '_active' : null}`}
                onClick={() => {
                  setValueInput(0);
                  setConverCurrency(0);
                  setCurrency({ code: item.CharCode, value: item.Value / item.Nominal });
                }}
                key={item.CharCode}>
                <div className="currency__text">
                  <p className="currency__code">{item.CharCode}</p>
                  <p className="currency__name">{item.Name}</p>
                </div>
                <div className="currency__index">
                  <p className="price">{(item.Value / item.Nominal).toFixed(2)}</p>
                  <img
                    width={10}
                    height={10}
                    src={`${
                      item.Value / item.Nominal > item.Previous / item.Nominal
                        ? './img/up.svg'
                        : './img/down.svg'
                    }`}
                    alt="up or down"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
