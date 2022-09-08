import { useCallback, useEffect, useState } from "react";
import { IWeatherData } from "../../types/weather";

interface WeatherCardProps {
  props?: IWeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  props,
}: WeatherCardProps) => {
  console.log(props);

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
    <div>
      {isLoading ? (
        ""
      ) : (
        <div className="weather_card">
          <img
            src={`http://openweathermap.org/img/wn/${props?.weather[0].icon}.png`}
          ></img>
          <h1>{String(celcius(props?.main.temp || 0)) + "°C"}</h1>

          <div className="card_info">
            <ul>
              <li>Feels Like</li>
              <li>Max Temp</li>
              <li>Min Temp</li>
            </ul>
            <ul>
              <li>{String(celcius(props?.main.feels_like || 0)) + "°C"}</li>
              <li>{String(celcius(props?.main.temp_max || 0)) + "°C"}</li>
              <li>{String(celcius(props?.main.temp_min || 0)) + "°C"}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
