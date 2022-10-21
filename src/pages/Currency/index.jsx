import React from 'react';
import { useContext, useState } from 'react';
import { ValueContext } from '../../App';

export const Currency = () => {
  const { currencyData, indexUsd, indexEur, indexDefault, setIndexDefault } =
    useContext(ValueContext);

  return (
    <div className="content">
      <h2 className="title">Курсы валют</h2>
      <div className="currency__block">
        <ul className="list__currency">
          <li
            className={`${indexDefault[0]?.CharCode === 'RUB' ? '_active' : null}`}
            onClick={() => setIndexDefault([])}
            key={'RUB'}>
            <div className="currency__text">
              <p className="currency__code">RUB</p>
              <p className="currency__name">Российский рубль</p>
            </div>
          </li>
          {currencyData.map((item) => (
            <li
              className={`${indexDefault[0]?.CharCode === item?.CharCode ? '_active' : null}`}
              onClick={() => setIndexDefault([item])}
              key={item.CharCode}>
              <div className="currency__text">
                <p className="currency__code">{item.CharCode}</p>
                <p className="currency__name">{item.Name}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="index__currency">
          <div className="index__item">
            <h1>
              {indexDefault.length === 0
                ? indexUsd.toFixed(2)
                : (indexDefault[0]?.Value / indexDefault[0]?.Nominal / indexUsd).toFixed(4)}{' '}
              USD
            </h1>
            <img
              src={`${
                indexUsd && indexUsd > indexUsd.Previous ? './img/up.svg' : './img/down.svg'
              }`}
              alt=""
            />
          </div>
          <div className="index__item">
            <h1>
              {indexDefault.length === 0
                ? indexEur.toFixed(2)
                : (indexDefault[0]?.Value / indexDefault[0]?.Nominal / indexEur).toFixed(4)}{' '}
              EUR
            </h1>
            <img
              src={`${
                indexEur && indexEur > indexEur.Previous ? './img/up.svg' : './img/down.svg'
              }`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
