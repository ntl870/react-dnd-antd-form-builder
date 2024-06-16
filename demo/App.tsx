import { useImmer } from "use-immer";
import EditForm from "./components/EditForm";
import { Tabs } from "antd";
import FormPreviewerContainer from "../lib/components/FormBuilder/Builder/FormPreviewerContainer";
import { DraggableField } from "../lib/types/draggableFields.types";

function App() {
  const [data, _] = useImmer<{ fields: DraggableField[] }>({
    fields: [],
  });

  const tabs = [
    {
      label: "Form Builder",
      children: <EditForm />,
      key: "0",
    },
    {
      label: "Preview Form",
      children: (
        <div className="bg-gray-100 h-screen pt-8">
          <FormPreviewerContainer forms={data.fields} isEdit />
        </div>
      ),
      key: "1",
    },
  ];

  return <Tabs defaultActiveKey="0" items={tabs} />;
}

export default App;
