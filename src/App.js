import "./App.css";
import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

function App() {
  // Variable de estado para almacenar los datos de la API Openweathermap
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

  //Variable de estado de los grados de temperatura
  const [degrees, setDegrees] = useState(true);

  // APIKEY y URL
  const apiKey = "881506eb5925c4f5a7859aeb4fc03a91";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userCoord.lat}&lon=${userCoord.lng}&units=metric&appid=${apiKey}`;

  // Codigos de 2 caracteres para las ciudades
  const alphaCodeCountries = [
    {
      code: "AF",
      country: "Afghanistan",
    },
    {
      code: "AL",
      country: "Albania",
    },
    {
      code: "DZ",
      country: "Algeria",
    },
    {
      code: "MX",
      country: "México",
    },
    {
      code: "AQ",
      country: "Antarctica",
    },
    {
      code: "AR",
      country: "Argentina",
    },
    {
      code: "AM",
      country: "Armenia",
    },
    {
      code: "AU",
      country: "Australia",
    },
    {
      code: "AT",
      country: "Austria",
    },
    {
      code: "BD",
      country: "Bangladesh",
    },
    {
      code: "BE",
      country: "Belgium",
    },
    {
      code: "BZ",
      country: "Belize",
    },
    {
      code: "BM",
      country: "Bermuda",
    },
    {
      code: "BO",
      country: "Bolivia",
    },
    {
      code: "BR",
      country: "Brazil",
    },
    {
      code: "BG",
      country: "Bulgaria",
    },
    {
      code: "CA",
      country: "Canada",
    },
    {
      code: "CL",
      country: "Chile",
    },
    {
      code: "CN",
      country: "China",
    },
    {
      code: "CO",
      country: "Colombia",
    },
    {
      code: "CR",
      country: "Costa Rica",
    },
    {
      code: "HR",
      country: "Croatia",
    },
    {
      code: "CU",
      country: "Cuba",
    },
    {
      code: "DO",
      country: "Dominican Republic",
    },
    {
      code: "EC",
      country: "Ecuador",
    },
    {
      code: "SV",
      country: "El Salvador",
    },
    {
      code: "EG",
      country: "Egypt",
    },
    {
      code: "FR",
      country: "France",
    },
    {
      code: "DE",
      country: "Germany",
    },
    {
      code: "GR",
      country: "Greece",
    },
    {
      code: "GT",
      country: "Guatemala",
    },
    {
      code: "HT",
      country: "Haiti",
    },
    {
      code: "HN",
      country: "Honduras",
    },
    {
      code: "IN",
      country: "India",
    },
    {
      code: "ID",
      country: "Indonesia",
    },
    {
      code: "IE",
      country: "Ireland",
    },
    {
      code: "IT",
      country: "Italy",
    },
    {
      code: "JP",
      country: "Japan",
    },
    {
      code: "NI",
      country: "Nicaragua",
    },
    {
      code: "PA",
      country: "Panama",
    },
    {
      code: "PE",
      country: "Peru",
    },
    {
      code: "PR",
      country: "Puerto Rico",
    },
    {
      code: "PT",
      country: "Portugal",
    },
    {
      code: "ES",
      country: "Spain",
    },
    {
      code: "US",
      country: "United States of America",
    },
    {
      code: "UY",
      country: "Uruguay",
    },
    {
      code: "VE",
      country: "Venezuela",
    },
  ];

  //Construir la fecha actual para mostrarla
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  //Obtener con fetch los datos de la API de Openweathermap
  const getWeatherAPI = async () => {
    const result = fetch(apiUrl);
    const value = await result;
    return value.json();
  };

  //Obtener las  coordenadas del usuario con API del navegador
  const getCoord = (userCoord, setUserCoord) => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setUserCoord({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function (error) {
        console.log(error);
      }
    );
  };

  //Cambiar temperatura a grados Farenheit
  const handleChangeF = () => {
    const degreeF = Math.floor(apiData.main.temp * 1.8 + 32);
    setDegrees(false);
  };

  //Cambiar temperatura a grados Celsius
  const handleChangeC = () => {
    const degreeF = Math.floor(apiData.main.temp * 1.8 + 32);
    setDegrees(true);
  };

  //Mostrar los datos de la API Openweathermap en pantalla
  const showData = () => {
    if (
      apiData.name &&
      apiData.sys.country &&
      apiData.weather[0].icon &&
      apiData.main.temp
    ) {
      let weatherDescription = apiData.weather[0].description;

      const country = alphaCodeCountries.find(
        (element) => element.code === "MX"
      );
      var iconcode = apiData.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      return (
        <div
          className={
            apiData.weather[0].main === "Clear"
              ? "clear"
              : apiData.weather[0].main === "Thunderstorm"
              ? "thunderstorm"
              : apiData.weather[0].main === "Drizzle"
              ? "drizzle"
              : apiData.weather[0].main === "Rain"
              ? "rain"
              : apiData.weather[0].main === "Snow"
              ? "snow"
              : apiData.weather[0].main === "Clouds"
              ? "clouds"
              : "default"
          }
        >
          <h1>Weather App</h1>
          <div>
            <div className="date">
              <strong>{dateBuilder(new Date())}</strong>
            </div>
            <h2>
              <strong>{apiData.name}, </strong>

              <strong>{apiData.sys.country}</strong>
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h2>
                <strong className="text-center">
                  Country: {country.country}
                </strong>
              </h2>
            </div>
            <img id="wicon" src={iconurl} alt="Weather icon" width="120px" />
            <Container>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Col className="d-flex justify-content-center" lg="4">
                  <p>
                    <strong>
                      {weatherDescription.charAt(0).toUpperCase() +
                        weatherDescription.slice(1)}
                    </strong>
                  </p>
                  <p>
                    <strong> Humidity: {apiData.main.humidity}%</strong>
                  </p>
                  <p>
                    <strong> Wind Speed: {apiData.wind.speed}meter/sec</strong>
                  </p>
                </Col>
                <Col lg="8" className="d-flex justify-content-center">
                  <p>
                    <strong>
                      {degrees
                        ? apiData.main.temp
                        : (apiData.main.temp * 1.8 + 32).toFixed(2)}
                      {degrees ? "℃" : "℉"}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      Feels like:{" "}
                      {degrees
                        ? apiData.main.feels_like
                        : (apiData.main.feels_like * 1.8 + 32).toFixed(2)}{" "}
                      {degrees ? "℃" : "℉"}
                    </strong>
                  </p>
                  <>
                    <ButtonToolbar>
                      <ButtonGroup>
                        <Button className="btn-bg" onClick={handleChangeC}>
                          &#8451;
                        </Button>
                        <Button className="btn-bg" onClick={handleChangeF}>
                          &#8457;
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      );
    } else {
      return <div> Obteniendo ciudad, por favor espere ... </div>;
    }
  };

  //Función para pasar a useEffect
  const effectCallback = () => {
    //Obtener las  coordenadas del usuario
    getCoord(userCoord, setUserCoord);
    //Obtener los datos de la API
    getWeatherAPI(userCoord).then((data) => {
      setApiData(data);
      setLoading(true);
    });
  };
  // useEffect se usa para consumir la API y obtener las coordenadas del usuario
  useEffect(effectCallback, [apiUrl]);

  return (
    <Container
      className="App App-header justify-content-center overlay"
      fluid={true}
      style={{ display: "flex", justifyContent: "center" }}
    >
      {loading ? (
        showData()
      ) : (
        <Loader type="Bars" color="#00BFFF" height={80} width={80} />
      )}
    </Container>
  );
}

export default App;
