import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Edit2 } from "lucide-react";

interface TextInputProps {
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleEditMode: () => void;
  editMode: boolean;
}

export default function TextInput({
  label,
  placeholder,
  type,
  value,
  onChange,
  toggleEditMode,
  editMode,
}: TextInputProps) {
  return (
    <div className="grid w-full gap-1.5">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleEditMode}
          className="h-8 w-8 p-0"
        >
          {editMode && <Edit2 className="h-4 w-4" />}
        </Button>
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
