import { Typography } from 'antd';
import type { FormBuilderFieldType } from '#/containers/Compliances/Documents/constants/formBuilder';
import { getDragFieldPlaceholderTitle } from '#/containers/Compliances/Documents/utils/form-renderer';

interface Props {
  type?: FormBuilderFieldType;
}

export default function DragFieldPlaceholder({ type }: Props) {
  return (
    <div className="w-full opacity-60 h-[80px] flex justify-center items-center">
      <Typography.Title className="my-4" level={5}>
        {getDragFieldPlaceholderTitle(type)}
      </Typography.Title>
    </div>
  );
}
