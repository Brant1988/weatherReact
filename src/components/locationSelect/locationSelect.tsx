import { ILocation } from "../../types/locations";
import LocationModal from "./locationModal";
import "./locationSelect.css";

interface LocationSelectProps {
  props?: ILocation;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  props,
}: LocationSelectProps) => {
  return (
    <div className="location_select">
      <h1>{props?.name}</h1>
      <LocationModal />
    </div>
  );
};

export default LocationSelect;
