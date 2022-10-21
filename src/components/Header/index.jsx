import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h4>CURRENCY VALUE</h4>
      </div>
      <ul className="nav__menu">
        <li className="nav__item">
          <Link to="/react-currency/">Конвертировать</Link>
        </li>
        <li className="nav__item">
          <Link to="/react-currency/currency">Курс</Link>
        </li>
      </ul>
    </header>
  );
};
