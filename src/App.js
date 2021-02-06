import "./App.css";
import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { ButtonGroup, Button } from "react-bootstrap";

function App() {
  // State
  const [apiData, setApiData] = useState({
    base: "stations",
    clouds: { all: 1 },
    cod: 200,
    coord: { lon: -99.1269, lat: 19.4978 },
    dt: 1612555473,
    id: 7280711,
    main: {
      temp: 299.98,
      feels_like: 295.83,
      temp_min: 299.82,
      temp_max: 300.15,
      pressure: 1022,
    },
    name: "",
    sys: {
      type: 1,
      id: 7146,
      country: "",
      sunrise: 1612530590,
      sunset: 1612571476,
    },
    timezone: -21600,
    visibility: 10000,
    weather: [
      {
        description: "",
        icon: "",
        id: 800,
        main: "",
      },
    ],
    wind: { speed: 1.54, deg: 110 },
  });
  const [userCoord, setUserCoord] = useState({
    lat: 0,
    lng: 0,
  });
  //Variable de estado del loader
  const [loading, setLoading] = useState(false);
  //Variable de estdo de los grados
  const [degrees, setDegrees] = useState(true);

  // API KEY AND URL
  const apiKey = "881506eb5925c4f5a7859aeb4fc03a91";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userCoord.lat}&lon=${userCoord.lng}&units=metric&appid=${apiKey}`;

  const getWeatherAPI = async () => {
    console.log("Hago peticiones a la api");
    const result = fetch(apiUrl);
    const value = await result;
    return value.json();
  };

  const getCoord = (userCoord, setUserCoord) => {
    console.log("obtengo las coordenadas del navegador");
    //Obtener las  coordenadas del usuario
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setUserCoord({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log(userCoord);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  //Obtener las  coordenadas del usuario
  //getCoord(userCoord, setUserCoord);
  const handleChangeF = () => {
    const degreeF = Math.floor(apiData.main.temp * 1.8 + 32);
    setDegrees(false);
  };

  const handleChangeC = () => {
    const degreeF = Math.floor(apiData.main.temp * 1.8 + 32);
    setDegrees(true);
  };

  const name = () => {
    if (
      apiData.name &&
      apiData.sys.country &&
      apiData.weather[0].icon &&
      apiData.main.temp
    ) {
      var iconcode = apiData.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      return (
        <div>
          <strong>{apiData.name}, </strong>
          <strong>{apiData.sys.country}</strong>
          <p>
            <strong>México</strong>
          </p>
          <div>
            <img id="wicon" src={iconurl} alt="Weather icon" />
            <p>
              <strong>{apiData.weather[0].description}</strong>
            </p>
          </div>
          <p>
            <strong>
              {degrees
                ? apiData.main.temp
                : (apiData.main.temp * 1.8 + 32).toFixed(2)}
              {degrees ? "℃" : "℉"}
            </strong>
          </p>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={handleChangeC}>
              &#8451;
            </Button>
            <Button variant="secondary" onClick={handleChangeF}>
              &#8457;
            </Button>
          </ButtonGroup>
        </div>
      );
    } else {
      return <div> Obteniendo ciudad, por favor espere ... </div>;
    }
  };

  const effectCallback = () => {
    //Obtener las  coordenadas del usuario
    getCoord(userCoord, setUserCoord);
    //Obtener los datos de la API
    getWeatherAPI(userCoord).then((data) => {
      console.log("Datos:");
      console.log(data);
      setApiData(data);
      setLoading(true);
    });
  };

  useEffect(effectCallback, [apiUrl]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      {loading ? (
        name()
      ) : (
        <Loader type="Circles" color="#00BFFF" height={80} width={80} />
      )}
    </div>
  );
}

export default App;
