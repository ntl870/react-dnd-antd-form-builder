import type { ChangeEvent } from "react";
import { useContext, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Typography } from "antd";
import EditFieldButtons from "../EditFieldButtons";
import EditFieldSectionToolbar from "../EditFieldSectionToolbar";
import { FormBuilderContext } from "../../../../contexts/FormBuilderContext";
import {
  RadioFieldEditState,
  RadioType,
} from "../../../../types/draggableFields.types";

interface Props extends RadioFieldEditState {}

function EditRadioFieldSection({ id }: Props) {
  const { onEndEdit, updateFieldsData, onRemoveField, getFieldById } =
    useContext(FormBuilderContext);
  const currentField = getFieldById(id);
  const state = currentField?.state;
  const [options, setOptions] = useState<RadioType[]>(
    state?.radioOptions ?? []
  );
  const [title, setTitle] = useState<string>(state?.title ?? "");
  const [required, setRequired] = useState<boolean>(state?.required ?? false);

  const handleAddOption = () => {
    setOptions((prev) => [
      ...prev,
      {
        label: `Option ${prev.length + 1}`,
        value: `Option ${prev.length + 1}`,
      },
    ]);
  };

  const onSave = () => {
    updateFieldsData((draft) => {
      const field = draft.fields.find((field) => field.id === id);

      if (field?.state) {
        field.state = {
          ...field.state,
          radioOptions: options,
          required,
          title,
        };
      }
    });

    onEndEdit();
  };

  const onRemoveOption = (targetIndex: number) => () => {
    setOptions((prev) => prev.filter((_, index) => index !== targetIndex));
  };

  const onChangeSelectField = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setOptions((prev) => {
      const newOptions = [...prev];

      newOptions[index] = { ...newOptions[index], label: value, value };

      return newOptions;
    });
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const onChangeRequired = (value: boolean) => {
    setRequired(value);
  };

  const onRemoveFormBuilderField = () => {
    if (!id) return;

    onRemoveField(id);
  };

  return (
    <div>
      <div className="flex flex-col">
        <Typography.Text>Title</Typography.Text>
        <Input
          className="max-w-md mb-8"
          onChange={onChangeTitle}
          placeholder="Title"
          value={title}
        />
        <Typography.Text>Options</Typography.Text>
        {options.map((option, index) => (
          <div className="flex flex-row items-center" key={index}>
            <div className="mr-2 w-full mb-2">
              <div className="flex items-center">
                <Input
                  className="max-w-md mr-2"
                  onChange={(e) => onChangeSelectField(e, index)}
                  value={option.value}
                />
                {options.length > 1 && (
                  <Icon
                    className="cursor-pointer"
                    height="20"
                    icon="solar:close-circle-line-duotone"
                    onClick={onRemoveOption(index)}
                    width="20"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <div>
          <Button onClick={handleAddOption} type="link">
            Add Option
          </Button>
        </div>
        <EditFieldButtons onAccept={onSave} onEndEdit={onEndEdit} />
      </div>
      <EditFieldSectionToolbar
        onChangeRequired={onChangeRequired}
        onRemoveField={onRemoveFormBuilderField}
        requiredValue={required}
      />
    </div>
  );
}

export default EditRadioFieldSection;
