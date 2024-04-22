import { Suspense, lazy } from "react";
import { Form, Spin } from "antd";
import FormPreviewerDividerField from "../FormPreviewerDividerField";
import ViewDocumentUploadField from "../FormPreviewerFileUploadField/ViewDocumentUploadField";
import { FormBuilderFieldType } from "../../../../constants/formBuilder";
import { DraggableField } from "../../../../types/draggableFields.types";
import { twClassMerge } from "../../../../utils/tailwind";

const FormPreviewerCheckbox = lazy(
  () => import("../FormPreviewerCheckboxField")
);
const FormPreviewerDatePickerField = lazy(
  () => import("../FormPreviewerDatePickerField")
);
const FormPreviewerFileUploadField = lazy(
  () => import("../FormPreviewerFileUploadField")
);
const FormPreviewerImageField = lazy(
  () => import("../FormPreviewerImageField")
);
const FormPreviewerInputField = lazy(
  () => import("../FormPreviewerInputField")
);
const FormPreviewerRadioField = lazy(
  () => import("../FormPreviewerRadioField")
);
const FormPreviewerSelectField = lazy(
  () => import("../FormPreviewerSelectField")
);
const FormPreviewerSignatureField = lazy(
  () => import("../FormPreviewerSignatureField")
);
const FormPreviewerTextField = lazy(() => import("../FormPreviewerTextField"));

interface Props {
  forms: DraggableField[];
  isEdit?: boolean;
  isFill?: boolean;
}

function FormPreviewer({ forms, isEdit, isFill }: Props) {
  return (
    <div
      className={twClassMerge(
        "max-w-[1000px] self-center m-auto bg-white opacity-100 p-8 mt-4 rounded-xl",
        {
          ["pointer-events-none"]: !isEdit,
        }
      )}
    >
      {forms.map((form) => {
        if (
          form.type === FormBuilderFieldType.Input ||
          form.type === FormBuilderFieldType.TextArea
        )
          return (
            <Suspense fallback={<Spin />} key={form.id}>
              <FormPreviewerInputField
                key={form.id}
                label={form.state.title}
                name={form.name}
                placeholder={form.state.placeholder}
                required={form.state.required}
                type={form.type}
              />
            </Suspense>
          );

        if (form.type === FormBuilderFieldType.Select) {
          return (
            <Suspense fallback={<Spin />} key={form.id}>
              <FormPreviewerSelectField
                key={form.id}
                label={form.state.title}
                name={form.name}
                options={form.state.options}
                placeholder={form.state.title}
                required={form.state.required}
              />
            </Suspense>
          );
        }

        if (
          form.type === FormBuilderFieldType.HeadingOne ||
          form.type === FormBuilderFieldType.HeadingTwo ||
          form.type === FormBuilderFieldType.Paragraph
        ) {
          return (
            <Suspense fallback={<Spin />} key={form.id}>
              <FormPreviewerTextField
                description={form.state.description}
                key={form.id}
                title={form.state.title}
                type={form.type}
              />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Checkbox) {
          return (
            <Suspense fallback={<Spin />} key={form.id}>
              <FormPreviewerCheckbox
                checkBoxOptions={form.state.checkBoxOptions}
                key={form.id}
                label={form.state.title}
                name={form.name}
                required={form.state.required}
              />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Radio) {
          return (
            <Suspense fallback={<Spin />} key={form.id}>
              <FormPreviewerRadioField
                key={form.id}
                label={form.state.title}
                name={form.name}
                radioOptions={form.state.radioOptions}
                required={form.state.required}
              />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.DatePicker) {
          return (
            <Suspense fallback={<Spin />} key={form.id}>
              <FormPreviewerDatePickerField
                key={form.id}
                label={form.state.title}
                name={form.name}
                placeholder={form.state.placeholder}
                required={form.state.required}
              />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Image) {
          return (
            <Suspense fallback={<Spin />} key={form.id}>
              <FormPreviewerImageField key={form.id} src={""} />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.FileUpload) {
          return (
            <Suspense fallback={<Spin />} key={form.id}>
              <Form.Item shouldUpdate>
                {({ getFieldValue }) =>
                  !isEdit && getFieldValue(form.name) ? (
                    <ViewDocumentUploadField
                      label={form.state.title}
                      name={form.name}
                    />
                  ) : (
                    <FormPreviewerFileUploadField
                      label={form.state.title}
                      name={form.name}
                      required={form.state.required}
                    />
                  )
                }
              </Form.Item>
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Signature) {
          return (
            <Suspense fallback={<Spin />} key={form.id}>
              <Form.Item shouldUpdate>
                {() => (
                  <FormPreviewerSignatureField
                    isEdit={!!isEdit}
                    isFill={isFill}
                    key={form.id}
                    label={form.state.title}
                    name={form.name}
                    required={form.state.required}
                  />
                )}
              </Form.Item>
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Divider) {
          return <FormPreviewerDividerField key={form.id} />;
        }

        return null;
      })}
    </div>
  );
}

export default FormPreviewer;
