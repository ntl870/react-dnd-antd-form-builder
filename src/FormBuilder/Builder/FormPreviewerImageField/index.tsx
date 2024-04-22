import { FALLBACK_IMAGE_BASE64 } from '#/containers/Compliances/Documents/constants/base64';
import { getS3FileUrl } from '#/shared/utils/s3';

interface Props {
  pathFile?: string;
}

function FormPreviewerImageField({ pathFile }: Props) {
  return (
    <div className="mb-4">
      <img
        alt="documentImage"
        height={200}
        src={pathFile ? getS3FileUrl(pathFile ?? '') : FALLBACK_IMAGE_BASE64}
      />
    </div>
  );
}

export default FormPreviewerImageField;
