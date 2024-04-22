import { Typography } from 'antd';
import type { SelectFieldEditState } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import BaseSelect from '#/shared/components/selectors/BaseSelect';

interface Props extends SelectFieldEditState {}

function FormBuilderSelect({ options, title }: Props) {
  const formattedOptions = options?.map(option => ({
    label: option.value,
    value: option.value,
  }));

  return (
    <div className="flex flex-col">
      <Typography.Text>{title}</Typography.Text>
      <BaseSelect options={formattedOptions} placeholder={title} />
    </div>
  );
}

export default FormBuilderSelect;
