import axios from "axios";
import  "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [dataS, setDataS] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    //let url='https://restcountries.com/v3.1/all'

    try {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      console.log(data);
      setData(data);
      setDataS(data);
    } catch(e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let newData = data.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    console.log(newData);
    setDataS(newData);
  }, [search]);

  function handleChange(e) {
    setSearch(e.target.value);
    console.log(search);
    //const name=set.add(data.name.official);
    //console.log(name)
  }

  // <input value={search} onChange={handleChange}/>
  return (
    <div className="input" >
      <input  type="text" value={search} onChange={handleChange} placeholder="Search for countries..." 
      />
      <br />
      <div className="container">
        {dataS.map((country) => (
          <div className="countryCard" key={country.cca3}>
            <img alt={`Flag of ${country.flags.alt}`} src={country.flags.png} />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
