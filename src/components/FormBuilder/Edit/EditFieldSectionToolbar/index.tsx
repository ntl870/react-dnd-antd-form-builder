import { useContext } from "react";
import { Button, Divider, Switch, Typography } from "antd";
import { FormBuilderContext } from "../../../../contexts/FormBuilderContext";

interface Props {
  requiredValue?: boolean;
  onRemoveField: () => void;
  onChangeRequired?: (value: boolean) => void;
  hideRequiredSwitch?: boolean;
}

function EditFieldSectionToolbar({
  onRemoveField,
  onChangeRequired,
  hideRequiredSwitch,
  requiredValue,
}: Props) {
  const { fields, dupplicateField } = useContext(FormBuilderContext);

  const currentEditField = fields.find((field) => field.state.isEdit);

  const onDupplicateField = () => {
    if (!currentEditField?.id) return;

    dupplicateField(currentEditField);
  };

  return (
    <>
      <Divider className="mb-2" />
      <div className="flex flex-row items-center justify-end">
        <Button className="p-0 w-6 h-6" onClick={onRemoveField} type="link">
          Remove
        </Button>
        <Button className="p-0 w-6 h-6" onClick={onDupplicateField} type="link">
          Dupplicate
        </Button>
        {!hideRequiredSwitch && (
          <>
            <Divider className="mx-2" type="vertical" />
            <div className="flex items-center">
              <Typography.Text className=" text-xs mr-2">
                Required
              </Typography.Text>

              <Switch
                onChange={onChangeRequired}
                size="small"
                value={requiredValue}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default EditFieldSectionToolbar;
