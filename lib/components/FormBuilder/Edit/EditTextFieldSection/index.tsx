import { useContext, useState } from 'react';
import { Input, Typography } from 'antd';
import EditFieldButtons from '../EditFieldButtons';
import EditFieldSectionToolbar from '../EditFieldSectionToolbar';
import { FormBuilderContext } from '../../../../contexts/FormBuilderContext';
import { TextFieldEditState } from '../../../../types/draggableFields.types';

interface Props {
  id?: string;
}

function EditTextFieldSection({ id }: Props) {
  const {
    onEndEdit, updateFieldsData, onRemoveField, getFieldById,
  } = useContext(FormBuilderContext);
  const currentField = getFieldById(id);
  const [state, setState] = useState<TextFieldEditState | null>(
    currentField?.state ?? null,
  );

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, title: e.target.value }));
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prev) => ({ ...prev, description: e.target.value }));
  };

  const onSave = () => {
    updateFieldsData((draft) => {
      const field = draft.fields.find((field) => field.id === id);

      if (field?.state) {
        field.state = { ...field.state, ...state };
      }
    });

    onEndEdit();
  };

  const onRemoveFormBuilderField = () => {
    if (!id) return;

    onRemoveField(id);
  };

  return (
    <div className="flex flex-col">
      <Typography.Text>Title</Typography.Text>
      <Input
        className="max-w-md mb-2"
        onChange={onChangeTitle}
        placeholder="Title"
        value={state?.title}
      />

      <Typography.Text>Description</Typography.Text>
      <Input.TextArea
        onChange={onChangeDescription}
        placeholder="Description"
        value={state?.description}
      />
      <EditFieldButtons onAccept={onSave} onEndEdit={onEndEdit} />
      <EditFieldSectionToolbar
        hideRequiredSwitch
        onRemoveField={onRemoveFormBuilderField}
        requiredValue={state?.required ?? false}
      />
    </div>
  );
}

export default EditTextFieldSection;
