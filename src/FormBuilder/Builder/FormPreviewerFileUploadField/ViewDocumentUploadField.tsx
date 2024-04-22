/* eslint-disable @typescript-eslint/no-misused-promises */
import type { UploadFile } from 'antd';
import { Form, Spin, Upload } from 'antd';
import type { FormPreviewerFieldCommonProps } from '#/containers/Compliances/Documents/interfaces/formPreviewer.types';
import { getFormRequiredRule } from '#/containers/Compliances/Documents/utils/form-submit';
import { useGetPresignedUrlS3Query } from '#/generated/schemas';
import { getFileNameFromPathFile } from '#/shared/utils/file';

interface Props extends FormPreviewerFieldCommonProps {}

export default function ViewDocumentUploadField({
  required,
  name,
  ...rest
}: Props) {
  const form = Form.useFormInstance();
  const pathFile = form.getFieldValue(name);

  const { loading, data } = useGetPresignedUrlS3Query({
    fetchPolicy: 'network-only',
    skip: !pathFile,
    variables: {
      input: {
        keys: [pathFile || ''],
      },
    },
  });

  const defaultFileList: UploadFile[] = [
    {
      name: getFileNameFromPathFile(pathFile) || '',
      uid: '1',
      url: data?.getPresignedUrlS3[0] || '',
    },
  ];

  return (
    <Form.Item
      className="pointer-events-auto"
      name={name}
      rules={getFormRequiredRule(!!required)}
      {...rest}
    >
      {loading ? (
        <Spin />
      ) : (
        <Upload
          defaultFileList={defaultFileList}
          showUploadList={{
            showRemoveIcon: false,
          }}
        />
      )}
    </Form.Item>
  );
}
