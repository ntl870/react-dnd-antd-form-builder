import type { ImageFieldEditState } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import S3ImageDisplay from '#/shared/components/images/S3ImageDisplay';

interface Props extends ImageFieldEditState {}

function FormBuilderImage({ pathFile }: Props) {
  return <S3ImageDisplay isPublicImage pathFile={pathFile ?? ''} />;
}

export default FormBuilderImage;
