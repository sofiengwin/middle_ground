import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TextInputProps {
  label: string
  type: string
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({label, placeholder, type, value, onChange}: TextInputProps) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="email">{label}</Label>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}
