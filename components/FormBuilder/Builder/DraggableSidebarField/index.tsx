import { useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import FormBuilderSidebarItem from "../FormBuilderSidebarItem";
import { SidebarComponent } from "../../../../types/draggableFields.types";

interface Props {
  field: SidebarComponent;
}

export default function DraggableSidebarField({ field }: Props) {
  const id = useRef(crypto.randomUUID());

  const { attributes, listeners, setNodeRef } = useDraggable({
    data: {
      field,
      fromSidebar: true,
    },
    id: id.current,
  });

  return (
    <div className="cursor-pointer" ref={setNodeRef}>
      <FormBuilderSidebarItem
        attributes={attributes}
        listeners={listeners}
        type={field.type}
      />
    </div>
  );
}
