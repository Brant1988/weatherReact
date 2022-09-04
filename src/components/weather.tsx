import React, { useContext, useEffect } from "react";
import { AppContext } from "../context";
import axios from "axios";

const Weather: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const APIkey = "c01813a711179709aebbfc8d36ead466";
  const getWeatherByState = async () => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${state.selectedState}&exclude=hourly,hourly&appid=${APIkey}`
    );
    console.log(response);
  };
  const getWeatherByCity = async () => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${state.selectedCity}&exclude=hourly,hourly&appid=${APIkey}`
    );
    console.log(response);
  };

  useEffect(() => {
    if (state.selectedState) getWeatherByState();
  }, [state.selectedState]);
  useEffect(() => {
    if (state.selectedCity) getWeatherByCity();
  }, [state.selectedCity]);

  return (
    <div className="location_select">
      <h1>Weather</h1>
    </div>
  );
};

export default Weather;
