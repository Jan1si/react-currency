import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

import { Header } from './components/Header';
import { Main } from './pages/Main';
import { Currency } from './pages/Currency';

export const ValueContext = createContext({});

function App() {
  const [currencyData, setCurrencyData] = useState([]);
  const [currency, setCurrency] = useState({});
  const [valueInput, setValueInput] = useState(0);
  const [converCurrency, setConverCurrency] = useState(0);
  const [defaulCurrency, setDefaultCurrentcy] = useState('AM');
  const [indexDefault, setIndexDefault] = useState([]);
  const [indexUsd, setIndexUsd] = useState(0);
  const [indexEur, setIndexEur] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
        const { data } = await JSON.parse(JSON.stringify(response));
        setCurrencyData(Object.values(data.Valute));
        setCurrency({
          code: Object.values(data.Valute)[10]?.CharCode,
          value: Object.values(data.Valute)[10]?.Value / Object.values(data.Valute)[10]?.Nominal,
        });
        setIndexEur(Object.values(data.Valute).filter((item) => item.CharCode === 'EUR')[0].Value);
        setIndexUsd(Object.values(data.Valute).filter((item) => item.CharCode === 'USD')[0].Value);
        setIndexDefault(
          Object.values(data.Valute).filter((item) => item.CharCode.includes(defaulCurrency)),
        );
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  const changeValue = (e) => {
    setValueInput(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.code === 'Enter') {
      setConverCurrency((Number(e.target.value) * currency.value).toFixed(2));
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Header />

        <ValueContext.Provider
          value={{
            valueInput,
            setValueInput,
            converCurrency,
            currency,
            setCurrency,
            currencyData,
            setConverCurrency,
            indexUsd,
            indexEur,
            indexDefault,
            setIndexDefault,
          }}>
          <Routes>
            <Route
              exact
              path="/"
              element={<Main changeValue={changeValue} onKeyPress={onKeyPress} />}
            />
            <Route exact path="/currency" element={<Currency />} />
          </Routes>
        </ValueContext.Provider>
      </div>
    </div>
  );
}

export default App;
