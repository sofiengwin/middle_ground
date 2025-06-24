import { useAppContext } from "@/contexts/AppContext";
import { Card } from "../ui/card";
import UserLocation from "../UserLocation";
import { Button } from "../ui/button";

export default function LocationsForm() {
    const {locations, updateLocation} = useAppContext();
  
  return (
    <form className="space-y-6">
      {Object.entries(locations).map(([name]) => {
        return (
          <Card key={name} className="p-4">
            <UserLocation
              label={name}
              onSelect={(suggestion) => {
                updateLocation(name, suggestion);
              } } />
          </Card>
        );
      })}

      <Button className="w-full space-y-4">Calculate</Button>
    </form>
  );
}
