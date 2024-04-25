import { Icon } from '@iconify/react';
import { Button, Typography, Upload } from 'antd';

interface Props {
  title: string;
}

function FormBuilderFileUpload({ title }: Props) {
  return (
    <div className="flex flex-col">
      <Typography.Text className="mb-2">{title}</Typography.Text>
      <Upload>
        <Button
          className="text-sm px-4 py-2"
          icon={<Icon icon="solar:upload-minimalistic-linear" />}
        >
          Upload
        </Button>
      </Upload>
    </div>
  );
}

export default FormBuilderFileUpload;
