import { DatePicker, Typography } from 'antd';
import { useContext } from 'react';
import { DatePickerFieldEditState } from '../../../../types/draggableFields.types';
import { FormBuilderContext } from '../../../../contexts/FormBuilderContext';

interface Props extends DatePickerFieldEditState {}

function FormBuilderDatePicker({ id }: Props) {
  const { getFieldById } = useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  return (
    <div>
      <Typography.Text>{currentField?.state?.title}</Typography.Text>
      <DatePicker className="w-full" placeholder={currentField?.state?.placeholder} />
    </div>
  );
}

export default FormBuilderDatePicker;
