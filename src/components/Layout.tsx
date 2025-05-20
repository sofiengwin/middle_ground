import { Button } from "./ui/button"
// import { Loader2 } from "lucide-react"
import { Card } from "./ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "./ui/input"
// import { User } from "lucide-react"
import UserLocation from "./UserLocation"
import { useState } from "react"
import { IUserLocation, useAppContext } from "@/contexts/AppContext"
import AddLocationDialog from "./AddLocationDialog"
import TextInput from "./TextInput"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState('')
  const {locations, updateLocation, setLlll,llll} = useAppContext();
  console.log("hello", {location, locations, llll})
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-6">
        <div className="">

          <Card className="p-4">
            <Label htmlFor="main-address">Main Address</Label>
            <Input
              id="main-address"
              placeholder="Enter main address"
              className="mt-2"
              // ref={(input) => input && initializeAutocomplete(input, -1)}
            />
              <UserLocation label="George" onSelect={setLocation} />
          </Card>

          <div className="space-y-4">
            {Object.entries(locations).map(([name, userLocation]) => (
              <Card key={name} className="p-4">
                <UserLocation
                  label={name}
                  onSelect={(value) => {
                    console.log("Selected value:", value);
                    updateLocation(name, { ...userLocation, address: value })
                  }}
                 />
              </Card>
            ))}
            <AddLocationDialog onOk={updateLocation} />
          </div>

          <Button className="w-full">
            {/* {isCalculating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Calculate Distances"
            )} */}
            Calculate
          </Button>
        </div>

        <div className="rounded-lg overflow-hidden">
            {children}
        </div>
      </div>
    </div>
  )
}


