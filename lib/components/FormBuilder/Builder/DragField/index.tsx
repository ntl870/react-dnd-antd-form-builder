import { useContext } from "react";
import DragFieldPlaceholder from "../DragFieldPlaceholder";
import { FormBuilderFieldType } from "../../../../constants/formBuilder";
import { FormBuilderContext } from "../../../../contexts/FormBuilderContext";
import { DraggableField } from "../../../../types/draggableFields.types";
import { getRenderer } from "../../../../utils/form-renderer";

interface Props {
  field: DraggableField;
  overlay?: boolean;
  id?: string;
}

export default function DragField({ field, overlay, id }: Props) {
  const { currentDragfield } = useContext(FormBuilderContext);

  const { type, state } = field;
  const { isEdit } = field.state;
  const Component = getRenderer(type);

  if (type === FormBuilderFieldType.Spacer && currentDragfield?.id === id) {
    return <DragFieldPlaceholder type={currentDragfield?.type} />;
  }

  return (
    <div
      className={`${!isEdit ? " pointer-events-none" : ""}${
        overlay ? " opacity-50" : ""
      }`}
    >
      <Component id={id} {...state} />
    </div>
  );
}
