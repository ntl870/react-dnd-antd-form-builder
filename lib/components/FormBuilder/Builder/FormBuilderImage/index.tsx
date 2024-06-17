import { Image } from 'antd';
import { ImageFieldEditState } from '../../../../types/draggableFields.types';

interface Props extends ImageFieldEditState {}

function FormBuilderImage({ ...rest }: Props) {
  return <Image {...rest} />;
}

export default FormBuilderImage;
