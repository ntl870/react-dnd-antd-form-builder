import { useContext, useState } from "react";
import { Input, Typography } from "antd";
import EditFieldButtons from "../EditFieldButtons";
import EditFieldSectionToolbar from "../EditFieldSectionToolbar";
import { FormBuilderContext } from "../../../../contexts/FormBuilderContext";

interface Props {
  id?: string;
}

function EditSignatureFieldSection({ id }: Props) {
  const { onEndEdit, updateFieldsData, onRemoveField, getFieldById } =
    useContext(FormBuilderContext);
  const currentField = getFieldById(id);
  const [state, setState] = useState(currentField?.state ?? null);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, title: e.target.value }));
  };

  const onAccept = () => {
    updateFieldsData((draft) => {
      const field = draft.fields.find((field) => field.id === id);

      if (field?.state) {
        field.state = { ...field.state, ...state };
      }
    });

    onEndEdit();
  };

  const onChangeRequired = (value: boolean) => {
    setState((prev) => ({
      ...prev,
      required: value,
    }));
  };

  const onRemoveFormBuilderField = () => {
    if (!id) return;

    onRemoveField(id);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col my-2">
          <Typography.Text>Title</Typography.Text>
          <Input
            className="max-w-md"
            onChange={onChangeTitle}
            placeholder="Title"
            value={state?.title}
          />
        </div>
        <EditFieldButtons onAccept={onAccept} onEndEdit={onEndEdit} />
      </div>
      <EditFieldSectionToolbar
        onChangeRequired={onChangeRequired}
        onRemoveField={onRemoveFormBuilderField}
        requiredValue={state?.required ?? false}
      />
    </div>
  );
}

export default EditSignatureFieldSection;
