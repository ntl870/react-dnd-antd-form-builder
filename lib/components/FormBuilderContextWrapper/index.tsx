/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, useEffect } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { DraggableField } from '../../types/draggableFields.types';
import { FormBuilderContext } from '../../contexts/FormBuilderContext';
import useFormBuilder from '../../hooks/useFormBuilder';
import { FormBuilderFieldType } from '../../constants/formBuilder';

interface Props {
  children: ReactNode;
  initialValues?: DraggableField[];
  onFormChange?: (fields: DraggableField[]) => void;
  renderOverlay: (type: FormBuilderFieldType) => ReactNode;
}

export default function FormBuilderContextWrapper({ children, initialValues, onFormChange, renderOverlay }: Props) {
  const {
    data,
    currentDragFieldRef,
    activeSidebarField,
    dupplicateField,
    getFieldById,
    onEndEdit,
    onRemoveField,
    onStartEdit,
    updateData,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    sidebarFieldsRegenKey,
  } = useFormBuilder(initialValues ?? []);

  useEffect(() => {
    if (onFormChange) {
      onFormChange(data.fields);
    }
  }, [data.fields, onFormChange]);

  return (
    <FormBuilderContext.Provider
      value={{
        currentDragfield: currentDragFieldRef.current,
        dupplicateField,
        fields: data.fields,
        getFieldById,
        onEndEdit,
        onRemoveField,
        onStartEdit,
        updateFieldsData: updateData,
        sidebarFieldsRegenKey,
      }}
    >
      <section className="flex flex-1 flex-row bg-gray-100">
        <DndContext autoScroll onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart}>
          {children}
          <DragOverlay>{activeSidebarField ? renderOverlay(activeSidebarField.type) : null}</DragOverlay>
        </DndContext>
      </section>
    </FormBuilderContext.Provider>
  );
}
