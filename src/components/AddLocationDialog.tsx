import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TextInput from "./TextInput";
import { useState } from "react";
import { IUserLocation } from "@/contexts/AppContext";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";

interface Props {
  onOk: (name: string, userLocation: IUserLocation) => void;
}

export default function AddLocationDialog({ onOk }: Props) {
  const [name, setName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddField = () => {
    if (name.trim()) {
      onOk(name, { name });
      setName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Field</DialogTitle>
          <DialogDescription>
            Enter the name for your new form field. This will be used as the
            label.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="fieldName">Field Name</Label>
            <TextInput
              label="Name"
              placeholder="Enter name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddField} disabled={!name.trim()}>
            Add Field
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
