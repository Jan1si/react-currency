import React from 'react';
import { useContext } from 'react';
import { ValueContext } from '../../App';

export const ToInput = () => {
  const { converCurrency } = useContext(ValueContext);
  return (
    <div className="input__group to_input">
      <input type="text" disabled value={`${converCurrency}.рублей`} />
    </div>
  );
};
