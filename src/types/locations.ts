export interface ICountry {
  country_name: String;
  country_short_name: String;
  country_phone_code: Number;
}

export interface ICity {
  city_name: String;
}

export interface IState {
  state_name: String;
}

export interface ILocation {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}
