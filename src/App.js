import { FromInput } from './components/FromInput';
import { ToInput } from './components/ToInput';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const ValueContext = createContext({});

function App() {
  const [currencyData, setCurrencyData] = useState([]);
  const [currency, setCurrency] = useState({});
  const [valueInput, setValueInput] = useState(0);
  const [converCurrency, setConverCurrency] = useState(0);

  const changeValue = (e) => {
    setValueInput(e.target.value);
    setConverCurrency((Number(e.target.value) * currency.value).toFixed(2));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
        const { data } = await JSON.parse(JSON.stringify(response));
        setCurrencyData(Object.values(data.Valute));
        setCurrency({
          code: Object.values(data.Valute)[10]?.CharCode,
          value: Object.values(data.Valute)[10]?.Value,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <header className="header">
          <div className="logo">
            <h4>CURRENCY VALUE</h4>
          </div>
          <ul className="nav__menu">
            <li className="nav__item">
              <p className="nav__link">Конвертировать</p>
            </li>
            <li className="nav__item">
              <p className="nav__link">Курс</p>
            </li>
          </ul>
        </header>
        <div className="content">
          <div className="currency__block">
            <ValueContext.Provider
              value={{
                valueInput,
                converCurrency,
              }}>
              <FromInput
                currency={currency}
                setCurrency={setCurrency}
                changeValue={(e) => changeValue(e)}
                сurrencyData={currencyData}
              />
              <ToInput converCurrency={converCurrency} />
            </ValueContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
