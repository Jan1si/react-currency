import React from 'react';
import { useContext, useState } from 'react';
import { ValueContext } from '../../App';
import { FromInput } from '../../components/FromInput';
import { ToInput } from '../../components/ToInput';

export const Main = ({ onKeyPress, changeValue }) => {
  const { converCurrency, currencyData } = useContext(ValueContext);

  // TODO: Реализовать калькуляцию валюты
  const [textCurrency, setTextCurrency] = useState({ value: 0, fromCode: '', toCode: '' });
  const [textCalc, setTextCalc] = useState('');
  const test = (e) => {
    if (e.code === 'Enter') {
      setTextCurrency({
        value: Number(e.target.value.split(' ')[0]),
        fromCode: e.target.value.split(' ')[1].toUpperCase(),
        toCode: e.target.value.split(' ')[3].toUpperCase(),
      });
      calcTest();
    }
  };

  const calcTest = () => {
    const arr = currencyData.filter((item) => item.CharCode === textCurrency.fromCode);
    console.log(arr[0].Value);
  };

  //------------------------------------------

  return (
    <div className="content">
      <div className="currency__block">
        <FromInput changeValue={(e) => changeValue(e)} onKeyPress={(e) => onKeyPress(e)} />
        <ToInput converCurrency={converCurrency} />
      </div>
      <input onKeyPress={(e) => test(e)} className="input__calc" type="text" />
    </div>
  );
};
