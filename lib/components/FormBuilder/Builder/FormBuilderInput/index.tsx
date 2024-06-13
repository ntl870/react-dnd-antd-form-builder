import { useContext } from "react";
import { Input, Typography } from "antd";
import { FormBuilderContext } from "../../../../contexts/FormBuilderContext";
import { InputFieldEditState } from "../../../../types/draggableFields.types";

interface Props extends InputFieldEditState {
  isTextArea?: boolean;
}

function FormBuilderTextInput({ id, isTextArea }: Props) {
  const { getFieldById } = useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  return (
    <div>
      <Typography.Text>{currentField?.state.title}</Typography.Text>
      {isTextArea ? (
        <Input.TextArea placeholder={currentField?.state.placeholder} />
      ) : (
        <Input placeholder={currentField?.state.placeholder} />
      )}
    </div>
  );
}

export default FormBuilderTextInput;
