import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CheckBoxProps {
  className?: string;
  id?: string;
  type?: string;
  checked?: boolean;
  value?: string;
  name?: string;
  onChange?: (e: any) => void;
}

const OptionInput = ({
  className,
  id,
  type,
  checked,
  value,
  name,
  onChange,
}: CheckBoxProps) => {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center">
        {type === "checkbox" ? (
          <Checkbox />
        ) : (
          <RadioGroup value="">
            <RadioGroupItem value="" checked={checked} />
          </RadioGroup>
        )}

        <input
          id={id}
          aria-describedby="candidates-description"
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`h-4 w-4 border-gray-300 focus:ring-0 ${className} text-tabtextcolor`}
          checked={checked}
        />
      </div>
    </div>
  );
};

export default OptionInput;
