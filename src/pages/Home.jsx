import React, { useEffect, useState } from "react";
import CurrencyChoiceSection from "../components/CurrencyChoiceSection";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [latestCurrencyRate, setLatestCurrencyRate] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.fastforex.io/fetch-all?api_key=f7d7caf5e2-74814b593e-sjpoa8"
        ).then((res) => res.json());
        setLatestCurrencyRate(res);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-8 py-4">
      <CurrencyChoiceSection currencyRate={latestCurrencyRate} />
    </div>
  );
};

export default Home;
