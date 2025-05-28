import { Button } from "./ui/button"
import { Card } from "./ui/card"
import UserLocation from "./UserLocation"
import { useAppContext } from "@/contexts/AppContext"
import AddLocationDialog from "./AddLocationDialog"

export default function Layout({ children }: { children: React.ReactNode }) {
  const {locations, updateLocation, mainAddress, updateMainAddress, addLocation} = useAppContext();
  // console.log("hello", {mainAddress, locations})
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-6">
        <div className="">

          <Card className="p-4">
            <UserLocation label="Main Address" onSelect={updateMainAddress} currentAddress={mainAddress.currentAddress} />
          </Card>

          <div className="space-y-4">
            {Object.entries(locations).map(([name, userLocation]) => (
              <Card key={name} className="p-4">
                <UserLocation
                  label={name}
                  currentAddress={userLocation.address}
                  onSelect={(suggestion) => {
                    updateLocation(name, suggestion)
                  }}
                 />
              </Card>
            ))}
            <AddLocationDialog onOk={addLocation} />
          </div>

          <Button className="w-full">
            Calculate
          </Button>
        </div>

        <div className="rounded-lg">
            {children}
        </div>
      </div>
    </div>
  )
}


