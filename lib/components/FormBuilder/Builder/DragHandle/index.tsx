import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Drag } from "../../../../assets";

interface Props {
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  id: string;
}

function DragHandle({ attributes, listeners }: Props) {
  return (
    <div className="text-center cursor-pointer" {...attributes} {...listeners}>
      <img alt="drag-icon" src={Drag} />
    </div>
  );
}

export default DragHandle;
