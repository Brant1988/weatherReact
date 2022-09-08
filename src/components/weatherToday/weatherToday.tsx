import { useCallback, useEffect, useState } from "react";
import { IWeatherData } from "../../types/weather";
import "./weatherToday.css";

interface WeatherTodayProps {
  props?: IWeatherData;
}

const WeatherToday: React.FC<WeatherTodayProps> = ({
  props,
}: WeatherTodayProps) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (props?.main.temp) setIsLoading(false);
  }, [props?.main.temp]);
  const celcius = useCallback(
    (kalvin: number) => {
      return Math.round(kalvin - 273);
    },
    [props?.main.temp]
  );
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <>
          <h2>Today</h2>
          <div className="temp_icon">
            <img
              src={`http://openweathermap.org/img/wn/${props?.weather[0].icon}.png`}
            ></img>
            <h1>{String(celcius(props?.main.temp || 0)) + "°C"}</h1>
          </div>
          <div className="today_info">
            <ul>
              <li>Feels Like</li>
              <li>Max Temp</li>
              <li>Min Temp</li>
              <li>Wind</li>
              <li>Humidity</li>
            </ul>
            <ul>
              <li>{String(celcius(props?.main.feels_like || 0)) + "°C"}</li>
              <li>{String(celcius(props?.main.temp_max || 0)) + "°C"}</li>
              <li>{String(celcius(props?.main.temp_min || 0)) + "°C"}</li>
              <li>{String(props?.wind.speed) + "m/h"}</li>
              <li>{String(props?.main.humidity) + "%"}</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default WeatherToday;
