import {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { useState, useRef } from "react";
import { FormBuilderFieldType } from "../../constants/formBuilder";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import { DraggableField } from "../../types/draggableFields.types";
import { getDefaultState } from "../../utils/form-renderer";
import { createSpacer, getDuplicateFieldState } from "../../utils/tools";
import CurrentForm from "../FormBuilder/Builder/CurrentForm";
import DraggableSidebarField from "../FormBuilder/Builder/DraggableSidebarField";
import FormBuilderSidebar from "../FormBuilder/Builder/FormBuilderSidebar";
import { useImmer } from "use-immer";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Props {
  initialValues?: DraggableField[];
}

function FormBuilderZone({ initialValues }: Props) {
  const [data, updateData] = useImmer<{ fields: DraggableField[] }>({
    fields: initialValues ?? [],
  });
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    crypto.randomUUID()
  );
  const spacerInsertedRef = useRef<boolean>();
  const currentDragFieldRef = useRef<DraggableField | null>();
  const [activeSidebarField, setActiveSidebarField] =
    useState<DraggableField | null>();

  const cleanUp = () => {
    setActiveSidebarField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const activeData = active.data.current ?? {};

    /*
     * This is where the cloning starts.
     * We set up a ref to the field we're dragging
     * from the sidebar so that we can finish the clone
     * in the onDragEnd handler.
     */
    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type } = field;
      setActiveSidebarField(field);
      /*
       * Create a new field that'll be added to the fields array
       * if we drag it over the canvas.
       */
      currentDragFieldRef.current = {
        id: String(active.id),
        name: `${type}${data.fields.length + 1}`,
        state: getDefaultState(type),
        type,
      };
      return;
    }

    /*
     * We aren't creating a new element so go ahead and just insert the spacer
     * since this field already belongs to the canvas.
     */
    const { field, index } = activeData;

    currentDragFieldRef.current = field;
    updateData((draft) => {
      draft.fields.splice(index, 1, createSpacer({ id: String(active.id) }));
    });
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    const activeData = active.data.current;

    /*
     * Once we detect that a sidebar field is being moved over the canvas
     * we create the spacer using the sidebar fields id with a spacer suffix and add into the
     * fields array so that it'll be rendered on the canvas.
     */

    /*
     * 🐑 CLONING 🐑
     * This is where the clone occurs. We're taking the id that was assigned to
     * sidebar field and reusing it for the spacer that we insert to the canvas.
     */
    if (activeData?.fromSidebar) {
      const overData = over?.data.current;

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: `${active.id}-spacer`,
        });

        updateData((draft) => {
          if (!draft.fields.length) {
            draft.fields.push(spacer);
          } else {
            const nextIndex =
              overData?.index > -1 ? overData?.index : draft.fields.length;

            draft.fields.splice(nextIndex, 0, spacer);
          }

          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        /*
         * This solves the issue where you could have a spacer handing out in the canvas if you drug
         * a sidebar item on and then off
         */
        updateData((draft) => {
          draft.fields = draft.fields.filter(
            (f) => f.type !== FormBuilderFieldType.Spacer
          );
        });
        spacerInsertedRef.current = false;
      } else {
        /*
         * Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
         * we need to make sure we're updating the spacer position to reflect where our drop will occur.
         * We find the spacer and then swap it with the over skipping the op if the two indexes are the same
         */
        updateData((draft) => {
          const spacerIndex = draft.fields.findIndex(
            (f) => f.id === `${active.id}-spacer`
          );

          const nextIndex =
            overData?.index > -1 ? overData?.index : draft.fields.length - 1;

          if (nextIndex === spacerIndex) return;

          draft.fields = arrayMove(draft.fields, spacerIndex, overData?.index);
        });
      }
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { over } = e;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      updateData((draft) => {
        draft.fields = draft.fields.filter(
          (f) => f.type !== FormBuilderFieldType.Spacer
        );
      });
      return;
    }

    /*
     * This is where we commit the clone.
     * We take the field from the this ref and replace the spacer we inserted.
     * Since the ref just holds a reference to a field that the context is aware of
     * we just swap out the spacer with the referenced field.
     */
    const nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = over.data.current ?? {};

      updateData((draft) => {
        const spacerIndex = draft.fields.findIndex(
          (f) => f.type === FormBuilderFieldType.Spacer
        );
        draft.fields.splice(spacerIndex, 1, nextField);

        draft.fields = arrayMove(
          draft.fields,
          spacerIndex,
          overData.index || 0
        );
      });
    }

    setSidebarFieldsRegenKey(crypto.randomUUID());
    cleanUp();
  };

  const onStartEdit = (id: string) => {
    updateData((draft) => {
      draft.fields.forEach((field) => {
        if (field.state.isEdit) {
          field.state.isEdit = false;
        }
      });
      const field = draft.fields.find((f) => f.id === id);

      if (field?.state) {
        field.state.isEdit = !field.state.isEdit;
      }
    });
  };

  const onEndEdit = () => {
    updateData((draft) => {
      draft.fields.forEach((field) => {
        if (field.state.isEdit) {
          field.state.isEdit = false;
        }
      });
    });
  };

  const onRemoveField = (id: string) => {
    updateData((draft) => {
      draft.fields = draft.fields.filter((f) => f.id !== id);
    });
  };

  const getFieldById = (id?: string) =>
    data.fields.find((field) => field.id === id);

  const dupplicateField = (field?: DraggableField) => {
    if (!field) return;

    const highestIndexByTypeOfField = data.fields.reduce((acc, curr) => {
      if (curr.type === field.type) {
        return acc + 1;
      }

      return acc;
    }, 0);

    const fieldIndex = data.fields.indexOf(field);

    updateData((draft) => {
      draft.fields.splice(
        fieldIndex + 1,
        0,
        getDuplicateFieldState(field, highestIndexByTypeOfField)
      );
    });
  };

  return (
    <div className="flex flex-1 flex-row bg-gray-100">
      <DndContext
        autoScroll
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
      >
        <FormBuilderSidebar fieldsRegKey={sidebarFieldsRegenKey} />

        <SortableContext
          items={data.fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}
        >
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
            }}
          >
            <CurrentForm />
          </FormBuilderContext.Provider>
        </SortableContext>

        <DragOverlay>
          {activeSidebarField ? (
            <DraggableSidebarField field={activeSidebarField} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default FormBuilderZone;
