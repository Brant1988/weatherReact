import { useEffect, useState } from "react";
import { IWeatherData } from "../../types/weather";
import "./weatherThreeDays.css";
import WeatherCard from "./weatherCard";

interface WeatherThreeDaysProps {
  props?: IWeatherData[];
}

const WeatherThreeDays: React.FC<WeatherThreeDaysProps> = ({
  props,
}: WeatherThreeDaysProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props?.length !== 0) setIsLoading(false);
  }, [props]);
  return (
    <div className="three_days">
      {isLoading ? (
        ""
      ) : (
        <>
          {props?.map((prop) => {
            return <WeatherCard props={prop} />;
          })}
        </>
      )}
    </div>
  );
};

export default WeatherThreeDays;
