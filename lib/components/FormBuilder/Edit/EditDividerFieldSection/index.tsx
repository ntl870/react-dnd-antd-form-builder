import { useContext } from "react";
import { Typography } from "antd";
import EditFieldSectionToolbar from "../EditFieldSectionToolbar";
import { FormBuilderContext } from "../../../../contexts/FormBuilderContext";

interface Props {
  id?: string;
}

function EditDividerFieldSection({ id }: Props) {
  const { onRemoveField } = useContext(FormBuilderContext);

  const onRemoveFormBuilderField = () => {
    if (!id) return;

    onRemoveField(id);
  };

  return (
    <div>
      <Typography.Text>Divider</Typography.Text>
      <EditFieldSectionToolbar
        hideRequiredSwitch
        onRemoveField={onRemoveFormBuilderField}
      />
    </div>
  );
}

export default EditDividerFieldSection;
