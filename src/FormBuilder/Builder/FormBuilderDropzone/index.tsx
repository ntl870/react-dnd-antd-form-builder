import { Typography } from 'antd';

function FormBuilderDropzone() {
  return (
    <div className="h-24 border border-color-border border-dashed p-6 bg-white rounded-xl flex justify-center items-center">
      <Typography.Text className="text-primary-text text-sm">
        Start by adding elements on the left panel
      </Typography.Text>
    </div>
  );
}

export default FormBuilderDropzone;
