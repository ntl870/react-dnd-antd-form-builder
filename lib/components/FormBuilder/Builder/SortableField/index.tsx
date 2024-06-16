import { type CSSProperties, useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandle from "../DragHandle";
import { FormBuilderContext } from "../../../../contexts/FormBuilderContext";
import { DraggableField } from "../../../../types/draggableFields.types";
import DragField from "../DragField";

interface Props {
  id: string;
  index: number;
  field: DraggableField;
}

export default function SortableField({ id, index, field }: Props) {
  const { onStartEdit } = useContext(FormBuilderContext);
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({
      data: {
        field,
        id,
        index,
      },
      id,
    });

  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`bg-white px-6 pb-6 rounded-xl ${
        field.state.isEdit ? "border-2 border-solid border-primary-border" : ""
      } `}
      ref={setNodeRef}
      style={style}
    >
      <DragHandle attributes={attributes} id={id} listeners={listeners} />
      <div onDoubleClick={() => onStartEdit(id)}>
        <DragField field={field} id={id} />
      </div>
    </div>
  );
}
