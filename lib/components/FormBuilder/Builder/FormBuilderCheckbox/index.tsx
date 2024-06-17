import { useContext } from 'react';
import { Checkbox, Typography } from 'antd';
import { CheckboxFieldEditState } from '../../../../types/draggableFields.types';
import { FormBuilderContext } from '../../../../contexts/FormBuilderContext';

interface Props extends CheckboxFieldEditState {}

function FormBuilderCheckbox({ id }: Props) {
  const { getFieldById } = useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  return (
    <div>
      <Typography.Text>{currentField?.state.title}</Typography.Text>
      <Checkbox.Group className="flex flex-col gap-2" options={currentField?.state.checkBoxOptions ?? []} />
    </div>
  );
}

export default FormBuilderCheckbox;
