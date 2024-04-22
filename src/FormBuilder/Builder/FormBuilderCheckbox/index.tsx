import { useContext } from 'react';
import { Checkbox, Typography } from 'antd';
import { FormBuilderContext } from '#/containers/Compliances/Documents/contexts/FormBuilderContext';
import type { CheckboxFieldEditState } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';

interface Props extends CheckboxFieldEditState {}

function FormBuilderCheckbox({ id, title }: Props) {
  const { getFieldById } = useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  return (
    <div>
      <Typography.Text>{title}</Typography.Text>
      <Checkbox.Group
        className="flex flex-col gap-2"
        options={currentField?.state.checkBoxOptions ?? []}
      />
    </div>
  );
}

export default FormBuilderCheckbox;
