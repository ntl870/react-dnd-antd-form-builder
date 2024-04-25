import React from "react";
import type { Updater } from "use-immer";
import type { DraggableField } from "../types/draggableFields.types";

interface FormBuilderContextType {
  fields: DraggableField[];
  onStartEdit: (id: string) => void;
  onEndEdit: () => void;
  updateFieldsData: Updater<{
    fields: DraggableField[];
  }>;
  onRemoveField: (id: string) => void;
  getFieldById: (id?: string) => DraggableField | undefined;
  dupplicateField: (field?: DraggableField) => void;
  currentDragfield?: DraggableField | null;
}

export const FormBuilderContext = React.createContext<FormBuilderContextType>({
  currentDragfield: null,
  dupplicateField: () => null,
  fields: [],
  getFieldById: () => undefined,
  onEndEdit: () => null,
  onRemoveField: () => null,
  onStartEdit: () => null,
  updateFieldsData: () => null,
});
