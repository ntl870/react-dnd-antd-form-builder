import { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, Image, Typography, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { FormBuilderContext } from '#/containers/Compliances/Documents/contexts/FormBuilderContext';
import { usePresignedUrlS3Mutation } from '#/generated/schemas';
import {
  ALLOWED_IMAGE_EXTENSIONS,
  FolderType,
  UploadType,
} from '#/shared/constants/s3Upload';
import useNotification from '#/shared/hooks/useNotification';
import { useUploadS3File } from '#/shared/hooks/useUploadS3File';
import { validateFiles } from '#/shared/utils/file';
import { getS3FileUrl } from '#/shared/utils/s3';
import EditFieldSectionToolbar from '../EditFieldSectionToolbar';

interface Props {
  id?: string;
}

function EditImageFieldSection({ id }: Props) {
  const { onEndEdit, updateFieldsData, onRemoveField, getFieldById } =
    useContext(FormBuilderContext);
  const notification = useNotification();
  const currentField = getFieldById(id);
  const { upload: uploadFile, uploading: isUploadingFile } = useUploadS3File();
  const [preSignedUrl, { loading: isLoadingPresignedUrl }] =
    usePresignedUrlS3Mutation();

  const currentPathFile = currentField?.state.pathFile;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [showRequiredImageError, setShowRequiredImageError] = useState(false);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setShowRequiredImageError(false);
  };

  const onRemoveFormBuilderField = () => {
    if (!id) return;

    onRemoveField(id);
  };

  const onSave = async () => {
    if (!id) return;

    if (!fileList.length && !!currentPathFile) {
      onEndEdit();
    }

    if (!fileList.length && !currentPathFile) {
      setShowRequiredImageError(true);
      return;
    }

    const file = fileList[0].originFileObj as RcFile;

    const { data } = await preSignedUrl({
      variables: {
        presignedUrlDto: {
          fileName: file.name,
          fileType: file.type,
          folderType: FolderType.Document,
          uploadType: UploadType.Public,
        },
      },
    });

    if (data?.presignedUrlS3.uploadUrl) {
      await uploadFile({
        file,
        preSignedUrl: data.presignedUrlS3.uploadUrl,
      });

      updateFieldsData(draft => {
        const field = draft.fields.find(field => field.id === id);

        if (field?.state) {
          field.state = {
            ...field.state,
            ...currentField?.state,
            pathFile: data.presignedUrlS3.pathFile,
          };
        }
      });

      onEndEdit();
    }
  };

  const handleBeforeUpload = (file: RcFile) => {
    const { message, invalidFiles, title } = validateFiles([file], {
      acceptType: ALLOWED_IMAGE_EXTENSIONS,
      limitSize: 20,
    });

    if (invalidFiles.length > 0) {
      notification.error(title, message);
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  return (
    <div>
      <Typography.Text className="text-base">Image</Typography.Text>
      <div className="flex flex-col">
        {(() => {
          if (currentField?.state.pathFile || fileList.length > 0) {
            return (
              <Image
                preview={false}
                src={
                  fileList.length > 0
                    ? URL.createObjectURL(fileList[0].originFileObj as RcFile)
                    : getS3FileUrl(currentField?.state.pathFile ?? '')
                }
                width={200}
              />
            );
          }

          return null;
        })()}

        <Upload
          accept={ALLOWED_IMAGE_EXTENSIONS.join(',')}
          beforeUpload={handleBeforeUpload}
          className="mt-4"
          fileList={fileList}
          maxCount={1}
          onChange={onChange}
          showUploadList={false}
        >
          <Button
            className="text-sm px-4 py-2"
            icon={<Icon icon="solar:upload-minimalistic-linear" />}
          >
            Upload
          </Button>
        </Upload>
      </div>

      {showRequiredImageError ? (
        <Typography.Text className="text-red-500 text-sm">
          Image is required
        </Typography.Text>
      ) : null}

      <div className="flex gap-2 mt-4">
        <Button onClick={onEndEdit}>Discard</Button>
        <Button
          loading={isUploadingFile || isLoadingPresignedUrl}
          onClick={onSave}
          type="primary"
        >
          Save
        </Button>
      </div>
      <EditFieldSectionToolbar
        hideRequiredSwitch
        onRemoveField={onRemoveFormBuilderField}
      />
    </div>
  );
}

export default EditImageFieldSection;
