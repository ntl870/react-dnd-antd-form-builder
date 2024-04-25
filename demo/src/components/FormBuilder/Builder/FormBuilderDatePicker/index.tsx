import { DatePicker, Typography } from "antd";
import { DatePickerFieldEditState } from "../../../../types/draggableFields.types";

interface Props extends DatePickerFieldEditState {}

function FormBuilderDatePicker({ title, placeholder }: Props) {
  return (
    <div>
      <Typography.Text>{title}</Typography.Text>
      <DatePicker className="w-full" placeholder={placeholder} />
    </div>
  );
}

export default FormBuilderDatePicker;
