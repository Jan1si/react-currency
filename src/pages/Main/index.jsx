import React from 'react';
import { useContext, useState } from 'react';
import { ValueContext } from '../../App';
import { FromInput } from '../../components/FromInput';
import { ToInput } from '../../components/ToInput';

export const Main = ({ onKeyPress, changeValue }) => {
  const { converCurrency, currencyData } = useContext(ValueContext);

  const [inputText, setInputText] = useState('');

  const calcFromText = (e) => {
    const valueSplit = {
      value: Number(e.target.value?.split(' ')[0]),
      fromCode: e.target.value?.split(' ')[1].toUpperCase(),
      toCode: e.target.value?.split(' ')[3].toUpperCase(),
    };

    if (valueSplit.toCode === 'RUB') {
      if (valueSplit.fromCode === 'RUB') {
        return setInputText(valueSplit.value);
      } else {
        const objFrom = currencyData.filter((item) => item.CharCode === valueSplit.fromCode);
        return setInputText(
          ((objFrom[0].Value / objFrom[0].Nominal) * valueSplit.value).toFixed(2),
        );
      }
    } else {
      if (valueSplit?.fromCode === 'RUB') {
        const objTo = currencyData.filter((item) => item.CharCode === valueSplit.toCode);
        return setInputText(valueSplit.value / (objTo[0].Value / objTo[0].Nominal).toFixed(2));
      } else {
        const objFrom = currencyData.filter((item) => item.CharCode === valueSplit.fromCode);
        const objTo = currencyData.filter((item) => item.CharCode === valueSplit.toCode);
        return setInputText(
          (((objFrom[0].Value / objFrom[0].Nominal) * valueSplit.value) / objTo[0].Value).toFixed(
            2,
          ),
        );
      }
    }
  };

  const test = (e) => {
    if (e.code === 'Enter') {
      calcFromText(e);
    }
  };

  return (
    <div className="content">
      <h2 className="title">Конвертировать валюту</h2>
      <div className="currency__block">
        <FromInput changeValue={(e) => changeValue(e)} onKeyPress={(e) => onKeyPress(e)} />
        <ToInput converCurrency={converCurrency} />
      </div>
      <h3 className="sub__title">
        Текстовый конвертатор <span>(пример. 10 usd in rub)</span>
      </h3>
      <input
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        onKeyPress={(e) => test(e)}
        className="input__calc"
        type="text"
      />
    </div>
  );
};
