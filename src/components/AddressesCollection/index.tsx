import { useAppContext } from "@/contexts/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AddLocationDialog from "../AddLocationDialog";
import LocationsForm from "./LocationsForm";

export default function AddressesCollection() {
  const {locations, addLocation } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-2xl">User Information Form</CardTitle>
              <CardDescription>
                Please fill out all the required information below.
              </CardDescription>
            </div>
            <AddLocationDialog onOk={addLocation} />
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(locations).length > 0 ? (
              <LocationsForm />
            ) : (
              <CardDescription>
                No friends added yet
              </CardDescription>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
