import React, { useContext, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AppContext } from "../context";
import { HOST } from "../http";
import { ICity, ICountry, IState } from "../types/locations";

const LocationSelect: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const [countries, setCountries] = useState<ICountry[]>();
  const [cities, setCities] = useState<ICity[]>();
  const [states, setStates] = useState<IState[]>();
  const [selectedCountry, setSelectedCountry] = useState("");

  const getCountries = async () => {
    try {
      const response = await HOST.get<ICountry[]>("/countries", {
        headers: {
          Authorization: `Bearer ${state.authToken}`,
        },
      });
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getStates = async () => {
    try {
      const response = await HOST.get<IState[]>(`/states/${selectedCountry}`, {
        headers: {
          Authorization: `Bearer ${state.authToken}`,
        },
      });
      console.log(response);
      setStates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async () => {
    try {
      const response = await HOST.get<ICity[]>(
        `/cities/${state.selectedState}`,
        {
          headers: {
            Authorization: `Bearer ${state.authToken}`,
          },
        }
      );
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (state.authToken) getCountries();
  }, [state.authToken]);

  useEffect(() => {
    if (selectedCountry) getStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (state.selectedState) getCities();
  }, [state.selectedState]);

  return (
    <div className="location_select">
      <>
        {countries?.length && (
          <Autocomplete
            disablePortal
            options={countries?.map((country) => country.country_name)}
            sx={{ width: 200 }}
            inputValue={selectedCountry}
            onInputChange={(event, newInputValue) => {
              setSelectedCountry(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Choose country" />
            )}
          />
        )}
      </>
      <>
        {states?.length && (
          <Autocomplete
            disablePortal
            options={states?.map((state) => state.state_name)}
            sx={{ width: 200 }}
            inputValue={state.selectedState}
            onInputChange={(event, newInputValue) => {
              dispatch({ type: "SET_STATE", payload: newInputValue });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Choose state" />
            )}
          />
        )}
      </>
      <>
        {cities?.length && (
          <Autocomplete
            disablePortal
            options={cities?.map((city) => city.city_name)}
            sx={{ width: 200 }}
            inputValue={state.selectedCity}
            onInputChange={(event, newInputValue) => {
              dispatch({ type: "SET_CITY", payload: newInputValue });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Choose city" />
            )}
          />
        )}
      </>
    </div>
  );
};

export default LocationSelect;
