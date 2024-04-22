import { useContext } from "react";
import { Radio, Typography } from "antd";
import { FormBuilderContext } from "../../../../contexts/FormBuilderContext";
import { RadioFieldEditState } from "../../../../types/draggableFields.types";

interface Props extends RadioFieldEditState {}

function FormBuilderRadioButton({ id, title }: Props) {
  const { getFieldById } = useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  return (
    <div className="flex flex-col">
      <Typography.Text>{title}</Typography.Text>
      <Radio.Group
        className="mt-2"
        options={currentField?.state.radioOptions ?? []}
      />
    </div>
  );
}

export default FormBuilderRadioButton;
