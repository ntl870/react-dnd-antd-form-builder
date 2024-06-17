import { Typography } from 'antd';
import { SignatureFieldEditState } from '../../../../types/draggableFields.types';
import { Signature } from '../../../../assets';

interface Props extends SignatureFieldEditState {}

function FormBuilderSignature({ title }: Props) {
  return (
    <div>
      <Typography.Text>{title}</Typography.Text>
      <div className="flex flex-row items-center justify-center border-2 border-solid border-secondary-border rounded-xl mt-2 p-8">
        <img alt="Signature" src={Signature} />
        <Typography.Text className="ml-2">Sign Here</Typography.Text>
      </div>
    </div>
  );
}

export default FormBuilderSignature;
