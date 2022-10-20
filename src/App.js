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

  const changeValue = (e) => {
    setValueInput(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.code === 'Enter') {
      setConverCurrency((Number(e.target.value) * currency.value).toFixed(2));
    }
  };

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
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

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
