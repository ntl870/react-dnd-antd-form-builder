import { useImmer } from "use-immer";
import { DraggableField } from "./types/draggableFields.types";
import EditForm from "./components/EditForm";
import { Tabs } from "antd";
import FormPreviewerContainer from "./components/FormBuilder/Builder/FormPreviewerContainer";

function App() {
  const [data, updateData] = useImmer<{ fields: DraggableField[] }>({
    fields: [],
  });

  const tabs = [
    {
      label: "Form Builder",
      children: <EditForm data={data} updateData={updateData} />,
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
