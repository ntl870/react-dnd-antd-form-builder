import { Typography } from 'antd';
import type { DatePickerFieldEditState } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import BaseDatePicker from '#/shared/components/selectors/BaseDatePicker';

interface Props extends DatePickerFieldEditState {}

function FormBuilderDatePicker({ title, placeholder }: Props) {
  return (
    <div>
      <Typography.Text>{title}</Typography.Text>
      <BaseDatePicker className="w-full" placeholder={placeholder} />
    </div>
  );
}

export default FormBuilderDatePicker;
