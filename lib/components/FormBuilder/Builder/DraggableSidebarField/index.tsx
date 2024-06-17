import { useRef, ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { FormBuilderFieldType } from '../../../../constants/formBuilder';

interface Props {
  children: ReactNode;
  type: FormBuilderFieldType;
}

export default function DraggableSidebarFieldWrapper({ children, type }: Props) {
  const id = useRef(crypto.randomUUID());

  const { attributes, listeners, setNodeRef } = useDraggable({
    data: {
      field: {
        type,
      },
      fromSidebar: true,
    },
    id: id.current,
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className="cursor-pointer">
      {children}
      {/* <FormBuilderSidebarItem
        attributes={attributes}
        listeners={listeners}
        type={field.type}
      /> */}
    </div>
  );
}
