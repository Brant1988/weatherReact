export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherData {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  rain?: {};
  sys: {
    pod: string;
  };
  visibility: number;
  weather: IWeather[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}
