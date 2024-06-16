import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Typography, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import EditFieldSectionToolbar from "../EditFieldSectionToolbar";
import { FormBuilderContext } from "../../../../contexts/FormBuilderContext";

interface Props {
  id?: string;
}

function EditImageFieldSection({ id }: Props) {
  const { onEndEdit, onRemoveField, getFieldById } =
    useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  const currentPathFile = currentField?.state.pathFile;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [showRequiredImageError, setShowRequiredImageError] = useState(false);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
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

    onEndEdit();
  };

  return (
    <div>
      <Typography.Text className="text-base">Image</Typography.Text>
      <div className="flex flex-col">
        <Upload
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
        <Button onClick={onSave} type="primary">
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
