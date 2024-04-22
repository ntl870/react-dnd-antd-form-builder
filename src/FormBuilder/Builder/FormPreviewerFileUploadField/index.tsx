import { Icon } from '@iconify/react';
import type { UploadFile } from 'antd';
import { Button, Form, Upload } from 'antd';
import type { FormPreviewerFieldCommonProps } from '#/containers/Compliances/Documents/interfaces/formPreviewer.types';
import { getFormRequiredRule } from '#/containers/Compliances/Documents/utils/form-submit';
import { ALLOWED_FILE_EXTENSIONS } from '#/shared/constants/s3Upload';
import { getFileNameFromPathFile } from '#/shared/utils/file';

interface Props extends FormPreviewerFieldCommonProps {}

function FormPreviewerFileUploadField({ required, name, ...rest }: Props) {
  const form = Form.useFormInstance();
  const value = form.getFieldValue(name);

  const defaultFileList: UploadFile[] = value
    ? [
        {
          name:
            typeof value === 'string'
              ? getFileNameFromPathFile(value)
              : value?.file.name,
          uid: '-1',
        },
      ]
    : [];

  return (
    <Form.Item name={name} rules={getFormRequiredRule(!!required)} {...rest}>
      <Upload
        accept={ALLOWED_FILE_EXTENSIONS.join(',')}
        beforeUpload={() => false}
        defaultFileList={defaultFileList}
        maxCount={1}
      >
        <Button
          className="text-sm px-4 py-2"
          icon={<Icon icon="solar:upload-minimalistic-linear" />}
        >
          Upload
        </Button>
      </Upload>
    </Form.Item>
  );
}

export default FormPreviewerFileUploadField;
