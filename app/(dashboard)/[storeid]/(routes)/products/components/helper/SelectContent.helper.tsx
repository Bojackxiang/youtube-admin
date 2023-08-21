import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectContentHelperProps {
  listValues: any[];
}

const SelectContentHelper: React.FC<SelectContentHelperProps> = ({
  listValues,
}) => {
  return (
    <>
      <SelectContent>
        {listValues.length === 0 && (
          <SelectItem disabled value={"NO_VALUE"}>
            No categories available
          </SelectItem>
        )}
        {listValues.length > 0 &&
          listValues.map((value) => (
            <SelectItem key={value.id} value={value.id}>
              {value.name}
            </SelectItem>
          ))}
      </SelectContent>
    </>
  );
};

export default SelectContentHelper;
