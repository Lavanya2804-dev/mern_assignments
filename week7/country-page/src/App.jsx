import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all countries
  useEffect(() => {
  const fetchCountries = async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region"
      );

      const data = await res.json();

      setCountries(data);
      setFiltered(data);
      setLoading(false);
    } catch (err) {
      console.error(err);   // optional for debugging
      setError("Failed to fetch countries");
      setLoading(false);
    }
  };

  fetchCountries();
}, []);

  // ✅ Search function
  const handleSearch = (text) => {
    const result = countries.filter((c) =>
      c.name.common.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className="container">
      <h1>🌍 Country Explorer</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {!loading && !error && <CountryList countries={filtered} />}
    </div>
  );
}

export default App;