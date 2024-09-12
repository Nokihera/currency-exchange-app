import React, { useState, useEffect } from "react";

const CurrencyChoiceSection = ({ currencyRate }) => {
  const [amount, setAmount] = useState(0);
  const [keys, setKeys] = useState([]);
  const [fromButton, setFromButton] = useState(false);
  const [toButton, setToButton] = useState(false);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [realTimeCurrency, setRealTimeCurrency] = useState(null);

  const handleClickFromButton = () => {
    setFromButton(!fromButton);
  };

  const handleClickToButton = () => {
    setToButton(!toButton);
  };

  useEffect(() => {
    if (fromCurrency !== "" && toCurrency !== "") {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `https://api.fastforex.io/fetch-multi?from=${fromCurrency}&to=${toCurrency}&api_key=f7d7caf5e2-74814b593e-sjpoa8`
          ).then((res) => res.json());
          setRealTimeCurrency(res);
        } catch (err) {
          alert(err.message);
        }
      };
      fetchData();
    }
  }, [fromCurrency, toCurrency]);

  const handleClickToCurrency = (key) => {
    setToCurrency(key);
    setToButton(false);
  };

  const handleClickFromCurrency = (key) => {
    setFromCurrency(key);
    setFromButton(false);
  };

  useEffect(() => {
    if (currencyRate && currencyRate.results) {
      const newKeys = Object.keys(currencyRate.results);
      setKeys(newKeys);
    }
  }, [currencyRate]);

  if (!currencyRate || !currencyRate.results) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const convertedAmount = realTimeCurrency
    ? (realTimeCurrency.results[toCurrency] * amount).toFixed(2)
    : 0;

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Currency Exchange</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-700">From</p>
          <button
            className="bg-blue-500 text-white font-medium px-4 py-2 mt-2 rounded-lg hover:bg-blue-600"
            onClick={handleClickFromButton}
          >
            {fromCurrency || "Select Currency"}
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-700">To</p>
          <button
            className="bg-blue-500 text-white font-medium px-4 py-2 mt-2 rounded-lg hover:bg-blue-600"
            onClick={handleClickToButton}
          >
            {toCurrency || "Select Currency"}
          </button>
        </div>
      </div>

      <div className={`mt-4 ${fromButton ? "block" : "hidden"} relative z-10`}>
        <ul className="bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-scroll">
          {keys.map((key) => (
            <li key={key} className="hover:bg-gray-100">
              <button
                className="w-full text-left px-4 py-2"
                onClick={() => handleClickFromCurrency(key)}
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={`mt-4 ${toButton ? "block" : "hidden"} relative z-10`}>
        <ul className="bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-scroll">
          {keys.map((key) => (
            <li key={key} className="hover:bg-gray-100">
              <button
                className="w-full text-left px-4 py-2"
                onClick={() => handleClickToCurrency(key)}
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Amount</h2>
        <input
          type="number"
          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {fromCurrency && toCurrency && realTimeCurrency && (
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyChoiceSection;
