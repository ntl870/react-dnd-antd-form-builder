import { useContext, useState } from 'react';
import { Input, Typography } from 'antd';
import { FormBuilderContext } from '#/containers/Compliances/Documents/contexts/FormBuilderContext';
import type { InputFieldEditState } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import EditFieldButtons from '../EditFieldButtons';
import EditFieldSectionToolbar from '../EditFieldSectionToolbar';

interface Props {
  id?: string;
}

function EditInputFieldSection({ id }: Props) {
  const { onEndEdit, updateFieldsData, onRemoveField, getFieldById } =
    useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  const [state, setState] = useState<InputFieldEditState | null>(
    currentField?.state ?? null,
  );

  const onAccept = () => {
    updateFieldsData(draft => {
      const field = draft.fields.find(field => field.id === id);

      if (field?.state) {
        field.state = { ...field.state, ...state };
      }
    });

    onEndEdit();
  };

  const onChangeRequired = (value: boolean) => {
    setState(prev => ({
      ...prev,
      required: value,
    }));
  };

  const onChangePlaceholder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, placeholder: e.target.value }));
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, title: e.target.value }));
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
        <div className="flex flex-col my-2">
          <Typography.Text>Placeholder</Typography.Text>
          <Input
            className="max-w-md"
            onChange={onChangePlaceholder}
            placeholder="Title"
            value={state?.placeholder}
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

export default EditInputFieldSection;
