interface Props {
  src: string;
}

function FormPreviewerImageField({ src }: Props) {
  return (
    <div className="mb-4">
      <img alt="documentImage" height={200} src={src} />
    </div>
  );
}

export default FormPreviewerImageField;
