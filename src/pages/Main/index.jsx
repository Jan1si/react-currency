import React from 'react';
import { useContext } from 'react';
import { ValueContext } from '../../App';
import { FromInput } from '../../components/FromInput';
import { ToInput } from '../../components/ToInput';

export const Main = ({ onKeyPress, changeValue }) => {
  const { converCurrency } = useContext(ValueContext);
  return (
    <div className="content">
      <div className="currency__block">
        <FromInput changeValue={(e) => changeValue(e)} onKeyPress={(e) => onKeyPress(e)} />
        <ToInput converCurrency={converCurrency} />
      </div>
    </div>
  );
};
