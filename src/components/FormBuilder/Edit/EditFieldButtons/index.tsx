import { Button } from 'antd';

interface Props {
  onEndEdit: () => void;
  onAccept: () => void;
}

export default function EditFieldButtons({ onEndEdit, onAccept }: Props) {
  return (
    <div className="flex gap-2 mt-4">
      <Button onClick={onEndEdit}>Discard</Button>
      <Button onClick={onAccept} type="primary">
        Save
      </Button>
    </div>
  );
}
