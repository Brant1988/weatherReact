import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import "./App.css";
import LocationSelect from "./components/locationSelect/locationSelect";
import { useGeolocated } from "react-geolocated";
import { AppContext } from "./context";
import { AUTHHOST } from "./http";

import WeatherToday from "./components/weatherToday/weatherToday";
import { IWeatherData } from "./types/weather";
import WeatherThreeDays from "./components/weatherThreeDays/weatherThreeDays";
import { ILocation } from "./types/locations";

export const App = () => {
  const { state, dispatch } = useContext(AppContext);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  const [weatherThreeDays, setWeatherThreeDays] = useState<IWeatherData[]>();
  const [weatherToday, setWeatherToday] = useState<IWeatherData>();
  const [cityByGeoLoc, setCityByGeoLoc] = useState<ILocation>();
  const getToken = async () => {
    try {
      const response = await AUTHHOST.get("/getaccesstoken");

      dispatch({ type: "SET_TOKEN", payload: response.data.auth_token });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const APIkey = "c01813a711179709aebbfc8d36ead466";
  const getWeatherByState = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${state.selectedState}&exclude=hourly,hourly&appid=${APIkey}`
      );
      setWeatherToday(response.data.list[0]);
      setWeatherThreeDays([
        { ...response.data.list[8] },
        { ...response.data.list[16] },
        { ...response.data.list[24] },
      ]);
      setCityByGeoLoc(response.data.city);
    } catch (error) {
      console.log(error);
    }
  }, [state.selectedState]);
  const getWeatherByCity = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${state.selectedCity}&exclude=hourly,hourly&appid=${APIkey}`
      );
      setWeatherToday(response.data.list[0]);
      setWeatherThreeDays([
        { ...response.data.list[8] },
        { ...response.data.list[16] },
        { ...response.data.list[24] },
      ]);
      setCityByGeoLoc(response.data.city);
    } catch (error) {
      console.log(error);
    }
  }, [state.selectedCity]);

  const getWeatherByCoords = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${coords?.latitude}&lon=${coords?.longitude}&exclude=hourly,hourly&appid=${APIkey}`
      );
      setWeatherToday(response.data.list[0]);
      setWeatherThreeDays([
        { ...response.data.list[8] },
        { ...response.data.list[16] },
        { ...response.data.list[24] },
      ]);
      setCityByGeoLoc(response.data.city);
    } catch (error) {
      console.log(error);
    }
  }, [coords?.latitude, coords?.longitude]);

  useEffect(() => {
    if (state.selectedState) getWeatherByState();
  }, [state.selectedState, getWeatherByState]);
  useEffect(() => {
    if (state.selectedCity) getWeatherByCity();
  }, [state.selectedCity, getWeatherByCity]);
  useEffect(() => {
    if (coords?.latitude && coords.longitude) getWeatherByCoords();
  }, [coords?.latitude, coords?.longitude]);

  return (
    <div className="App">
      <div className="left_block">
        <LocationSelect props={cityByGeoLoc} />
        <WeatherThreeDays props={weatherThreeDays} />
      </div>
      <div className="right_block">
        <WeatherToday props={weatherToday} />
      </div>
    </div>
  );
};
