function CountryCard({ country }) {
  return (
    <div className="card">
      <img src={country.flags.png} alt={country.name.common} />

      <h2>{country.name.common}</h2>

      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Population:</b> {country.population}</p>
      <p><b>Region:</b> {country.region}</p>
    </div>
  );
}

export default CountryCard;