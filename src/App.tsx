import axios from "axios";
import { useContext, useEffect } from "react";
import "./App.css";
import LocationSelect from "./components/locationSelect";
import Weather from "./components/weather";
import { AppContext } from "./context";
import { AUTHHOST } from "./http";

export const App = () => {
  const { dispatch } = useContext(AppContext);
  const getToken = async () => {
    try {
      const response = await AUTHHOST.get("/getaccesstoken");
      console.log(response);
      dispatch({ type: "SET_TOKEN", payload: response.data.auth_token });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="App">
      <LocationSelect />
      <Weather />
    </div>
  );
};
