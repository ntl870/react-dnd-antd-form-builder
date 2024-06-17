import { Select, Typography } from 'antd';
import { useContext } from 'react';
import { SelectFieldEditState } from '../../../../types/draggableFields.types';
import { FormBuilderContext } from '../../../../contexts/FormBuilderContext';

interface Props extends SelectFieldEditState {}

function FormBuilderSelect({ id }: Props) {
  const { getFieldById } = useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  const formattedOptions = currentField?.state?.options?.map((option) => ({
    label: option.value,
    value: option.value,
  }));

  return (
    <div className="flex flex-col">
      <Typography.Text>{currentField?.state?.title}</Typography.Text>
      <Select options={formattedOptions} placeholder={currentField?.state?.placeholder} />
    </div>
  );
}

export default FormBuilderSelect;
