import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { renderTypeIcon } from "../../../../utils/tools";
import { FormBuilderFieldType } from "../../../../constants/formBuilder";

interface Props {
  type: FormBuilderFieldType;
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

function FormBuilderSidebarItem({ type, attributes, listeners }: Props) {
  return (
    <div
      {...listeners}
      {...attributes}
      className="flex flex-col border min-h-[100px] border-solid border-color-border-secondary py-2 px-4 items-center justify-center relative rounded-xl bg-white"
    >
      <div className="flex flex-col items-center justify-center h-full">
        {renderTypeIcon(type)}
      </div>
    </div>
  );
}

export default FormBuilderSidebarItem;
