import { Select, Typography } from "antd";
import { SelectFieldEditState } from "../../../../types/draggableFields.types";

interface Props extends SelectFieldEditState {}

function FormBuilderSelect({ options, title }: Props) {
  const formattedOptions = options?.map((option) => ({
    label: option.value,
    value: option.value,
  }));

  return (
    <div className="flex flex-col">
      <Typography.Text>{title}</Typography.Text>
      <Select options={formattedOptions} placeholder={title} />
    </div>
  );
}

export default FormBuilderSelect;
