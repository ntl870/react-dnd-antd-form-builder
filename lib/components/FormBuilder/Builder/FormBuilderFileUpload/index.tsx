import { Icon } from '@iconify/react';
import { Button, Typography, Upload } from 'antd';
import { useContext } from 'react';
import { FileUploadFieldEditState } from '../../../../types/draggableFields.types';
import { FormBuilderContext } from '../../../../contexts/FormBuilderContext';

interface Props extends FileUploadFieldEditState {}

function FormBuilderFileUpload({ id }: Props) {
  const { getFieldById } = useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  return (
    <div className="flex flex-col">
      <Typography.Text className="mb-2">{currentField?.state.title}</Typography.Text>
      <Upload>
        <Button className="text-sm px-4 py-2" icon={<Icon icon="solar:upload-minimalistic-linear" />}>
          Upload
        </Button>
      </Upload>
    </div>
  );
}

export default FormBuilderFileUpload;
